//
//  User.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

extension User {
  static var me: User?

  static func getMe(handler: @escaping (User) -> User?) {
    if let me = me {
      updateMe(withUser: me, handler: handler)
    }
  }

  static func updateMeFromServer(handler: @escaping (User) -> User?) {
    print("update from server")
    if let oldMe = me {
      API.getMe(withOldMe: oldMe) {
        user in
        self.me = user
        updateMe(withUser: user, handler: handler)
      }
    }
  }

  static func updateMe(withUser user: User, handler: ((User) -> User?)? = nil) {
    if let newMe = handler?(user) {
      me = newMe
    } else {
      me = user
    }
  }
}
