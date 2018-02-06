//
//  SendAmountVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class SendAmountVC: UIViewController {
  var amountField: UITextField!
  var sendButton: UIButton!
  var shareButton: UIButton!

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

    amountField = UITextField()
    amountField.placeholder = "Enter amount"
    amountField.textAlignment = .center
    amountField.keyboardType = .decimalPad
    amountField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(amountField)
    NSLayoutConstraint.activate([
      amountField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      amountField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    sendButton = UIButton(type: .system)
    sendButton.translatesAutoresizingMaskIntoConstraints = false
    sendButton.setTitle("Send", for: .normal)
    sendButton.addTarget(self, action: #selector(send), for: .touchUpInside)
    view.addSubview(sendButton)
    NSLayoutConstraint.activate([
      sendButton.leftAnchor.constraint(equalTo: view.centerXAnchor, constant: 20),
      sendButton.topAnchor.constraint(equalTo: amountField.bottomAnchor, constant: 100)
      ])

    shareButton = UIButton(type: .system)
    shareButton.translatesAutoresizingMaskIntoConstraints = false
    shareButton.setTitle("Share", for: .normal)
    view.addSubview(shareButton)
    NSLayoutConstraint.activate([
      shareButton.rightAnchor.constraint(equalTo: view.centerXAnchor, constant: -20),
      shareButton.topAnchor.constraint(equalTo: amountField.bottomAnchor, constant: 100)
      ])
  }

  @objc func send() {
    let sendVC = SendContactVC()
    sendVC.amount = Float(amountField.text!)
    self.show(sendVC, sender: self)
  }
}
