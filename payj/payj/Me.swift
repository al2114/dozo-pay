//
//  User.swift
//  payj
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

extension User {
  static var me: User?

  static func getMe(handler: @escaping (User) -> User?) {
    if let me = me {
      updateMe(withUser: me, handler: handler)
    } else {
      updateMeFromServer(handler: handler)
    }
  }

  static func updateMeFromServer(handler: @escaping (User) -> User?) {
    API.getMe {
      user in
      me = user
      updateMe(withUser: user, handler: handler)
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
