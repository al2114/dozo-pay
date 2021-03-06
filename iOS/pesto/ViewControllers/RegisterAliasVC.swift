//
//  RegisterAliasVC.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class RegisterAliasVC: UIViewController {
  var aliasField: NiceTextField!
  var completeButton: UIButton!
  var phoneNumber: String!
  var password: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    aliasField = NiceTextField(fontSize: 24, focusColor: .washed)
    aliasField.setPlaceholder("alias")
    aliasField.textField.keyboardType = .asciiCapable
    aliasField.textField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)

    aliasField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(aliasField)
    NSLayoutConstraint.activate([
      aliasField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      aliasField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      aliasField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    completeButton = UIButton(type: .system)
    completeButton.translatesAutoresizingMaskIntoConstraints = false
    completeButton.titleLabel?.font = UIFont.regular.withSize(20)
    completeButton.setTitle("Register", for: .normal)
    completeButton.tintColor = .primaryTitle
    completeButton.addTarget(self, action: #selector(completeRegistration), for: .touchUpInside)
    completeButton.isEnabled = false
    view.addSubview(completeButton)
    NSLayoutConstraint.activate([
      completeButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      completeButton.topAnchor.constraint(equalTo: aliasField.bottomAnchor, constant: 100)
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

  @objc func textFieldDidChange(textField: UITextField) {
    if let aliasText = aliasField.textField.text,
       aliasText.count >= 3 {
      completeButton.isEnabled = true
    } else {
      completeButton.isEnabled = false
    }
  }

  @objc func completeRegistration() {
    var newUser = User()
    newUser.phoneNo = phoneNumber
    newUser.username = aliasField.textField.text ?? ""
    API.register(user: newUser, withPassword: password) { user in
    }
//    API.completeRegistration(ofUser: newUser, withAlias: alias) {
//      user in
//      User.updateMe(withUser: user)
//      let homeVC = HomeVC()
//      self.show(homeVC, sender: self)
//    }
  }
}

