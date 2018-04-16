//
//  ClaimDialog.swift
//  Pesto Pay
//
//  Created by Andrew Li on 10/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit
import CustomIOSAlertView

class ClaimDialog: CustomIOSAlertView {
  var claim: Claim!
  var status: ClaimStatus!

  init(withClaim claim: Claim, withStatus status: ClaimStatus) {
    super.init(frame: .zero)
    self.claim = claim
    self.status = status

    switch self.status {
    case .unclaimed:
      initClaimDialog()
    case .revoked:
      initErrorDialog("Claim has been revoked by the sender.")
    case .claimed:
      initErrorDialog("Oops! Claim has already been taken!")
    default: break
    }


  }

  func initErrorDialog(_ errorMessage: String) {
    self.buttonTitles = ["Done"]
    containerView = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: 180))

    let dialogImage = UIImageView()
    dialogImage.translatesAutoresizingMaskIntoConstraints = false
    dialogImage.image = #imageLiteral(resourceName: "circleCross").withRenderingMode(.alwaysTemplate)
    dialogImage.tintColor = .red
    containerView.addSubview(dialogImage)
    NSLayoutConstraint.activate([
      dialogImage.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
      dialogImage.centerYAnchor.constraint(equalTo: containerView.centerYAnchor, constant: -20),
      dialogImage.widthAnchor.constraint(equalToConstant: 80),
      dialogImage.heightAnchor.constraint(equalTo: dialogImage.widthAnchor)
      ])

    let descriptionLabel = UILabel()
    descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
    descriptionLabel.textColor = .text
    descriptionLabel.font = UIFont.light.withSize(16)
    descriptionLabel.text = errorMessage
    containerView.addSubview(descriptionLabel)
    NSLayoutConstraint.activate([
      descriptionLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
      descriptionLabel.topAnchor.constraint(equalTo: dialogImage.bottomAnchor, constant: 15)
      ])
  }


  func initClaimDialog() {
    self.buttonTitles = ["Cancel", "Confirm"]
    containerView = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: 180))

    let amountLabel = UILabel()
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.text = Util.amountToCurrencyString(claim.amount)
    amountLabel.font = UIFont.regular.withSize(50)
    amountLabel.textColor = .text
    containerView.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
      amountLabel.centerYAnchor.constraint(equalTo: containerView.centerYAnchor)
      ])

    let descriptionLabel = UILabel()
    descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
    descriptionLabel.textColor = .secondaryTitle
    descriptionLabel.font = UIFont.light.withSize(24)
    descriptionLabel.text = "receive"
    containerView.addSubview(descriptionLabel)
    NSLayoutConstraint.activate([
      descriptionLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
      descriptionLabel.bottomAnchor.constraint(equalTo: amountLabel.topAnchor, constant: -5)
      ])

    let moreInfoLabel = UILabel()
    moreInfoLabel.translatesAutoresizingMaskIntoConstraints = false
    moreInfoLabel.font = UIFont.light.withSize(20)
    moreInfoLabel.attributedText = "from ".colored(with: .text) + "@\(claim.owner.username)".colored(with: .secondaryTitle)
    containerView.addSubview(moreInfoLabel)
    NSLayoutConstraint.activate([
      moreInfoLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
      moreInfoLabel.topAnchor.constraint(equalTo: amountLabel.bottomAnchor, constant: 10)
      ])
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    for case let button as UIButton in dialogView.subviews {
      button.titleLabel!.font = UIFont.light.withSize(20)
      if button.currentTitle == "Confirm" {
        button.setTitleColor(.secondaryTitle, for: .normal)
      } else {
        button.setTitleColor(.text, for: .normal)
      }
    }

    let cornerRadius: CGFloat = 20.0
    dialogView.layer.sublayers?.remove(at: 0)
    dialogView.backgroundColor = .white
    dialogView.layer.cornerRadius = cornerRadius
    dialogView.layer.shadowRadius = cornerRadius + 5
    dialogView.layer.shadowOffset = CGSize(width: 0 - (cornerRadius+5)/2, height: 0 - (cornerRadius+5)/2)
    dialogView.layer.shadowPath = UIBezierPath(roundedRect: dialogView.bounds, cornerRadius: cornerRadius).cgPath
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

}
