//
//  RegisterNumberVC.swift
//  payj
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class RegisterNumberVC: UIViewController {
  var phoneField: UITextField!
  var nextButton: UIButton!

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

    phoneField = UITextField()
    phoneField.placeholder = "Enter phone number"
    phoneField.textAlignment = .center
    phoneField.keyboardType = .phonePad
    phoneField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(phoneField)
    NSLayoutConstraint.activate([
      phoneField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      phoneField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      phoneField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.setTitle("Next", for: .normal)
    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: phoneField.bottomAnchor, constant: 100)
      ])
  }

  @objc func nextVC() {
    let verifyNumberVC = VerifyNumberVC()
    verifyNumberVC.phoneNumber = phoneField.text ?? ""
    self.show(verifyNumberVC, sender: self)
  }
}
