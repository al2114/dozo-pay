//
//  SendContactVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
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
  var contacts: [[Contact]] = []

  var tableView: UITableView!

  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    UIApplication.shared.statusBarStyle = .default
    UIApplication.shared.keyWindow?.backgroundColor = .white

  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    UIView.animate(withDuration: 0.2, animations: {
      self.navigationController?.navigationBar.backgroundColor = .white
      self.navigationController?.navigationBar.barTintColor = .white
      self.navigationController?.navigationBar.tintColor = .pestoGreen
    })
  }

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []
    
    view.backgroundColor = .white
    UIApplication.shared.statusBarStyle = .default

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

    API.getContacts { contacts in
      self.contacts = [contacts]
      self.tableView.reloadData()
    }
  }

  override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()

    print("test")
    view.setNeedsLayout()
  }
}

extension SendContactVC: UITableViewDataSource {
  func numberOfSections(in tableView: UITableView) -> Int {
    return contacts.count
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
    let contact = contacts[indexPath.section][indexPath.row]

    let contactCell = tableView.dequeueReusableCell(withIdentifier: "ContactCell") as! ContactCell
    contactCell.nameLabel.text = "@\(contact.username)"
    let image = #imageLiteral(resourceName: "logo").withRenderingMode(.alwaysTemplate)
    contactCell.profileImageView.image = image
    contactCell.profileImageView.tintColor = .pestoGreen
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
    view.backgroundColor = .white
    if let header = view as? UITableViewHeaderFooterView {
      header.textLabel?.transform = CGAffineTransform(translationX: 15, y: 0)
      header.textLabel?.font = UIFont.regular.withSize(14)
      header.textLabel?.textColor = .secondaryTitle
    }
  }

  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let contact = contacts[indexPath.section][indexPath.row]
    let amountString = Util.amountToCurrencyString(amount)
    let alert = UIAlertController(title: "Confirm", message: "Send \(amountString) to @\(contact.username)?", preferredStyle: .alert)
    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel) { _ in }
    let confirmAction = UIAlertAction(title: "Confirm", style: .default) { _ in
      let intAmount = Int32(self.amount * 100)
      API.payUser(withId: contact.uid, amount: intAmount) { success in
        if success {
          let confirmationVC = ConfirmationVC()
          confirmationVC.willDismiss = {
            self.navigationController?.popToRootViewController(animated: false)
          }
          confirmationVC.amount = self.amount
          confirmationVC.username = contact.username
          self.present(confirmationVC, animated: true)
        }
      }
    }
    alert.addAction(cancelAction)
    alert.addAction(confirmAction)
    tableView.deselectRow(at: indexPath, animated: true)
    present(alert, animated: true)
  }
}

extension SendContactVC: UISearchResultsUpdating {
  func updateSearchResults(for searchController: UISearchController) {
//    searchController.searchBar.text
  }
}

