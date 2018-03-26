//
//  HomeVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import SwiftProtobuf

class TransactionCell: UITableViewCell {
  let titleLabel: UILabel!
  let dateLabel: UILabel!
  let amountLabel: UILabel!
  let userLabel: UILabel!

  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    titleLabel = UILabel()
    userLabel = UILabel()
    dateLabel = UILabel()
    amountLabel = UILabel()

    super.init(style: style, reuseIdentifier: reuseIdentifier)

    titleLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(titleLabel)
    NSLayoutConstraint.activate([
      titleLabel.topAnchor.constraint(equalTo: contentView.topAnchor),
      titleLabel.leftAnchor.constraint(equalTo: contentView.leftAnchor)
      ])

    userLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(userLabel)
    NSLayoutConstraint.activate([
      userLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor),
      userLabel.leftAnchor.constraint(equalTo: contentView.leftAnchor)
      ])


    dateLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(dateLabel)
    NSLayoutConstraint.activate([
      dateLabel.topAnchor.constraint(equalTo: contentView.topAnchor),
      dateLabel.rightAnchor.constraint(equalTo: contentView.rightAnchor)
      ])

    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.topAnchor.constraint(equalTo: dateLabel.bottomAnchor),
      amountLabel.rightAnchor.constraint(equalTo: contentView.rightAnchor)
      ])

  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

class HomeVC: UIViewController {
  var balanceView: UIView!
  var sendButton: UIButton!
  var settingsButton: UIButton!
  var cameraButton: UIButton!
  var balanceLabel: UIButton!
  var shouldReload: Bool = false

  var backgroundViewHeightConstraint: NSLayoutConstraint!

  override func viewDidLoad() {
    super.viewDidLoad()

    setMockTrasactions()

    view.backgroundColor = .pestoGreen

    self.edgesForExtendedLayout = []

    let viewBottomAnchor: NSLayoutYAxisAnchor
    let viewTopAnchor: NSLayoutYAxisAnchor
    if #available(iOS 11.0, *) {
      viewBottomAnchor = view.safeAreaLayoutGuide.bottomAnchor
      viewTopAnchor = view.safeAreaLayoutGuide.topAnchor
    } else {
      viewBottomAnchor = bottomLayoutGuide.bottomAnchor
      viewTopAnchor = topLayoutGuide.topAnchor
    }

    let backgroundView = UIView()
    backgroundView.backgroundColor = .primaryBackground
    backgroundView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(backgroundView)

