//
//  HomeVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class HomeVC: UIViewController {
  var balanceView: UIView!
  var sendButton: UIButton!
  var settingsButton: UIButton!
  var cameraButton: UIButton!
  var qrCodeImageView: UIImageView!

  override func viewDidLoad() {
    super.viewDidLoad()

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

    UIApplication.shared.statusBarStyle = .lightContent

    let backgroundView = UIView()
    backgroundView.backgroundColor = .primaryBackground
    backgroundView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(backgroundView)
    NSLayoutConstraint.activate([
      backgroundView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      backgroundView.widthAnchor.constraint(equalTo: view.widthAnchor),
      backgroundView.topAnchor.constraint(equalTo: viewTopAnchor),
      backgroundView.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.4)
      ])

    let infoView = UIView()
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

    qrCodeImageView = UIImageView()
    qrCodeImageView.translatesAutoresizingMaskIntoConstraints = false
    imageContainer.addSubview(qrCodeImageView)
    NSLayoutConstraint.activate([
      qrCodeImageView.centerXAnchor.constraint(equalTo: imageContainer.centerXAnchor),
      qrCodeImageView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.38),
      qrCodeImageView.heightAnchor.constraint(equalTo: qrCodeImageView.widthAnchor),
      qrCodeImageView.centerYAnchor.constraint(equalTo: imageContainer.centerYAnchor)
      ])
    let qrCodeWidth = view.bounds.width * 0.38
    let qrImage = Util.qrCode(from: "Kill Yourself", withSize: CGSize(width: qrCodeWidth, height: qrCodeWidth))
    qrCodeImageView.contentMode = .scaleAspectFit
    qrCodeImageView.image = qrImage

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
      balanceTitle.bottomAnchor.constraint(equalTo: balanceView.centerYAnchor, constant: 5)
      ])

    let balanceLabel = UILabel()
    balanceLabel.textColor = .primaryTitle
    balanceLabel.font = UIFont.regular.withSize(36)
    balanceLabel.text = "£9.41"
    balanceLabel.translatesAutoresizingMaskIntoConstraints = false
    balanceView.addSubview(balanceLabel)
    NSLayoutConstraint.activate([
      balanceLabel.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      balanceLabel.topAnchor.constraint(equalTo: balanceView.centerYAnchor, constant: -5),
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
//    navigationController?.isNavigationBarHidden = true
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(true)
//    navigationController?.isNavigationBarHidden = false
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
}