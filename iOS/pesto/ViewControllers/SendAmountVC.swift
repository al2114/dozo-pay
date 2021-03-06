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
  var payee: User? = nil

  override func viewDidLoad() {
    super.viewDidLoad()
    
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
      amountField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
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
      sendButton.leftAnchor.constraint(equalTo: amountField.rightAnchor),
      sendButton.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      sendButton.widthAnchor.constraint(equalToConstant: 36),
      sendButton.heightAnchor.constraint(equalTo: sendButton.widthAnchor),
      ])

    if payee == nil {
      let shareButton = UIButton()
      shareButton.setImage(#imageLiteral(resourceName: "shareIcon").withRenderingMode(.alwaysTemplate), for: .normal)
      shareButton.addTarget(self, action: #selector(share), for: .touchUpInside)
      let shareBarItem = UIBarButtonItem(customView: shareButton)
      let width = shareBarItem.customView?.widthAnchor.constraint(equalToConstant: 24)
      width?.isActive = true
      let height = shareBarItem.customView?.heightAnchor.constraint(equalToConstant: 24)
      height?.isActive = true
      self.navigationItem.rightBarButtonItem = shareBarItem
      self.navigationItem.rightBarButtonItem?.isEnabled = false
    }
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.view.endEditing(true)
  }
  
  override func viewWillAppear(_ animated: Bool) {
    navigationController?.navigationBar.backgroundColor = .none
    navigationController?.navigationBar.barTintColor = .primaryBackground
    navigationController?.navigationBar.tintColor = .primaryTitle
    UIApplication.shared.keyWindow?.backgroundColor = .primaryBackground
    UIApplication.shared.statusBarStyle = .lightContent
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  @objc func keyboardWillShow(sender: NSNotification) {
    let info = sender.userInfo
    let offset = (info![UIKeyboardFrameEndUserInfoKey] as! NSValue).cgRectValue.height
    self.view.frame.origin.y -= 0.8*offset
    self.amountLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
  }

  @objc func keyboardWillHide(sender: NSNotification) {
    let info = sender.userInfo
    let offset = (info![UIKeyboardFrameBeginUserInfoKey] as! NSValue).cgRectValue.height
    self.view.frame.origin.y += 0.8*offset // Move view to original position
    self.amountLabel.transform = .identity //Scale label area
  }

  @objc func send() {
    let amount = Formatter.amount(fromCurrencyString: amountField.text!)
    if let payee = payee {
      API.payUser(withId: payee.uid, amount: amount) { success in
        if success {
          let confirmationVC = ConfirmationVC()
          confirmationVC.amount = amount
          confirmationVC.username = payee.username
          self.present(confirmationVC, animated: true)
        }
      }
    } else {
      let sendVC = SendContactVC()
      sendVC.amount = amount
      self.show(sendVC, sender: self)
    }
  }

  @objc func share() {
    //TODO: Generate claim only on selection of acitivity;
    let amount = Formatter.amount(fromCurrencyString: amountField.text!)
    API.createClaim(for: amount) { claim in
      let activityViewController = UIActivityViewController(
        activityItems: ["https://pesto-pay.com/claims/\(claim.uid)"],
        applicationActivities: nil)
      self.present(activityViewController, animated: true, completion: nil)
    }
  }

  @objc func dismissKeyboard (_ sender: UITapGestureRecognizer) {
    self.view.endEditing(true)
  }

  @objc func textFieldDidChange(textField: UITextField) {
    if textField == amountField {
      var amount: Amount = 0
      var filledLength = 0
      if let text = textField.text {
        var formattedText = text.replacingOccurrences(of: Locale.defaultCurrencySymbol, with: "").replacingOccurrences(of: ".", with: "").replacingOccurrences(of: ",", with: "")
        let index = String.Index.init(encodedOffset: min(formattedText.count, 6))
        formattedText = String(formattedText[..<index])
        if let val = Amount(formattedText) {
          amount = val
          filledLength = String(val).count
        }
      }
      let result = Formatter.currencyString(fromAmount: amount)
      let attributedResult: NSMutableAttributedString = NSMutableAttributedString(string: result)
      if(filledLength < 3) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(0, 1))
      }
      sendButton.isEnabled = amount != 0
      self.navigationItem.rightBarButtonItem?.isEnabled = amount != 0
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
