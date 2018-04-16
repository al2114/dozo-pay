//
//  ConfirmationVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class ConfirmationVC: UIViewController {
  var amount: Amount!
  var username: String?

  var descriptionText: String!
  var infoText: String?
  var successful: Bool = true

  var willDismiss: (() -> Void)?

  override func viewDidLoad() {
    super.viewDidLoad()

//    self.edgesForExtendedLayout = []

    view.backgroundColor = .white

    let amountLabel = UILabel()
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.text = Util.amountToCurrencyString(amount)
    amountLabel.font = UIFont.regular.withSize(50)
    amountLabel.textColor = .text
    view.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    let descriptionLabel = UILabel()
    descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
    if successful {
      descriptionLabel.textColor = .secondaryTitle
    } else {
      descriptionLabel.textColor = .text
    }
    descriptionLabel.font = UIFont.light.withSize(32)
    descriptionLabel.text = descriptionText
    view.addSubview(descriptionLabel)
    NSLayoutConstraint.activate([
      descriptionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      descriptionLabel.bottomAnchor.constraint(equalTo: amountLabel.topAnchor, constant: -5)
      ])

    let descriptionImageView = UIImageView()
    descriptionImageView.translatesAutoresizingMaskIntoConstraints = false
    if successful {
      descriptionImageView.image = #imageLiteral(resourceName: "circleCheck").withRenderingMode(.alwaysTemplate)
      descriptionImageView.tintColor = .secondaryTitle
    } else {
      descriptionImageView.image = #imageLiteral(resourceName: "circleCross").withRenderingMode(.alwaysTemplate)
      descriptionImageView.tintColor = .red
    }
    view.addSubview(descriptionImageView)
    NSLayoutConstraint.activate([
      descriptionImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      descriptionImageView.bottomAnchor.constraint(equalTo: descriptionLabel.topAnchor, constant: -50),
      descriptionImageView.widthAnchor.constraint(equalToConstant: 100),
      descriptionImageView.heightAnchor.constraint(equalTo: descriptionImageView.widthAnchor),
      ])

    let moreInfoLabel = UILabel()
    moreInfoLabel.translatesAutoresizingMaskIntoConstraints = false
    moreInfoLabel.font = UIFont.light.withSize(21)
    if let infoText = infoText {
      moreInfoLabel.text = infoText
    } else if let username = username {
      moreInfoLabel.attributedText = "to ".attributed + "@\(username)".colored(with: .secondaryTitle)
    }
    view.addSubview(moreInfoLabel)
    NSLayoutConstraint.activate([
      moreInfoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      moreInfoLabel.topAnchor.constraint(equalTo: amountLabel.bottomAnchor, constant: 10)
      ])

    let doneButton = UIButton(type: .system)
    doneButton.translatesAutoresizingMaskIntoConstraints = false
    doneButton.setTitle("Done", for: .normal)
    if successful {
      doneButton.tintColor = .secondaryTitle
    } else {
      doneButton.tintColor = .text
    }
    doneButton.addTarget(self, action: #selector(home), for: .touchUpInside)
    view.addSubview(doneButton)
    NSLayoutConstraint.activate([
      doneButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      doneButton.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -60)
      ])

    let balanceView = UIView()
    balanceView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(balanceView)
    NSLayoutConstraint.activate([
      balanceView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      balanceView.widthAnchor.constraint(equalTo: view.widthAnchor),
      balanceView.topAnchor.constraint(equalTo: moreInfoLabel.bottomAnchor),
      balanceView.bottomAnchor.constraint(equalTo: doneButton.topAnchor)
      ])

    let balanceLabel = UILabel()
    balanceLabel.translatesAutoresizingMaskIntoConstraints = false
    User.getMe { me in
      let balance = Util.amountToCurrencyString(me.balance)
      balanceLabel.text = "Balance: \(balance)"
    }
    balanceLabel.textColor = .lightGray
    balanceLabel.font = UIFont.light.withSize(16)
    balanceView.addSubview(balanceLabel)
    NSLayoutConstraint.activate([
      balanceLabel.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      balanceLabel.centerYAnchor.constraint(equalTo: balanceView.centerYAnchor)
      ])

    let upperSeparator = UIView()
    upperSeparator.translatesAutoresizingMaskIntoConstraints = false
    upperSeparator.backgroundColor = .subdued
    balanceView.addSubview(upperSeparator)
    NSLayoutConstraint.activate([
      upperSeparator.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      upperSeparator.bottomAnchor.constraint(equalTo: balanceLabel.centerYAnchor, constant: -30),
      upperSeparator.widthAnchor.constraint(equalTo: balanceView.widthAnchor, multiplier: 0.8),
      upperSeparator.heightAnchor.constraint(equalToConstant: 1)
      ])

    let lowerSeparator = UIView()
    lowerSeparator.translatesAutoresizingMaskIntoConstraints = false
    lowerSeparator.backgroundColor = .subdued
    balanceView.addSubview(lowerSeparator)
    NSLayoutConstraint.activate([
      lowerSeparator.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      lowerSeparator.topAnchor.constraint(equalTo: balanceLabel.centerYAnchor, constant: 30),
      lowerSeparator.widthAnchor.constraint(equalTo: balanceView.widthAnchor, multiplier: 0.8),
      lowerSeparator.heightAnchor.constraint(equalToConstant: 1)
      ])

    let closeButton = UIButton(type: .system)
    closeButton.translatesAutoresizingMaskIntoConstraints = false
    closeButton.setImage(#imageLiteral(resourceName: "crossIcon").withRenderingMode(.alwaysTemplate), for: .normal)
    closeButton.tintColor = .text
    closeButton.addTarget(self, action: #selector(home), for: .touchUpInside)
    view.addSubview(closeButton)
    NSLayoutConstraint.activate([
      closeButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20),
      closeButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 40),
      closeButton.widthAnchor.constraint(equalToConstant: 24),
      closeButton.heightAnchor.constraint(equalTo: closeButton.widthAnchor)
      ])

  }

  @objc func home() {
    willDismiss?()
    dismiss(animated: true, completion: nil)
  }
}
