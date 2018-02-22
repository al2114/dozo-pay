//
//  VerifyCodeVC.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class VerifyNumberVC: UIViewController {
  var verifyField: UITextField!
  var nextButton: UIButton!
  var phoneNumber: String!

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

    verifyField = UITextField()
    verifyField.placeholder = "Enter verification code"
    verifyField.textAlignment = .center
    verifyField.keyboardType = .numberPad
    verifyField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(verifyField)
    NSLayoutConstraint.activate([
      verifyField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      verifyField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      verifyField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.setTitle("Verify", for: .normal)
    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: verifyField.bottomAnchor, constant: 100)
      ])
  }

  @objc func nextVC() {
    let registerPasswordVC = RegisterPasswordVC()
    registerPasswordVC.phoneNumber = phoneNumber
    self.show(registerPasswordVC, sender: self)
  }
}

