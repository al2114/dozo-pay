//
//  ClaimVC.swift
//  Pesto Pay
//
//  Created by Andrew Li on 08/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class ClaimVC: UIViewController {
//  var confirmButton: UIButton!
  var amount = 1.00
//  var descriptionText = "receive"
  var username = "andrew"

  override func viewDidLoad() {
    super.viewDidLoad()

    view.backgroundColor = .primaryBackground

    let amountLabel = UILabel()
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.text = Util.amountToCurrencyString(amount)
    amountLabel.font = UIFont.regular.withSize(50)
    amountLabel.textColor = .primaryTitle
    view.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    let descriptionLabel = UILabel()
    descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
    descriptionLabel.textColor = .primaryTitle
    descriptionLabel.font = UIFont.light.withSize(32)
    descriptionLabel.text = "receive"
    view.addSubview(descriptionLabel)
    NSLayoutConstraint.activate([
      descriptionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      descriptionLabel.bottomAnchor.constraint(equalTo: amountLabel.topAnchor, constant: -5)
      ])

    let moreInfoLabel = UILabel()
    moreInfoLabel.translatesAutoresizingMaskIntoConstraints = false
    moreInfoLabel.font = UIFont.light.withSize(21)
    moreInfoLabel.attributedText = "from ".colored(with: .primaryTitle) + "@\(username)".colored(with: .highlight)

    view.addSubview(moreInfoLabel)
    NSLayoutConstraint.activate([
      moreInfoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      moreInfoLabel.topAnchor.constraint(equalTo: amountLabel.bottomAnchor, constant: 10)
      ])


    let confirmButton = UIButton(type: .system)
    confirmButton.translatesAutoresizingMaskIntoConstraints = false
    confirmButton.setTitle("Confirm", for: .normal)
    confirmButton.tintColor = .primaryTitle
    confirmButton.addTarget(self, action: #selector(claim), for: .touchUpInside)
    view.addSubview(confirmButton)
    NSLayoutConstraint.activate([
      confirmButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      confirmButton.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -60)
      ])


    let closeButton = UIButton(type: .system)
    closeButton.translatesAutoresizingMaskIntoConstraints = false
    closeButton.setImage(#imageLiteral(resourceName: "crossIcon").withRenderingMode(.alwaysTemplate), for: .normal)
    closeButton.tintColor = .primaryTitle
    closeButton.addTarget(self, action: #selector(close), for: .touchUpInside)
    view.addSubview(closeButton)
    NSLayoutConstraint.activate([
      closeButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20),
      closeButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 40),
      closeButton.widthAnchor.constraint(equalToConstant: 24),
      closeButton.heightAnchor.constraint(equalTo: closeButton.widthAnchor)
      ])
  }

  @objc func claim(){
    let confirmationVC = ConfirmationVC()
    confirmationVC.willDismiss = {
      self.navigationController?.popToRootViewController(animated: true)
//      self.dismiss(animated: true, completion: nil)
    }
    confirmationVC.descriptionText = "Successful"
    confirmationVC.amount = amount
    confirmationVC.infoText = "transfered into your account"
    self.present(confirmationVC, animated: true)
  }

  @objc func close(){
    self.dismiss(animated: true, completion: nil)
  }

}
