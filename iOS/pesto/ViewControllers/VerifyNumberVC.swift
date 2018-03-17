//
//  VerifyCodeVC.swift
//  pesto
//
//  Created by Saurav Mitra on 20/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class VerifyField: TextField {
  override func closestPosition(to point: CGPoint) -> UITextPosition? {
    let beginning = self.beginningOfDocument
    let end = self.position(from: beginning, offset: (self.text?.replacingOccurrences(of: "_", with: "").count)!)
    return end
  }
}

class VerifyNumberVC: UIViewController {
  var verifyField: VerifyField!
  var verifyLabel: UILabel!
  var nextButton: UIButton!
  var phoneNumber: String!

  override func viewDidLoad() {
    super.viewDidLoad()
    
    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
    
    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
    
    self.edgesForExtendedLayout = []

    view.backgroundColor = .primaryBackground

    let verifyText = ("_".colored(with: .primaryTitle) + "___".colored(with: .washed)).withKerning(48)
    
    verifyField = VerifyField(fontSize: 48)
    verifyField.attributedText = verifyText
    
    verifyField.keyboardType = .numberPad
    verifyField.translatesAutoresizingMaskIntoConstraints = false
    verifyField.addTarget(self, action: #selector(textFieldDidChange), for: .editingDidBegin)
    verifyField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)
    view.addSubview(verifyField)
    
    NSLayoutConstraint.activate([
      verifyField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      verifyField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
      verifyField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])
    
    verifyLabel = UILabel()
    verifyLabel.text = "enter verification code"
    verifyLabel.font = UIFont.light.withSize(28)
    verifyLabel.textColor = .primaryTitle
    verifyLabel.textAlignment = .center
    verifyLabel.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(verifyLabel)
    NSLayoutConstraint.activate([
      verifyLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      verifyLabel.bottomAnchor.constraint(equalTo: verifyField.topAnchor, constant: -5)
      ])
    
    nextButton = UIButton(type: .system)
    nextButton.translatesAutoresizingMaskIntoConstraints = false
    nextButton.titleLabel?.font = UIFont.regular.withSize(20)
    nextButton.setTitle("I did not receive the verification code", for: .normal)
    nextButton.tintColor = .primaryTitle
//    nextButton.addTarget(self, action: #selector(nextVC), for: .touchUpInside)
    view.addSubview(nextButton)
    NSLayoutConstraint.activate([
      nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      nextButton.topAnchor.constraint(equalTo: verifyField.bottomAnchor, constant: 100)
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
    let registerPasswordVC = RegisterPasswordVC()
    registerPasswordVC.phoneNumber = phoneNumber
    self.show(registerPasswordVC, sender: self)
  }
  
  @objc func textFieldDidChange(textField: UITextField) {
    if textField == verifyField {
      if let text = textField.text {
        
        let defaultText = "_".colored(with: .primaryTitle) + "___".colored(with: .washed)
        let formattedText = (text.replacingOccurrences(of: "_", with: "").colored(with: .primaryTitle) + defaultText).attributedSubstring(from: NSRange(location: 0, length: 4)).withKerning(48)
        textField.attributedText = formattedText
        
        if formattedText.string.replacingOccurrences(of: "_", with: "").count == 4 {
          nextVC();
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
    self.verifyLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
    self.verifyLabel.transform = .identity //Scale label area
  }
}

