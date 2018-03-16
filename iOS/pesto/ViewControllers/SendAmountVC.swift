//
//  SendAmountVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class AmountField: TextField {
  override func closestPosition(to point: CGPoint) -> UITextPosition? {
    let beginning = self.beginningOfDocument
    let end = self.position(from: beginning, offset: (self.text?.count)!)
    return end
  }
}

class SendAmountVC: UIViewController, UITextFieldDelegate {
  var amountLabel: UILabel!
  var amountField: AmountField!
  var separatorView: UIView!
  var sendButton: UIButton!
  var shareButton: UIButton!
  var payee: User? = nil

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)

    UIApplication.shared.statusBarStyle = .lightContent

    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
    self.view.addGestureRecognizer(tapGesture)

    view.backgroundColor = UIColor.pestoGreen

    amountField = AmountField(fontSize: 36)
    amountField.delegate = self
    amountField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)

    let defaultText = "\(Locale.defaultCurrencySymbol)0.00"
    let amountText: NSMutableAttributedString = NSMutableAttributedString(string: defaultText)
    amountText.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(0, 1))
    amountText.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1, defaultText.count-1))

    amountField.attributedText = amountText
    amountField.keyboardType = .numberPad
    amountField.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(amountField)
    NSLayoutConstraint.activate([
      amountField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      amountField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])


    amountLabel = UILabel()
    if let payee = payee {
      amountLabel.attributedText = "send to ".colored(with: .primaryTitle) + "@\(payee.username)".colored(with: .highlight)
    } else {
      amountLabel.textColor = .white
      amountLabel.text = "send amount"
    }
    amountLabel.font = UIFont.light.withSize(28)
    amountLabel.textAlignment = .center
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountLabel.bottomAnchor.constraint(equalTo: amountField.topAnchor, constant: -5)
      ])

    separatorView = UIView()
    separatorView.backgroundColor = .washed
    separatorView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(separatorView)
    NSLayoutConstraint.activate([
      separatorView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      separatorView.topAnchor.constraint(equalTo: amountField.bottomAnchor, constant: 5),
      separatorView.widthAnchor.constraint(equalTo: amountField.widthAnchor, multiplier: 0.6),
      separatorView.heightAnchor.constraint(equalToConstant: 1)
      ])

    sendButton = UIButton(type: .system)
    sendButton.translatesAutoresizingMaskIntoConstraints = false
    sendButton.isEnabled = false
    sendButton.setImage(#imageLiteral(resourceName: "circleRightArrow").withRenderingMode(.alwaysTemplate), for: .normal)
    sendButton.tintColor = .white
    sendButton.addTarget(self, action: #selector(send), for: .touchUpInside)
    view.addSubview(sendButton)
    NSLayoutConstraint.activate([
      sendButton.leftAnchor.constraint(equalTo: view.centerXAnchor, constant: 40),
      sendButton.topAnchor.constraint(equalTo: amountField.bottomAnchor, constant: 100),
      sendButton.widthAnchor.constraint(equalToConstant: 36),
      sendButton.heightAnchor.constraint(equalTo: sendButton.widthAnchor),
      ])

    shareButton = UIButton(type: .system)
    shareButton.translatesAutoresizingMaskIntoConstraints = false
    shareButton.isEnabled = false
    shareButton.tintColor = .white
    shareButton.setImage(#imageLiteral(resourceName: "circleShare").withRenderingMode(.alwaysTemplate), for: .normal)
    view.addSubview(shareButton)
    NSLayoutConstraint.activate([
      shareButton.rightAnchor.constraint(equalTo: view.centerXAnchor, constant: -40),
      shareButton.topAnchor.constraint(equalTo: amountField.bottomAnchor, constant: 100),
      shareButton.widthAnchor.constraint(equalToConstant: 36),
      shareButton.heightAnchor.constraint(equalTo: sendButton.widthAnchor),
      ])

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
    self.amountLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
    self.amountLabel.transform = .identity //Scale label area
  }

  @objc func send() {
    let amount = Util.currencyStringToAmount(amountField.text!)
    let intAmount = Int32(amount * 100)
    if let payee = payee {
      API.payUser(withId: payee.uid, amount: intAmount) { success in
        if success {
          let confirmationVC = ConfirmationVC()
          confirmationVC.amount = amount
          self.present(confirmationVC, animated: true)
        }
      }
    } else {
      let sendVC = SendContactVC()
      sendVC.amount = amount
      self.show(sendVC, sender: self)
    }
  }

  @objc func dismissKeyboard (_ sender: UITapGestureRecognizer) {
    self.view.endEditing(true)
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if textField == amountField {
      var amount: Double = 0
      var filledLength = 0
      if let text = textField.text {
        var formattedText = text.replacingOccurrences(of: Locale.defaultCurrencySymbol, with: "").replacingOccurrences(of: ".", with: "").replacingOccurrences(of: ",", with: "")
        let index = String.Index.init(encodedOffset: min(formattedText.count, 6))
        formattedText = String(formattedText[..<index])
        if let val = Int(formattedText){
          amount = Double(val)/100.0
          filledLength = String(val).count
        }
      }
      let result = Util.amountToCurrencyString(amount)
      let attributedResult: NSMutableAttributedString = NSMutableAttributedString(string: result)
      if(filledLength < 3) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(0, 1))
      }
      sendButton.isEnabled = amount != 0
      if(amount == 0) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,(result.count)-1))
      }
      else if(filledLength == 1) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,3))
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(4,1))
      }
      else if (filledLength == 2) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,1))
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(2,(result.count)-2))
      }
      else {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(0,(result.count)))
      }
      textField.attributedText = attributedResult
    }

  }

}
