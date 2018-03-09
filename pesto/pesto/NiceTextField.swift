//
//  NiceTextField.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 09/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class NiceTextField: UIView {
  let placeholderLabel = UILabel()
  let divider = UIView()
  let textField = UITextField()

  let normalColor: UIColor
  let focusColor: UIColor

  let placeholderRatio: CGFloat = 0.6
  let dividerHeight: CGFloat = 1

  let animationDuration: TimeInterval = 0.3

  init(fontSize: CGFloat, normalColor: UIColor = .washed, focusColor: UIColor = .white, textColor: UIColor = .primaryTitle) {
    self.normalColor = normalColor
    self.focusColor = focusColor

    super.init(frame: .zero)

    textField.textColor = textColor
    textField.font = UIFont.regular.withSize(fontSize)
    textField.translatesAutoresizingMaskIntoConstraints = false
    addSubview(textField)
    NSLayoutConstraint.activate([
      textField.centerXAnchor.constraint(equalTo: centerXAnchor),
      textField.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -dividerHeight),
      textField.widthAnchor.constraint(equalTo: widthAnchor),
      textField.heightAnchor.constraint(equalTo: heightAnchor, multiplier: 1 / (1 + placeholderRatio), constant: -dividerHeight),
      ])

    divider.translatesAutoresizingMaskIntoConstraints = false
    divider.backgroundColor = normalColor
    addSubview(divider)
    NSLayoutConstraint.activate([
      divider.centerXAnchor.constraint(equalTo: centerXAnchor),
      divider.widthAnchor.constraint(equalTo: widthAnchor),
      divider.topAnchor.constraint(equalTo: textField.bottomAnchor),
      divider.heightAnchor.constraint(equalToConstant: dividerHeight),
      ])

    placeholderLabel.textColor = normalColor
    placeholderLabel.font = UIFont.regular.withSize(fontSize)
    placeholderLabel.translatesAutoresizingMaskIntoConstraints = false
    addSubview(placeholderLabel)
    NSLayoutConstraint.activate([
      placeholderLabel.leftAnchor.constraint(equalTo: textField.leftAnchor),
      placeholderLabel.widthAnchor.constraint(equalTo: textField.widthAnchor),
      placeholderLabel.centerYAnchor.constraint(equalTo: textField.centerYAnchor),
      placeholderLabel.heightAnchor.constraint(equalTo: textField.heightAnchor)
      ])

    textField.addTarget(self, action: #selector(editingDidBegin), for: .editingDidBegin)
    textField.addTarget(self, action: #selector(editingDidEnd), for: .editingDidEnd)
  }

  @objc func editingDidBegin() {
    UIView.animate(withDuration: animationDuration, delay: 0, options: .curveEaseInOut, animations: {
      self.placeholderLabel.transform = self.getTransform()
      self.divider.backgroundColor = self.focusColor
      self.placeholderLabel.textColor = self.focusColor
    }, completion: nil)
  }

  @objc func editingDidEnd() {
    UIView.animate(withDuration: animationDuration, delay: 0, options: .curveEaseInOut, animations: {
      self.placeholderLabel.transform = self.getTransform()
      self.divider.backgroundColor = self.normalColor
      self.placeholderLabel.textColor = self.normalColor
    }, completion: nil)
  }

  func getTransform() -> CGAffineTransform {
    if textField.isEditing || textField.text?.count ?? 0 > 0 {
      let translateRatio = (1 - placeholderRatio) / 2
      return CGAffineTransform(translationX: -translateRatio * textField.frame.width, y: -textField.frame.height + translateRatio * textField.frame.height).scaledBy(x: placeholderRatio, y: placeholderRatio)
    } else {
      return .identity
    }
  }

  func setPlaceholder(_ text: String) {
    placeholderLabel.text = text
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
