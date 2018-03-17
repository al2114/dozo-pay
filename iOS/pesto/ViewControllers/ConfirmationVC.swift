//
//  ConfirmationVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class ConfirmationVC: UIViewController {
  var amount: Double!
  var username: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    view.backgroundColor = .white

    let amountLabel = UILabel()
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.text = Util.amountToCurrencyString(amount)
    amountLabel.font = UIFont.regular.withSize(32)
    view.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    let descriptionLabel = UILabel()
    descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
    descriptionLabel.textColor = .secondaryTitle
    descriptionLabel.text = "Payment Sent"
    view.addSubview(descriptionLabel)
    NSLayoutConstraint.activate([
      descriptionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      descriptionLabel.bottomAnchor.constraint(equalTo: amountLabel.topAnchor, constant: -20)
      ])

    let descriptionImageView = UIImageView()
    descriptionImageView.translatesAutoresizingMaskIntoConstraints = false
    descriptionImageView.image = #imageLiteral(resourceName: "circleCheck").withRenderingMode(.alwaysTemplate)
    descriptionImageView.tintColor = .secondaryTitle
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
    moreInfoLabel.attributedText = "to ".attributed + "@\(username!)".colored(with: .secondaryTitle)
    view.addSubview(moreInfoLabel)
    NSLayoutConstraint.activate([
      moreInfoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      moreInfoLabel.topAnchor.constraint(equalTo: amountLabel.bottomAnchor, constant: 20)
      ])

    let doneButton = UIButton(type: .system)
    doneButton.translatesAutoresizingMaskIntoConstraints = false
    doneButton.setTitle("Done", for: .normal)
    doneButton.tintColor = .secondaryTitle
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
    balanceLabel.text = "Balance Blah"
    balanceLabel.textColor = .lightGray
    balanceLabel.font = UIFont.regular.withSize(14)
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
      upperSeparator.heightAnchor.constraint(equalToConstant: 2)
      ])

    let lowerSeparator = UIView()
    lowerSeparator.translatesAutoresizingMaskIntoConstraints = false
    lowerSeparator.backgroundColor = .subdued
    balanceView.addSubview(lowerSeparator)
    NSLayoutConstraint.activate([
      lowerSeparator.centerXAnchor.constraint(equalTo: balanceView.centerXAnchor),
      lowerSeparator.topAnchor.constraint(equalTo: balanceLabel.centerYAnchor, constant: 30),
      lowerSeparator.widthAnchor.constraint(equalTo: balanceView.widthAnchor, multiplier: 0.8),
      lowerSeparator.heightAnchor.constraint(equalToConstant: 2)
      ])
  }

  @objc func home() {
    presentingViewController?.dismiss(animated: true, completion: {
      print("asfd")
      self.presentingViewController?.navigationController?.popToRootViewController(animated: true)
    })
  }
}
