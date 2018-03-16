//
//  RegisterNumberVC.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class RegisterNumberVC: UIViewController {
  var phoneField: NiceTextField!
  var nextButton: UIButton!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    phoneField = NiceTextField(fontSize: 24, focusColor: .washed)
    phoneField.setPlaceholder("phone no.")
    phoneField.textField.keyboardType = .phonePad
    phoneField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(phoneField)
    NSLayoutConstraint.activate([
      phoneField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      phoneField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      phoneField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.titleLabel?.font = UIFont.regular.withSize(20)
    nextButton.setTitle("Next", for: .normal)
    nextButton.tintColor = .primaryTitle
    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: phoneField.bottomAnchor, constant: 100)
      ])
  }

  @objc func nextVC() {
    let verifyNumberVC = VerifyNumberVC()
    verifyNumberVC.phoneNumber = phoneField.textField.text ?? ""
    self.show(verifyNumberVC, sender: self)
  }
}
