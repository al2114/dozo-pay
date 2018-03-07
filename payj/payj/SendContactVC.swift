//
//  SendContactVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class ContactCell: UITableViewCell {
  let profileImageView: CircularImageView
  let nameLabel: UILabel
  let separatorView: UIView

  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    nameLabel = UILabel()
    profileImageView = CircularImageView()
    separatorView = UIView()
    super.init(style: style, reuseIdentifier: reuseIdentifier)

    nameLabel.font = .regular

    profileImageView.translatesAutoresizingMaskIntoConstraints = false
    profileImageView.clipsToBounds = true
    contentView.addSubview(profileImageView)
    NSLayoutConstraint.activate([
      profileImageView.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: 35),
      profileImageView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
      profileImageView.heightAnchor.constraint(equalTo: contentView.heightAnchor, multiplier: 0.7),
      profileImageView.widthAnchor.constraint(equalTo: profileImageView.heightAnchor)
      ])

    nameLabel.translatesAutoresizingMaskIntoConstraints = false
    contentView.addSubview(nameLabel)
    NSLayoutConstraint.activate([
      nameLabel.leftAnchor.constraint(equalTo: profileImageView.rightAnchor, constant: 20),
      nameLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
      nameLabel.rightAnchor.constraint(equalTo: contentView.rightAnchor, constant: -20)
      ])

    separatorView.translatesAutoresizingMaskIntoConstraints = false
    separatorView.backgroundColor = .subdued
    contentView.addSubview(separatorView)
    NSLayoutConstraint.activate([
      separatorView.leftAnchor.constraint(equalTo: nameLabel.leftAnchor),
      separatorView.rightAnchor.constraint(equalTo: nameLabel.rightAnchor),
      separatorView.heightAnchor.constraint(equalToConstant: 3),
      separatorView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor)
      ])
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

class SendContactVC: UIViewController {
  var searchController: UISearchController!

  var amount: Double!
  let contacts: [[String]] = [["Andrew Li", "Fu Yong Quah"], ["Bob Dylan"]]

  var tableView: UITableView!

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    tableView = UITableView()
    tableView.translatesAutoresizingMaskIntoConstraints = false
    tableView.register(ContactCell.self, forCellReuseIdentifier: "ContactCell")
    tableView.delegate = self
    tableView.dataSource = self
    tableView.separatorStyle = .none
    tableView.rowHeight = 60
    view.addSubview(tableView)
    if #available(iOS 11.0, *) {
      NSLayoutConstraint.activate([
        tableView.heightAnchor.constraint(equalTo: view.safeAreaLayoutGuide.heightAnchor),
        tableView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        tableView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        tableView.widthAnchor.constraint(equalTo: view.widthAnchor)
        ])
    } else {
      NSLayoutConstraint.activate([
        tableView.heightAnchor.constraint(equalTo: view.heightAnchor),
        tableView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        tableView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        tableView.widthAnchor.constraint(equalTo: view.widthAnchor)
        ])
    }

    searchController = UISearchController(searchResultsController: nil)
    searchController.searchResultsUpdater = self
    searchController.searchBar.searchBarStyle = .minimal
    tableView.tableHeaderView = searchController.searchBar
  }

  override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()

    print("test")
    view.setNeedsLayout()
  }
}

extension SendContactVC: UITableViewDataSource {
  func numberOfSections(in tableView: UITableView) -> Int {
    return 2
  }

  func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    if section == 0 {
      return "RECENT CONTACTS"
    } else {
      return "RECENTLY PAYED"
    }
  }

  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return contacts[section].count
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let contactCell = tableView.dequeueReusableCell(withIdentifier: "ContactCell") as! ContactCell
    contactCell.nameLabel.text = contacts[indexPath.section][indexPath.row]
    let image = #imageLiteral(resourceName: "logo")
    contactCell.profileImageView.image = image
    contactCell.separatorView.isHidden = indexPath.row == contacts[indexPath.section].count - 1
    return contactCell
  }
//
//  func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
//    <#code#>
//  }
}

extension SendContactVC: UITableViewDelegate {
  func tableView(_ tableView: UITableView, willDisplayHeaderView view: UIView, forSection section: Int) {
    view.tintColor = .clear
    if let header = view as? UITableViewHeaderFooterView {
      header.textLabel?.transform = CGAffineTransform(translationX: 15, y: 0)
      header.textLabel?.font = UIFont.regular.withSize(14)
      header.textLabel?.textColor = .secondaryTitle
    }
  }

  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let name = contacts[indexPath.section][indexPath.row]
    let amountString = Util.amountToCurrencyString(amount)
    let alert = UIAlertController(title: "Confirm", message: "Send \(amountString) to \(name)?", preferredStyle: .alert)
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

extension SendContactVC: UISearchResultsUpdating {
  func updateSearchResults(for searchController: UISearchController) {
//    searchController.searchBar.text
  }
}
