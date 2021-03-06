//
//  HomeVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import CustomIOSAlertView

class HomeVC: UIViewController {
  var balanceView: UIView!
  var imageContainer: UIView!
  var sendButton: UIButton!
  var settingsButton: UIButton!
  var cameraButton: UIButton!
  var balanceLabel: UIButton!
  var transactionView: UITableView!

  var shouldCollapse: Bool = false
  var isCollapsed: Bool = false
  var shouldExpand: Bool = false
  var shouldReload: Bool = false

  var transactions: [Transaction] = []

  var backgroundViewHeightConstraint: NSLayoutConstraint!
  var imageContainerWidthConstraint: NSLayoutConstraint!
  var imageContainerCenterYConstraint: NSLayoutConstraint!

  override func viewDidLoad() {
    super.viewDidLoad()

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

    imageContainer = UIView()
    imageContainer.translatesAutoresizingMaskIntoConstraints = false
    infoView.addSubview(imageContainer)

    imageContainerWidthConstraint = imageContainer.widthAnchor.constraint(equalTo: infoView.widthAnchor, multiplier: 0.46)
    imageContainerCenterYConstraint = imageContainer.centerYAnchor.constraint(equalTo: infoView.topAnchor)


    NSLayoutConstraint.activate([
      imageContainer.centerXAnchor.constraint(equalTo: infoView.centerXAnchor),
      imageContainerWidthConstraint,
      imageContainer.heightAnchor.constraint(equalTo: imageContainer.widthAnchor),
      imageContainerCenterYConstraint
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
      qrCodeImageView.widthAnchor.constraint(equalTo: imageContainer.widthAnchor, multiplier: 0.8),
      qrCodeImageView.heightAnchor.constraint(equalTo: qrCodeImageView.widthAnchor),
      qrCodeImageView.centerYAnchor.constraint(equalTo: imageContainer.centerYAnchor)
      ])
    let qrCodeWidth = view.bounds.width * 0.38
    User.getMe { me in
      let qrImage = QR.generateCode(from: "pesto:\(me.username):\(me.uid)", withSize: CGSize(width: qrCodeWidth, height: qrCodeWidth))
      qrCodeImageView.contentMode = .scaleAspectFit
      qrCodeImageView.image = qrImage
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
    balanceLabel.setTitle("£0.00", for: .normal)
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

    transactionView = UITableView()
    transactionView.translatesAutoresizingMaskIntoConstraints = false
    transactionView.dataSource = self
    transactionView.register(TransactionCell.self, forCellReuseIdentifier: "TransactionCell")
    transactionView.separatorStyle = .none
    transactionView.rowHeight = 100
    transactionView.isUserInteractionEnabled = false
    infoView.addSubview(transactionView)
    NSLayoutConstraint.activate([
      transactionView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      transactionView.widthAnchor.constraint(equalTo: view.widthAnchor),
      transactionView.topAnchor.constraint(equalTo: imageContainer.bottomAnchor, constant: 5),
//      transactionView.topAnchor.constraint(greaterThanOrEqualTo: infoView.topAnchor, constant: 20),
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

    Notifications.subscribe(self, to: ["receiveTransaction": { _ in self.reloadData() }])
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    UIApplication.shared.keyWindow?.backgroundColor = .primaryBackground
    UIApplication.shared.statusBarStyle = .lightContent
    navigationController?.setNavigationBarHidden(true, animated: true)
    reloadData()
  }

  func reloadData() {
    User.updateMeFromServer { me in
      self.makeUpdates(withUser: me)
    }
    API.getTransactions { transactions in
      self.transactions = transactions
      self.transactionView.reloadData()
    }
  }

  func makeUpdates(withUser user: User) {
    self.balanceLabel.setTitle(Formatter.currencyString(fromAmount: user.balance), for: .normal)
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(true)
    navigationController?.setNavigationBarHidden(false, animated: true)
  }

  func showClaimDialog(forId claimId: Id) {
    API.getClaim(withId: claimId){ claim, status in
      let claimDialog = ClaimDialog(withClaim: claim, withStatus: status)
      claimDialog.tag = 0
      claimDialog.delegate = self
      claimDialog.show()
    }
  }

  @objc func topup() {
    let topupVC = TopupVC()
    self.show(topupVC, sender: self)
  }

  @objc func menuDrag(recognizer: UIPanGestureRecognizer) {
    switch recognizer.state {
    // TODO: Properly handle the collapsing & allow table view interaction/scroll
    case .changed:
      let translation  = recognizer.translation(in: self.view).y
      let scale: CGFloat = 0.5
      let constant = scale * translation
      if isCollapsed {
        backgroundViewHeightConstraint.constant = -200+max(constant,0)
        imageContainerWidthConstraint.constant = -150+min(max(constant-50, 0),150)
        let ratio = min(max((translation-100)/300,0),1)
        balanceView.alpha = ratio
        balanceLabel.alpha = ratio
        imageContainer.alpha = ratio
        if constant > 0.1 * view.bounds.height {
          shouldExpand = true
        }
      } else {
        backgroundViewHeightConstraint.constant = max(constant,-200)
        if transactions.count > 1 {
          imageContainerWidthConstraint.constant = max(min(constant, 0),-150)
          let ratio = min((300+translation)/300,1)
          balanceView.alpha = ratio
          balanceLabel.alpha = ratio
          imageContainer.alpha = ratio

          if -constant > 0.1 * view.bounds.height {
            shouldCollapse = true
          }
        }
        if constant > 0.1 * view.bounds.height {
          shouldReload = true
        }
      }
    case .ended:
      if shouldReload {
        shouldReload = false
        reloadData()
      }

      if shouldCollapse || (isCollapsed && !shouldExpand) {
        UIView.animate(withDuration: 0.2, delay: 0, options: [.curveEaseOut, .allowUserInteraction], animations: {
          self.backgroundViewHeightConstraint.constant = -200
          self.imageContainerWidthConstraint.constant = -150
          self.balanceView.alpha = 0
          self.balanceLabel.alpha = 0
          self.imageContainer.alpha = 0
          self.view.layoutIfNeeded()
        }, completion: nil)
        shouldCollapse = false
        isCollapsed = true
      }
      else if !isCollapsed || shouldExpand {
        UIView.animate(withDuration: 0.2, delay: 0, options: [.curveEaseOut, .allowUserInteraction], animations: {
          self.backgroundViewHeightConstraint.constant = 0
          self.imageContainerCenterYConstraint.constant = 0
          self.imageContainerWidthConstraint.constant = 0
          self.balanceView.alpha = 1
          self.balanceLabel.alpha = 1
          self.imageContainer.alpha = 1
          self.view.layoutIfNeeded()
        }, completion: nil)
        isCollapsed = false
        shouldExpand = false
      }
    default: break
    }
  }

  @objc func menu() {
    // TODO: Change to proper menu action once implemented
    API.logout {
      let loginVC = LoginVC()
      Util.switchTo(viewController: loginVC, presentingController: self)
    }
  }

  @objc func send() {
    let sendVC = SendAmountVC()
    self.show(sendVC, sender: self)
  }

  @objc func camera() {
    let cameraVC = CameraVC()
    self.show(cameraVC, sender: self)
  }
}

extension HomeVC: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return transactions.count
  }

  func transactionTypeToString(_ type: Transaction.TypeEnum) -> String {
    switch type {
    case .from: return "from"
    case .to: return "to"
    default: return ""
    }
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let transaction = transactions[indexPath.row]

    let transactionCell = tableView.dequeueReusableCell(withIdentifier: "TransactionCell") as! TransactionCell

    transactionCell.titleLabel.text = transactionTypeToString(transaction.transactionType).uppercased()
    switch transaction.transactionType {
    case .from:
      transactionCell.amountLabel.text = "+\(Formatter.currencyString(fromAmount: transaction.amount))"
      transactionCell.amountLabel.textColor = .secondaryTitle
    case .to:
      transactionCell.amountLabel.text = Formatter.currencyString(fromAmount: transaction.amount)
      transactionCell.amountLabel.textColor = .text
    default: break
    }

    transactionCell.dateLabel.text = Formatter.dateString(fromTimestamp: transaction.timestamp).uppercased()
    switch transaction.accountHolderType {
    case .claim:
      //TODO
      switch transaction.transactionType {
      case .from:
        transactionCell.titleLabel.text = "FROM (via claim)"
        transactionCell.userLabel.text = "@\(transaction.claimAccountHolder.owner.username)"
      case .to:
        if transaction.claimAccountHolder.hasReceiver {
          transactionCell.titleLabel.text = "TO (via claim)"
          transactionCell.userLabel.text = "@\(transaction.claimAccountHolder.receiver.username)"
        } else {
          transactionCell.titleLabel.text = ""
          transactionCell.userLabel.text = "Open Claim"
        }
      default: break
      }
    case .user:
      transactionCell.userLabel.text = "@\(transaction.userAccountHolder.username)"
    case .master:
      transactionCell.titleLabel.text = ""
      transactionCell.userLabel.text = "Topup"
    default: break
    }


    return transactionCell
  }
}

extension HomeVC: CustomIOSAlertViewDelegate {
  func customIOS7dialogButtonTouchUp(inside alertView: Any!, clickedButtonAt buttonIndex: Int) {
    if (alertView as! CustomIOSAlertView).tag == 0 {
      switch buttonIndex {
      case 0:
        (alertView as! CustomIOSAlertView).close()
      case 1:
        let claim: Claim! = (alertView as! ClaimDialog).claim
        API.acceptClaim(withID: claim.uid) { success in
          if(success) {
            let confirmationVC = ConfirmationVC()
            confirmationVC.willDismiss = {
              self.navigationController?.popToRootViewController(animated: true)
              //      self.dismiss(animated: true, completion: nil)
            }
            confirmationVC.descriptionText = "Successful"
            confirmationVC.amount = claim.amount
            confirmationVC.infoText = "transfered into your account"
            (alertView as! CustomIOSAlertView).close()
            self.present(confirmationVC, animated: true)
          }
        }
      default:
        break
      }
    }
  }
}
