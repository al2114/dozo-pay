//
//  RegisterAliasVC.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class RegisterAliasVC: UIViewController {
  var aliasField: UITextField!
  var completeButton: UIButton!
  var phoneNumber: String!
  var encryptedPassword: String!

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

    aliasField = UITextField()
    aliasField.placeholder = "Enter alias"
    aliasField.textAlignment = .center
    aliasField.keyboardType = .asciiCapable
    aliasField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)

    aliasField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(aliasField)
    NSLayoutConstraint.activate([
      aliasField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      aliasField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      aliasField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    completeButton = UIButton(type: .system)
    completeButton.translatesAutoresizingMaskIntoConstraints = false
    completeButton.setTitle("Register", for: .normal)
    completeButton.addTarget(self, action: #selector(completeRegistration), for: .touchUpInside)
    completeButton.isEnabled = false
    view.addSubview(completeButton)
    NSLayoutConstraint.activate([
      completeButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      completeButton.topAnchor.constraint(equalTo: aliasField.bottomAnchor, constant: 100)
      ])
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if let aliasText = aliasField.text,
       aliasText.count >= 3 {
      completeButton.isEnabled = true
    } else {
      completeButton.isEnabled = false
    }
  }

  @objc func completeRegistration() {
    var newUser = User()
    newUser.phoneNo = phoneNumber
    let alias = aliasField.text ?? ""
//    newUser.encryptedPassword = encryptedPassword
    API.completeRegistration(ofUser: newUser, withAlias: alias) {
      user in
      User.updateMe(withUser: user)
      let homeVC = HomeVC()
      self.show(homeVC, sender: self)
    }
  }
}

