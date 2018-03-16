//
//  VerifyCodeVC.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class VerifyNumberVC: UIViewController {
  var verifyField: NiceTextField!
  var nextButton: UIButton!
  var phoneNumber: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    verifyField = NiceTextField(fontSize: 24, focusColor: .washed)
    verifyField.setPlaceholder("Enter verification code")
    verifyField.textField.keyboardType = .numberPad
    verifyField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(verifyField)
    NSLayoutConstraint.activate([
      verifyField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      verifyField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      verifyField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.titleLabel?.font = UIFont.regular.withSize(20)
    nextButton.setTitle("Verify", for: .normal)
    nextButton.tintColor = .primaryTitle
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

