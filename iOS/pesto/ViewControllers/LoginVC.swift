//
//  Login.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class LoginVC: UIViewController {
  var idField: NiceTextField!
  var passwordField: NiceTextField!
  var registerButton: UIButton!
  var loginButton: UIButton!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    registerButton = UIButton(type: .system)
    registerButton.translatesAutoresizingMaskIntoConstraints = false
    registerButton.titleLabel?.font = UIFont.regular.withSize(18)
    registerButton.setTitle("Register", for: .normal)
    registerButton.addTarget(self, action: #selector(register), for: .touchUpInside)
    registerButton.tintColor = .primaryTitle
    view.addSubview(registerButton)
    NSLayoutConstraint.activate([
      registerButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -20),
      registerButton.topAnchor.constraint(equalTo: topAnchor, constant: 30)
      ])

    idField = NiceTextField(fontSize: 24, focusColor: .washed)
    idField.setPlaceholder("alias or phone no.")
    idField.translatesAutoresizingMaskIntoConstraints = false
    idField.textField.autocorrectionType = .no
    idField.textField.autocapitalizationType = .none
    view.addSubview(idField)
    NSLayoutConstraint.activate([
      idField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      idField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      idField.bottomAnchor.constraint(equalTo: view.centerYAnchor, constant: -10)
      ])

    let logoView = UIImageView()
    logoView.image = #imageLiteral(resourceName: "logo").withRenderingMode(.alwaysTemplate)
    logoView.tintColor = .primaryTitle
    logoView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(logoView)
    NSLayoutConstraint.activate([
      logoView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      logoView.widthAnchor.constraint(equalToConstant: 50),
      logoView.heightAnchor.constraint(equalTo: logoView.widthAnchor),
      logoView.bottomAnchor.constraint(equalTo: idField.topAnchor, constant: -60)
      ])

    passwordField = NiceTextField(fontSize: 24, focusColor: .washed)
    passwordField.setPlaceholder("password")
    passwordField.textField.isSecureTextEntry = true
    passwordField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(passwordField)
    NSLayoutConstraint.activate([
      passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passwordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      passwordField.topAnchor.constraint(equalTo: view.centerYAnchor, constant: 10)
      ])

    loginButton = UIButton(type: .system)
    loginButton.translatesAutoresizingMaskIntoConstraints = false
    loginButton.titleLabel?.font = UIFont.regular.withSize(20)
    loginButton.setTitle("Login", for: .normal)
    loginButton.tintColor = .primaryTitle
    loginButton.addTarget(self, action: #selector(login), for: .touchUpInside)
    view.addSubview(loginButton)
    NSLayoutConstraint.activate([
      loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      loginButton.topAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 60)
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

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    navigationController?.isNavigationBarHidden = true
  }

  override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(true)
    navigationController?.isNavigationBarHidden = false
  }

  @objc func login() {
    let username = idField.textField.text ?? ""
    let password = passwordField.textField.text ?? ""
    API.login(withUsername: username, password: password) {
      success in
      if success {
        DispatchQueue.main.async {
          let homeVC = HomeVC()
          Util.switchTo(viewController: homeVC, presentingController: self)
        }
      }
      else {
        self.showToast(message: "Error logging in")
      }
    }
  }

  @objc func register() {
    let registerNumberVC = RegisterNumberVC()
    self.show(registerNumberVC, sender: self)
  }
}
