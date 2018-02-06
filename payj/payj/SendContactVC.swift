//
//  SendContactVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class ContactCell: UITableViewCell {
  let nameLabel: UILabel

  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    nameLabel = UILabel()
    super.init(style: style, reuseIdentifier: reuseIdentifier)

    nameLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(nameLabel)
    NSLayoutConstraint.activate([
      nameLabel.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: 50),
      nameLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor)
      ])
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

class SendContactVC: UITableViewController {
  var amount: Float!
  let num: Int = 20

  override func viewDidLoad() {
    super.viewDidLoad()

    tableView.register(ContactCell.self, forCellReuseIdentifier: "ContactCell")
  }
}

extension SendContactVC {
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return num
  }

  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let contactCell = tableView.dequeueReusableCell(withIdentifier: "ContactCell") as! ContactCell
    contactCell.nameLabel.text = String(indexPath.row)
    return contactCell
  }
}

extension SendContactVC {
  override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let name = (tableView.cellForRow(at: indexPath) as! ContactCell).nameLabel.text!
    let alert = UIAlertController(title: "Confirm", message: "Send $\(amount!) to \(name)?", preferredStyle: .alert)
    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel) { _ in }
    let confirmAction = UIAlertAction(title: "Confirm", style: .default) { _ in
      let confirmationVC = ConfirmationVC()
      confirmationVC.amount = self.amount
      confirmationVC.name = name
      self.show(confirmationVC, sender: self)
    }
    alert.addAction(cancelAction)
    alert.addAction(confirmAction)
    present(alert, animated: true)
  }
}
