//
//  user.swift
//  payj
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

extension API {
  static func register(user: User, completion: @escaping (User) -> Void) {
    completion(user)
  }
  
  static func getMe(completion: @escaping (User) -> Void) {
    var testUser = User()
    testUser.username = "tester"
    testUser.phoneNo = "9999"
    completion(testUser)
  }
  
  static func login(withUsername username: String, password: String, completion: @escaping (User) -> Void) {
    var testUser = User()
    testUser.username = "tester"
    testUser.phoneNo = "9999"
    completion(testUser)
  }
  
  static func verify(user: User, completion: @escaping (Bool) -> Void) {
    completion(true)
  }
  
  static func completeRegistration(ofUser user: User, withAlias alias: String, completion: @escaping (User) -> Void) {
    var user = user
    user.username = alias
    User.updateMe(withUser: user)
    completion(user)
  }

  static func addContacts(withPhoneNumbers phoneNumbers: [String], completion: @escaping () -> Void) {

  }

  static func searchForUser(withAlias alias: String, completion: @escaping () -> Void) {

  }
}
