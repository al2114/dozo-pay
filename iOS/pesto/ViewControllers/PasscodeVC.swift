//
//  PasscodeVC.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 03/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class PasscodeField: TextField {
  override func closestPosition(to point: CGPoint) -> UITextPosition? {
    let beginning = self.beginningOfDocument
    let end = self.position(from: beginning, offset: (self.text?.replacingOccurrences(of: "_", with: "").count)!)
    return end
  }
}

class PasscodeVC: UIViewController {
  var passcodeField: PasscodeField!
  var passcodeLabel: UILabel!
  var phoneNumber: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)

    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    let passcodeText = ("_".colored(with: .primaryTitle) + "___".colored(with: .washed)).withKerning(48)

    passcodeField = PasscodeField(fontSize: 48)
    passcodeField.attributedText = passcodeText

    passcodeField.keyboardType = .numberPad
    passcodeField.translatesAutoresizingMaskIntoConstraints = false
    passcodeField.addTarget(self, action: #selector(textFieldDidChange), for: .editingDidBegin)
    passcodeField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)
    view.addSubview(passcodeField)

    NSLayoutConstraint.activate([
      passcodeField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passcodeField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
      passcodeField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    passcodeLabel = UILabel()
    passcodeLabel.text = "enter passcode"
    passcodeLabel.font = UIFont.light.withSize(28)
    passcodeLabel.textColor = .primaryTitle
    passcodeLabel.textAlignment = .center
    passcodeLabel.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(passcodeLabel)
    NSLayoutConstraint.activate([
      passcodeLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      passcodeLabel.bottomAnchor.constraint(equalTo: passcodeField.topAnchor, constant: -5)
      ])
  }

  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)
    view.endEditing(true)
  }

  private func setCursorPosition(input: UITextField, position: Int) {
    let position = input.position(from: input.beginningOfDocument, offset: position)!
    input.selectedTextRange = input.textRange(from: position, to: position)
  }

  @objc func nextVC() {
    let loginVC = LoginVC()
    self.show(loginVC, sender: self)
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if textField == passcodeField {
      if let text = textField.text {

        let defaultText = "_".colored(with: .primaryTitle) + "___".colored(with: .washed)
        let formattedText = (text.replacingOccurrences(of: "_", with: "").colored(with: .primaryTitle) + defaultText).attributedSubstring(from: NSRange(location: 0, length: 4)).withKerning(48)
        textField.attributedText = formattedText

        if formattedText.string.replacingOccurrences(of: "_", with: "").count == 4 {
          API.getPasscode {
            passcode in
            if passcode == formattedText.string {
              self.nextVC()
            }
          }
        }
        setCursorPosition(input: textField, position: formattedText.string.replacingOccurrences(of: "_", with: "").count)
      }
    }

  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.view.endEditing(true)
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  @objc func keyboardWillShow(sender: NSNotification) {
    self.view.frame.origin.y = -50
    self.passcodeLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
    self.passcodeLabel.transform = .identity //Scale label area
  }
}

