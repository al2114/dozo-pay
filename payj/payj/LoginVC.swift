//
//  Login.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class LoginVC: UIViewController {
  var idField: UITextField!
  var passwordField: UITextField!
  var registerButton: UIButton!
  var loginButton: UIButton!

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

    idField = UITextField()
    idField.placeholder = "Enter alias / phone number"
    idField.textAlignment = .center
    idField.keyboardType = .asciiCapableNumberPad
    idField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(idField)
    NSLayoutConstraint.activate([
      idField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      idField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      idField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    passwordField = UITextField()
    passwordField.placeholder = "Enter password"
    passwordField.textAlignment = .center
    passwordField.isSecureTextEntry = true
    passwordField.keyboardType = .default
    passwordField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(passwordField)
    NSLayoutConstraint.activate([
      passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passwordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      passwordField.topAnchor.constraint(equalTo: idField.bottomAnchor, constant: 10)
      ])

    loginButton = UIButton(type: .system)
    loginButton.translatesAutoresizingMaskIntoConstraints = false
    loginButton.setTitle("Login", for: .normal)
    loginButton.addTarget(self, action: #selector(login), for: .touchUpInside)
    view.addSubview(loginButton)
    NSLayoutConstraint.activate([
      loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      loginButton.topAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 50)
      ])

    registerButton = UIButton(type: .system)
    registerButton.translatesAutoresizingMaskIntoConstraints = false
    registerButton.setTitle("Register", for: .normal)
    registerButton.addTarget(self, action: #selector(register), for: .touchUpInside)
    view.addSubview(registerButton)
    NSLayoutConstraint.activate([
      registerButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      registerButton.topAnchor.constraint(equalTo: loginButton.bottomAnchor, constant: 100)
      ])
  }

  @objc func login() {
    API.login(withUsername: "", password: "") {
      user in
      User.updateMe(withUser: user)
      let homeVC = HomeVC()
      self.show(homeVC, sender: self)
    }
  }

  @objc func register() {
    let registerNumberVC = RegisterNumberVC()
    self.show(registerNumberVC, sender: self)
  }
}
