//
//  RegisterPasswordVC.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class RegisterPasswordVC: UIViewController {
  var passwordField: NiceTextField!
  var checkPasswordField: NiceTextField!
  var nextButton: UIButton!
  var phoneNumber: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    passwordField = NiceTextField(fontSize: 24, focusColor: .washed)
    passwordField.setPlaceholder("password")
    passwordField.textField.keyboardType = .default
    passwordField.textField.isSecureTextEntry = true
    passwordField.translatesAutoresizingMaskIntoConstraints = false
    passwordField.textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
    view.addSubview(passwordField)
    NSLayoutConstraint.activate([
      passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passwordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      passwordField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    checkPasswordField = NiceTextField(fontSize: 24, focusColor: .washed)
    checkPasswordField.setPlaceholder("confirm password")
    checkPasswordField.textField.keyboardType = .default
    checkPasswordField.textField.isSecureTextEntry = true
    checkPasswordField.translatesAutoresizingMaskIntoConstraints = false
    checkPasswordField.textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
    view.addSubview(checkPasswordField)
    NSLayoutConstraint.activate([
      checkPasswordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      checkPasswordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      checkPasswordField.topAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 5)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.titleLabel?.font = UIFont.regular.withSize(20)
    nextButton.setTitle("Next", for: .normal)
    nextButton.tintColor = .primaryTitle
    nextButton.isEnabled = false
    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: checkPasswordField.bottomAnchor, constant: 100)
      ])

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  @objc func keyboardWillShow(sender: NSNotification) {
    self.view.frame.origin.y = -150
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.view.endEditing(true)
  }

  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)
    view.endEditing(true)
  }

  @objc func nextVC() {
    let registerAliasVC = RegisterAliasVC()
    registerAliasVC.phoneNumber = phoneNumber

    let password = passwordField.textField.text ?? ""
    registerAliasVC.encryptedPassword = password
    self.show(registerAliasVC, sender: self)
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if let passwordText = passwordField.textField.text,
       let checkPasswordText = checkPasswordField.textField.text,
       passwordText.count >= 8 && checkPasswordText.count >= 8 &&
       passwordText == checkPasswordText {
      nextButton.isEnabled = true
    } else {
      nextButton.isEnabled = false
    }
  }
}
