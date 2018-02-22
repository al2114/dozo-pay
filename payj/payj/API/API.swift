//
//  API.swift
//  payj
//
//  Created by Saurav Mitra on 13/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

typealias Id = String

struct API {
  static func pay(userId: Id, amount: UInt64, completion: @escaping () -> Void) {
    User.getMe { me in
      var user = me
      user.balance += amount
      return user
    }
  }

  static func getTransactions(completion: @escaping () -> Void) {

  }

  static func trust(contact: User, completion: @escaping () -> Void) {

  }

  static func untrust(contact: User, completion: @escaping () -> Void) {

  }

  static func getBalance(completion: @escaping (UInt64) -> Void) {
    User.getMe { me in
      completion(me.balance)
      return nil
    }
  }
}
