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
    self.viewDidLoad()

    balanceView = UIView()
    let balanceLabel = UILabel()
    balanceLabel.text = "$2.54"
    balanceView.addSubview(balanceLabel)
    NSLayoutConstraint.activate([
      balanceLabel.leftAnchor.constraint(equalTo: balanceView.leftAnchor),
      balanceLabel.rightAnchor.constraint(equalTo: balanceView.rightAnchor),
      balanceLabel.topAnchor.constraint(equalTo: balanceView.topAnchor),
      balanceLabel.bottomAnchor.constraint(equalTo: balanceView.bottomAnchor)
      ])
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.leftAnchor.constraint(equalTo: view.leftAnchor),
      balanceView.rightAnchor.constraint(equalTo: view.rightAnchor),
      balanceView.topAnchor.constraint(equalTo: view.topAnchor),
      balanceView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
      ])

    sendButton = UIButton()
    sendButton.setTitle("Send", for: .normal)
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      sendButton.rightAnchor.constraint(equalTo: view.rightAnchor),
      sendButton.topAnchor.constraint(equalTo: view.topAnchor)
      ])

    settingsButton = UIButton()
    settingsButton.setTitle("Settings", for: .normal)
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.leftAnchor.constraint(equalTo: view.leftAnchor),
      balanceView.topAnchor.constraint(equalTo: view.topAnchor)
      ])

    cameraButton = UIButton()
    cameraButton.setTitle("Camera", for: .normal)
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      balanceView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
      ])
  }
}
