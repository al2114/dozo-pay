//
//  ConfirmationVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class ConfirmationVC: UIViewController {
  var amount: Float!
  var name: String!

  override func viewDidLoad() {
    super.viewDidLoad()

    let viewBottomAnchor: NSLayoutYAxisAnchor
    let viewTopAnchor: NSLayoutYAxisAnchor
    if #available(iOS 11.0, *) {
      viewBottomAnchor = view.safeAreaLayoutGuide.bottomAnchor
      viewTopAnchor = view.safeAreaLayoutGuide.topAnchor
    } else {
      viewBottomAnchor = bottomLayoutGuide.bottomAnchor
      viewTopAnchor = topLayoutGuide.topAnchor
    }

    let amountLabel = UILabel()
    amountLabel.translatesAutoresizingMaskIntoConstraints = false
    amountLabel.text = "Payment Sent: $\(amount!)"
    view.addSubview(amountLabel)
    NSLayoutConstraint.activate([
      amountLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      amountLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])


    let returnButton = UIButton(type: .system)
    returnButton.translatesAutoresizingMaskIntoConstraints = false
    returnButton.setTitle("Ok", for: .normal)
    returnButton.addTarget(self, action: #selector(home), for: .touchUpInside)

    view.addSubview(returnButton)
    NSLayoutConstraint.activate([
      returnButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      returnButton.topAnchor.constraint(equalTo: amountLabel.bottomAnchor, constant: 80)
      ])
  }

  @objc func home() {
    navigationController?.popToRootViewController(animated: true)
  }
}