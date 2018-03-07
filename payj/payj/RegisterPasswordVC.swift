//
//  RegisterPasswordVC.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class RegisterPasswordVC: UIViewController {
  var passwordField: UITextField!
  var checkPasswordField: UITextField!
  var nextButton: UIButton!
  var phoneNumber: String!

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

    passwordField = UITextField()
    passwordField.placeholder = "Enter password"
    passwordField.textAlignment = .center
    passwordField.keyboardType = .default
    passwordField.isSecureTextEntry = true
    passwordField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(passwordField)
    NSLayoutConstraint.activate([
      passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passwordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      passwordField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    checkPasswordField = UITextField()
    checkPasswordField.placeholder = "Confirm password"
    checkPasswordField.textAlignment = .center
    checkPasswordField.keyboardType = .default
    checkPasswordField.isSecureTextEntry = true
    checkPasswordField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(checkPasswordField)
    NSLayoutConstraint.activate([
      checkPasswordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      checkPasswordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      checkPasswordField.centerYAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 10)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.setTitle("Next", for: .normal)
    nextButton.isEnabled = false
    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: checkPasswordField.bottomAnchor, constant: 100)
      ])
  }

  @objc func nextVC() {
    let registerAliasVC = RegisterAliasVC()
    registerAliasVC.phoneNumber = phoneNumber

    let password = passwordField.text ?? ""
    let encryptedPassword = Crypto.encrypt(text: password)
    registerAliasVC.encryptedPassword = encryptedPassword
    self.show(registerAliasVC, sender: self)
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if let passwordText = passwordField.text,
       let checkPasswordText = checkPasswordField.text,
       passwordText.count >= 8 && checkPasswordText.count >= 8 &&
       passwordText == checkPasswordText {
      nextButton.isEnabled = true
    } else {
      nextButton.isEnabled = false
    }
  }
}
