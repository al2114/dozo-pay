//
//  Login.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class LoginVC: UIViewController {
  var idField: TextField!
  var passwordField: TextField!
  var registerButton: UIButton!
  var loginButton: UIButton!

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

    idField = TextField(fontSize: 30)
    idField.setPlaceholder("Enter alias / phone #")
    idField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(idField)
    NSLayoutConstraint.activate([
      idField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      idField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8)
      ])

    passwordField = TextField(fontSize: 30)
    passwordField.setPlaceholder("Enter password")
    passwordField.isSecureTextEntry = true
    passwordField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(passwordField)
    NSLayoutConstraint.activate([
      passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passwordField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      passwordField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      passwordField.topAnchor.constraint(equalTo: idField.bottomAnchor, constant: 5)
      ])

    loginButton = UIButton(type: .system)
    loginButton.translatesAutoresizingMaskIntoConstraints = false
    loginButton.titleLabel?.font = UIFont.regular.withSize(25)
    loginButton.setTitle("Login", for: .normal)
    loginButton.tintColor = .primaryTitle
    loginButton.addTarget(self, action: #selector(login), for: .touchUpInside)
    view.addSubview(loginButton)
    NSLayoutConstraint.activate([
      loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      loginButton.topAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 20)
      ])

    registerButton = UIButton(type: .system)
    registerButton.translatesAutoresizingMaskIntoConstraints = false
    registerButton.titleLabel?.font = UIFont.regular.withSize(25)
    registerButton.setTitle("Register", for: .normal)
    registerButton.addTarget(self, action: #selector(register), for: .touchUpInside)
    registerButton.tintColor = .primaryTitle
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

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.view.endEditing(true)
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  @objc func keyboardWillShow(sender: NSNotification) {
    self.view.frame.origin.y = -150
//    self.amountLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
//    self.amountLabel.transform = CGAffineTransform(scaleX: 1.0, y: 1.0) //Scale label area
  }
}
