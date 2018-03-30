//
//  TransactionCell.swift
//  Pesto Pay
//
//  Created by Andrew Li on 26/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class TransactionCell: UITableViewCell {
  let titleLabel: UILabel!
  let dateLabel: UILabel!
  let amountLabel: UILabel!
  let userLabel: UILabel!

  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    titleLabel = UILabel()
    userLabel = UILabel()
    dateLabel = UILabel()
    amountLabel = UILabel()

    super.init(style: style, reuseIdentifier: reuseIdentifier)

//    self.backgroundColor = .red

    let cardView = UIView();
    cardView.translatesAutoresizingMaskIntoConstraints = false

    cardView.backgroundColor = .white
    cardView.clipsToBounds = false
    cardView.layer.cornerRadius = 10
    cardView.layer.shadowColor = UIColor.black.cgColor
    cardView.layer.shadowOpacity = 0.1
    cardView.layer.shadowOffset = CGSize(width: 0.0, height: 0.0)
    cardView.layer.shadowRadius = 5
    contentView.addSubview(cardView)
    NSLayoutConstraint.activate([
      cardView.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
      cardView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
      cardView.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: 0.85),
      cardView.heightAnchor.constraint(equalTo: contentView.heightAnchor, multiplier: 0.85)
      ])

    titleLabel.translatesAutoresizingMaskIntoConstraints = false
    titleLabel.font = UIFont.regular.withSize(14)
    titleLabel.textColor = .secondaryText
    cardView.addSubview(titleLabel)
    NSLayoutConstraint.activate([
      titleLabel.topAnchor.constraint(equalTo: cardView.topAnchor, constant: 15),
      titleLabel.leftAnchor.constraint(equalTo: cardView.leftAnchor, constant: 15)
      ])

    userLabel.translatesAutoresizingMaskIntoConstraints = false
    userLabel.font = UIFont.light.withSize(30)
    userLabel.textColor = .secondaryTitle
    cardView.addSubview(userLabel)
    NSLayoutConstraint.activate([
      userLabel.bottomAnchor.constraint(equalTo: cardView.bottomAnchor, constant: -15),
      userLabel.leftAnchor.constraint(equalTo: cardView.leftAnchor, constant: 15)
      ])


    dateLabel.translatesAutoresizingMaskIntoConstraints = false
    dateLabel.font = UIFont.regular.withSize(14)
    dateLabel.textColor = .secondaryText
    cardView.addSubview(dateLabel)
    NSLayoutConstraint.activate([
      dateLabel.topAnchor.constraint(equalTo: cardView.topAnchor, constant: 15),
      dateLabel.rightAnchor.constraint(equalTo: cardView.rightAnchor, constant: -15)
      ])

    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.font = UIFont.light.withSize(30)
    cardView.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.bottomAnchor.constraint(equalTo: cardView.bottomAnchor, constant: -15),
      amountLabel.rightAnchor.constraint(equalTo: cardView.rightAnchor, constant: -15)
      ])

  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
