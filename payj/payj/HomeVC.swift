//
//  HomeVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class HomeVC: UIViewController {
  var balanceView: UIView!
  var sendButton: UIButton!
  var settingsButton: UIButton!
  var cameraButton: UIButton!
  var qrCodeImageView: UIImageView!
  let qrCodeSize: CGFloat = 100

  override func viewDidLoad() {
    super.viewDidLoad()

    let viewBottomAnchor: NSLayoutYAxisAnchor
    let viewTopAnchor: NSLayoutYAxisAnchor
    if #available(iOS 11.0, *) {
      viewBottomAnchor = view.safeAreaLayoutGuide.bottomAnchor
      viewTopAnchor = view.safeAreaLayoutGuide.topAnchor
    } else {
      viewBottomAnchor = bottomLayoutGuide.bottomAnchor
      viewTopAnchor = topLayoutGuide.topAnchor
    }

    balanceView = UIView()
    balanceView.translatesAutoresizingMaskIntoConstraints = false
    let balanceLabel = UILabel()
    balanceLabel.text = "$2.54"
    balanceLabel.translatesAutoresizingMaskIntoConstraints = false
    balanceView.addSubview(balanceLabel)
    NSLayoutConstraint.activate([
      balanceLabel.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      balanceLabel.topAnchor.constraint(equalTo: balanceView.topAnchor),
      balanceLabel.bottomAnchor.constraint(equalTo: balanceView.bottomAnchor)
      ])
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      balanceView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    qrCodeImageView = UIImageView()
    qrCodeImageView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(qrCodeImageView)
    NSLayoutConstraint.activate([
      qrCodeImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      qrCodeImageView.widthAnchor.constraint(equalToConstant: qrCodeSize),
      qrCodeImageView.heightAnchor.constraint(equalToConstant: qrCodeSize),
      qrCodeImageView.bottomAnchor.constraint(equalTo: balanceView.topAnchor, constant: -50)
      ])
    qrCodeImageView.image = Util.qrCode(from: "Kill Yourself", withSize: CGSize(width: qrCodeSize, height: qrCodeSize))

    sendButton = UIButton(type: .system)
    sendButton.translatesAutoresizingMaskIntoConstraints = false
    sendButton.setTitle("Send", for: .normal)
    sendButton.addTarget(self, action: #selector(send), for: .touchUpInside)
    view.addSubview(sendButton)
    NSLayoutConstraint.activate([
      sendButton.rightAnchor.constraint(equalTo: view.rightAnchor),
      sendButton.topAnchor.constraint(equalTo: viewTopAnchor)
      ])

    settingsButton = UIButton(type: .system)
    settingsButton.translatesAutoresizingMaskIntoConstraints = false
    settingsButton.setTitle("Settings", for: .normal)
    view.addSubview(settingsButton)
    NSLayoutConstraint.activate([
      settingsButton.leftAnchor.constraint(equalTo: view.leftAnchor),
      settingsButton.topAnchor.constraint(equalTo: viewTopAnchor)
      ])

    cameraButton = UIButton(type: .system)
    cameraButton.translatesAutoresizingMaskIntoConstraints = false
    cameraButton.setTitle("Camera", for: .normal)
    view.addSubview(cameraButton)
    NSLayoutConstraint.activate([
      cameraButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      cameraButton.bottomAnchor.constraint(equalTo: viewBottomAnchor)
      ])
  }

  @objc func send() {
    let sendVC = SendAmountVC()
    self.show(sendVC, sender: self)
  }
}
