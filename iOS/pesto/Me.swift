//
//  User.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

extension User {
  static var me: User?

  static func getMe(handler: @escaping (User) -> Void) {
    if let me = me {
      handler(me)
    }
  }

  static func updateMeFromServer(handler: @escaping (User) -> Void) {
    print("update from server")
    if let oldMe = me {
      API.getMe(withOldMe: oldMe) {
        user in
        updateMe(withUser: user)
        handler(user)
      }
    }
  }

  static func updateMe(withUser user: User) {
    me = user
  }
}
