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
      balanceView.leftAnchor.constraint(equalTo: view.leftAnchor),
      balanceView.rightAnchor.constraint(equalTo: view.rightAnchor),
      balanceView.topAnchor.constraint(equalTo: viewTopAnchor),
      balanceView.bottomAnchor.constraint(equalTo: viewBottomAnchor)
      ])

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
