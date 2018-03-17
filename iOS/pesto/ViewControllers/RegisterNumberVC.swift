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
    let verifyNumberVC = VerifyNumberVC()
    verifyNumberVC.phoneNumber = phoneField.textField.text ?? ""
    self.show(verifyNumberVC, sender: self)
  }
}
