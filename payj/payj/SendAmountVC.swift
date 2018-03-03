//
//  SendAmountVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class SendAmountVC: UIViewController, UITextFieldDelegate {
  
  var amountLabel: UILabel!
  var amountField: UITextField!
  var separatorView: UIView!
  var sendButton: UIButton!
  var shareButton: UIButton!
  
  override func viewDidLoad() {
    super.viewDidLoad()

    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
    
    NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)

    let viewBottomAnchor: NSLayoutYAxisAnchor
    let viewTopAnchor: NSLayoutYAxisAnchor
    if #available(iOS 11.0, *) {
      viewBottomAnchor = view.safeAreaLayoutGuide.bottomAnchor
      viewTopAnchor = view.safeAreaLayoutGuide.topAnchor
    } else {
      viewBottomAnchor = bottomLayoutGuide.bottomAnchor
      viewTopAnchor = topLayoutGuide.topAnchor
    }
    
    UIApplication.shared.statusBarStyle = .lightContent

    self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
    self.navigationController?.navigationBar.shadowImage = UIImage()
    self.navigationController?.navigationBar.isTranslucent = true
    self.navigationController?.navigationBar.tintColor = .white
    
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
    self.view.addGestureRecognizer(tapGesture)
    
    view.backgroundColor = UIColor.pestoGreen
    
    let currencyLabel: UILabel = UILabel()
    currencyLabel.text = "£"
    
    amountField = UITextField()
    amountField.delegate = self
    amountField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)
//    amountField.placeholder = "0.00"
    
    let defaultText = NSLocale.geolocal.currencySymbol! + "0.00"
    let amountText: NSMutableAttributedString = NSMutableAttributedString(string: defaultText)
    amountText.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(0, 1))
    amountText.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1, defaultText.count-1))

    
    amountField.attributedText = amountText
    amountField.textAlignment = .center
    amountField.font = UIFont.regular.withSize(36)
    amountField.keyboardType = .numberPad
    amountField.translatesAutoresizingMaskIntoConstraints = false
    amountField.tintColor = .clear
    view.addSubview(amountField)
    NSLayoutConstraint.activate([
      amountField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountField.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
      amountField.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])
    
    
    amountLabel = UILabel()
    amountLabel.text = "send amount"
    amountLabel.textColor = .white
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
    sendButton.setImage(#imageLiteral(resourceName: "circleRightArrow").withRenderingMode(.alwaysTemplate), for: .normal)
    sendButton.tintColor = .white
    sendButton.translatesAutoresizingMaskIntoConstraints = false
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
    shareButton.setImage(#imageLiteral(resourceName: "circleShare").withRenderingMode(.alwaysTemplate), for: .normal)
    shareButton.tintColor = .white
//    shareButton.setTitle("Share", for: .normal)
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
    self.view.frame.origin.y = -150 // Move view 150 points upward
    UIView.animate(withDuration: 0.5) {
      self.amountLabel.transform = CGAffineTransform(scaleX: 0.7, y: 0.7).translatedBy(x: 0, y: 10) //Scale label area
    }
  }
  
  @objc func keyboardWillHide(sender: NSNotification) {
    self.view.frame.origin.y = 0 // Move view to original position
    UIView.animate(withDuration: 0.5) {
      self.amountLabel.transform = CGAffineTransform(scaleX: 1.0, y: 1.0) //Scale label area
    }
  }

  @objc func send() {
    let sendVC = SendContactVC()
    sendVC.amount = Float(amountField.text!.replacingOccurrences(of: NSLocale.geolocal.currencySymbol!, with: ""))
    self.show(sendVC, sender: self)
  }
  
  @objc func dismissKeyboard (_ sender: UITapGestureRecognizer) {
    self.view.endEditing(true)
  }
  
  @objc func textFieldDidChange(textField: UITextField) {
    if textField == amountField {
      var amount: Double = 0
      var filledLength = 0
      if let text = textField.text {
        let formattedText = text.replacingOccurrences(of: NSLocale.geolocal.currencySymbol!, with: "").replacingOccurrences(of: ".", with: "")
        if let val = Int(formattedText){
          amount = Double(val)/100.0
          filledLength = String(val).count
        }
      }
      let formatter = NumberFormatter()
      formatter.numberStyle = .currency
      formatter.maximumFractionDigits = 2
      formatter.locale = NSLocale.geolocal
      let result = formatter.string(from: amount as NSNumber)
//      textField.text = result
//      let attributedResult = NSMutableAttributedString(string: result!)
      let attributedResult: NSMutableAttributedString = NSMutableAttributedString(string: result!)
      if(filledLength < 3) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(0, 1))
      }
      if(amount == 0) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,(result!.count)-1))
      }
      else if(filledLength == 1) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,3))
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(4,1))
      }
      else if (filledLength == 2) {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.washed ], range: NSMakeRange(1,1))
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(2,(result!.count)-2))
      }
      else {
        attributedResult.setAttributes([ NSAttributedStringKey.foregroundColor : UIColor.white ], range: NSMakeRange(0,(result!.count)))
      }
      textField.attributedText = attributedResult
////        textField.text = result
//
//      }
//      else
    }

  }
  
}