    backgroundViewHeightConstraint = backgroundView.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.4)

    NSLayoutConstraint.activate([
      backgroundView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      backgroundView.widthAnchor.constraint(equalTo: view.widthAnchor),
      backgroundView.topAnchor.constraint(equalTo: viewTopAnchor),
      backgroundViewHeightConstraint
      ])

    let infoView = InclusiveView()
    infoView.backgroundColor = .secondaryBackground
    infoView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(infoView)
    NSLayoutConstraint.activate([
      infoView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      infoView.widthAnchor.constraint(equalTo: view.widthAnchor),
      infoView.topAnchor.constraint(equalTo: backgroundView.bottomAnchor),
      infoView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
      ])
    var border = UIView()
    border.translatesAutoresizingMaskIntoConstraints = false
    border.backgroundColor = .subdued
    infoView.addSubview(border)
    let gestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(menuDrag(recognizer:)))
    infoView.addGestureRecognizer(gestureRecognizer)
    NSLayoutConstraint.activate([
      border.leftAnchor.constraint(equalTo: infoView.leftAnchor),
      border.rightAnchor.constraint(equalTo: infoView.rightAnchor),
      border.bottomAnchor.constraint(equalTo: infoView.topAnchor),
      border.heightAnchor.constraint(equalToConstant: 3),
      ])

    let imageContainer = UIView()
    imageContainer.translatesAutoresizingMaskIntoConstraints = false
    infoView.addSubview(imageContainer)
    NSLayoutConstraint.activate([
      imageContainer.centerXAnchor.constraint(equalTo: infoView.centerXAnchor),
      imageContainer.widthAnchor.constraint(equalTo: infoView.widthAnchor, multiplier: 0.46),
      imageContainer.heightAnchor.constraint(equalTo: imageContainer.widthAnchor),
      imageContainer.centerYAnchor.constraint(equalTo: infoView.topAnchor)
      ])
    imageContainer.backgroundColor = .secondaryBackground
    imageContainer.layer.borderWidth = 3
    imageContainer.layer.borderColor = UIColor.subdued.cgColor
    imageContainer.layer.cornerRadius = 10

    let qrCodeImageView = UIImageView()
    qrCodeImageView.translatesAutoresizingMaskIntoConstraints = false
    imageContainer.addSubview(qrCodeImageView)
    NSLayoutConstraint.activate([
      qrCodeImageView.centerXAnchor.constraint(equalTo: imageContainer.centerXAnchor),
      qrCodeImageView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.38),
      qrCodeImageView.heightAnchor.constraint(equalTo: qrCodeImageView.widthAnchor),
      qrCodeImageView.centerYAnchor.constraint(equalTo: imageContainer.centerYAnchor)
      ])
    let qrCodeWidth = view.bounds.width * 0.38
    User.getMe { me in
      let qrImage = Util.qrCode(from: "pesto:\(me.username):\(me.uid)", withSize: CGSize(width: qrCodeWidth, height: qrCodeWidth))
      qrCodeImageView.contentMode = .scaleAspectFit
      qrCodeImageView.image = qrImage
      return nil
    }

    balanceView = UIView()
    balanceView.translatesAutoresizingMaskIntoConstraints = false
    backgroundView.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.centerXAnchor.constraint(equalTo: backgroundView.centerXAnchor),
      balanceView.centerYAnchor.constraint(equalTo: backgroundView.centerYAnchor)
      ])

    let balanceTitle = UILabel()
    balanceTitle.textColor = .primaryTitle
    balanceTitle.font = UIFont.light.withSize(22)
    balanceTitle.text = "Balance"
    balanceTitle.translatesAutoresizingMaskIntoConstraints = false
    balanceView.addSubview(balanceTitle)
    NSLayoutConstraint.activate([
      balanceTitle.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      balanceTitle.topAnchor.constraint(equalTo: balanceView.topAnchor),
      balanceTitle.bottomAnchor.constraint(equalTo: balanceView.centerYAnchor, constant: -15)
      ])

    balanceLabel = UIButton()
    balanceLabel.tintColor = .primaryTitle
    balanceLabel.titleLabel?.font = UIFont.regular.withSize(36)
    balanceLabel.setTitle("£9.41", for: .normal)
    balanceLabel.isUserInteractionEnabled = true
    balanceLabel.translatesAutoresizingMaskIntoConstraints = false
    balanceLabel.addTarget(self, action: #selector(topup), for: .touchUpInside)
    view.addSubview(balanceLabel)
    NSLayoutConstraint.activate([
      balanceLabel.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      balanceLabel.topAnchor.constraint(equalTo: balanceView.centerYAnchor, constant: -20),
      balanceLabel.bottomAnchor.constraint(equalTo: balanceView.bottomAnchor)
      ])

    sendButton = UIButton(type: .custom)
    sendButton.translatesAutoresizingMaskIntoConstraints = false
    sendButton.setImage(#imageLiteral(resourceName: "sendIcon"), for: .normal)
    sendButton.addTarget(self, action: #selector(send), for: .touchUpInside)
    view.addSubview(sendButton)
    NSLayoutConstraint.activate([
      sendButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -20),
      sendButton.topAnchor.constraint(equalTo: viewTopAnchor, constant: 20),
      sendButton.widthAnchor.constraint(equalToConstant: 22),
      sendButton.heightAnchor.constraint(equalToConstant: 22),
      ])

    settingsButton = UIButton(type: .custom)
    settingsButton.translatesAutoresizingMaskIntoConstraints = false
    settingsButton.setImage(#imageLiteral(resourceName: "menuIcon"), for: .normal)
    settingsButton.addTarget(self, action: #selector(menu), for: .touchUpInside)
    view.addSubview(settingsButton)
    NSLayoutConstraint.activate([
      settingsButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20),
      settingsButton.topAnchor.constraint(equalTo: viewTopAnchor, constant: 20),
      settingsButton.widthAnchor.constraint(equalToConstant: 22),
      settingsButton.heightAnchor.constraint(equalToConstant: 22),
      ])

    cameraButton = UIButton(type: .custom)
    cameraButton.translatesAutoresizingMaskIntoConstraints = false
    cameraButton.addTarget(self, action: #selector(camera), for: .touchUpInside)
    view.addSubview(cameraButton)
    NSLayoutConstraint.activate([
      cameraButton.centerXAnchor.constraint(equalTo: infoView.centerXAnchor),
      cameraButton.bottomAnchor.constraint(equalTo: viewBottomAnchor),
      cameraButton.widthAnchor.constraint(equalTo: infoView.widthAnchor),
      cameraButton.heightAnchor.constraint(equalToConstant: 80),
      ])

    border = UIView()
    border.translatesAutoresizingMaskIntoConstraints = false
    border.backgroundColor = .subdued
    cameraButton.addSubview(border)
    NSLayoutConstraint.activate([
      border.leftAnchor.constraint(equalTo: cameraButton.leftAnchor),
      border.rightAnchor.constraint(equalTo: cameraButton.rightAnchor),
      border.bottomAnchor.constraint(equalTo: cameraButton.topAnchor),
      border.heightAnchor.constraint(equalToConstant: 3),
      ])

    let transactionView = UITableView()
    transactionView.translatesAutoresizingMaskIntoConstraints = false
    transactionView.register(ContactCell.self, forCellReuseIdentifier: "ContactCell")
    transactionView.dataSource = self
    transactionView.register(TransactionCell.self, forCellReuseIdentifier: "TransactionCell")
    transactionView.separatorStyle = .none
    transactionView.rowHeight = 60
    infoView.addSubview(transactionView)
    NSLayoutConstraint.activate([
      transactionView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      transactionView.widthAnchor.constraint(equalTo: view.widthAnchor),
      transactionView.topAnchor.constraint(equalTo: imageContainer.bottomAnchor),
      transactionView.bottomAnchor.constraint(equalTo: border.topAnchor)
      ])

    let cameraImageView = UIImageView()
    cameraImageView.translatesAutoresizingMaskIntoConstraints = false
    cameraImageView.tintColor = .text
    cameraImageView.image = #imageLiteral(resourceName: "cameraIcon").withRenderingMode(.alwaysTemplate)
    cameraImageView.contentMode = .scaleAspectFill
    cameraButton.addSubview(cameraImageView)
    NSLayoutConstraint.activate([
      cameraImageView.centerXAnchor.constraint(equalTo: cameraButton.centerXAnchor),
      cameraImageView.centerYAnchor.constraint(equalTo: cameraButton.centerYAnchor),
      cameraImageView.widthAnchor.constraint(equalToConstant: 36),
      cameraImageView.heightAnchor.constraint(equalTo: cameraImageView.widthAnchor),
      ])
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    UIApplication.shared.keyWindow?.backgroundColor = .primaryBackground
    UIApplication.shared.statusBarStyle = .lightContent
    User.getMe{ me in
      self.makeUpdates(withUser: me)
      return nil
    }
    navigationController?.setNavigationBarHidden(true, animated: true)
  }

  func makeUpdates(withUser user: User) {
    DispatchQueue.main.async {
      self.balanceLabel.setTitle(Util.amountToCurrencyString(Double(user.balance) / 100), for: .normal)
    }
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(true)
    navigationController?.setNavigationBarHidden(false, animated: true)
  }

  @objc func topup() {
    let topupVC = TopupVC()
    self.show(topupVC, sender: self)
  }

  @objc func menuDrag(recognizer: UIPanGestureRecognizer) {
    switch recognizer.state {
    case .changed:
      let translation  = recognizer.translation(in: self.view).y
      let scale: CGFloat = 0.5
      let constant = scale * translation
      backgroundViewHeightConstraint.constant = constant
      if constant > 0.1 * view.bounds.height {
        shouldReload = true
      }
    case .ended:
      if shouldReload {
        shouldReload = false
        User.updateMeFromServer { me in
          self.makeUpdates(withUser: me)
          return nil
        }
      }
      UIView.animate(withDuration: 0.2, delay: 0, options: [.curveEaseOut, .allowUserInteraction], animations: {
        self.backgroundViewHeightConstraint.constant = 0
        self.view.layoutIfNeeded()
      }, completion: nil)
    default: break
    }
  }

  @objc func menu() {
    // TODO: Change to proper menu action once implemented
    let loginVC = LoginVC()
    Util.switchTo(viewController: loginVC, presentingController: self)
  }

  @objc func send() {
    let sendVC = SendAmountVC()
    self.show(sendVC, sender: self)
  }

  @objc func camera() {
    let cameraVC = CameraVC()
    self.show(cameraVC, sender: self)
  }
  var transactions: [Transaction] = []

  func setMockTrasactions() {

    var toTransaction = Transaction()
    var fromTransaction = Transaction()

    var saurav = Profile()
    saurav.uid = 3
    saurav.username = "saurav"

    toTransaction.profile = saurav
    toTransaction.amount = 200
    toTransaction.type = .to
    var timestamp = SwiftProtobuf.Google_Protobuf_Timestamp()
    timestamp.seconds = Int64(Date().addingTimeInterval(-(2*24*3600)).timeIntervalSince1970)
    toTransaction.timestamp = timestamp

    fromTransaction.profile = saurav
    fromTransaction.amount = 580
    fromTransaction.type = .from
    timestamp.seconds = Int64(Date().addingTimeInterval(-(2*24*3600) + 2200).timeIntervalSince1970)
    fromTransaction.timestamp = timestamp
    transactions = [toTransaction, fromTransaction]
  }


}

extension HomeVC: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return transactions.count
  }

  func transactionTypeToString(_ type: Pesto_Models_Transaction.TypeEnum) -> String {
    switch type {
    case .from: return "from"
    case .to: return "to"
    default: return ""
    }
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let transaction = transactions[indexPath.row]

    let transactionCell = tableView.dequeueReusableCell(withIdentifier: "TransactionCell") as! TransactionCell

    transactionCell.titleLabel.text = transactionTypeToString(transaction.type)

    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "MMM dd H:mm"
    dateFormatter.locale = Locale.defaultLocale

    transactionCell.dateLabel.text = dateFormatter.string(from: Date(timeIntervalSince1970: TimeInterval(transaction.timestamp.seconds)))
    transactionCell.amountLabel.text = Util.amountToCurrencyString(Double(transaction.amount)/100)
    transactionCell.userLabel.text = transaction.profile.username

    return transactionCell
  }
}

