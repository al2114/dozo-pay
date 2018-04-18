//
//  user.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import Foundation

extension API {
  static func register(user: User, withPassword password: String, completion: @escaping (Bool) -> Void) {
    var registerRequest = RegisterRequest()
    registerRequest.password = password
    registerRequest.phoneNo = user.phoneNo
    registerRequest.username = user.username

    let route = "register"
    Requests.post(toRoute: route, withProtoMessage: registerRequest) {
      result in
      if case let .ok(registerResponse)? = result {
        User.updateMe(withUser: registerResponse.user)
        UserDefaults.standard.set(registerResponse.user.uid, forKey: "user.uid")
        completion(registerResponse.successful)
      } else {
        completion(false)
      }
    }
  }

  static func login(withUsername username: String, password: String, completion: @escaping (Bool) -> Void) {
    var loginRequest = LoginRequest()
    loginRequest.username = username
    loginRequest.password = password
    if let deviceToken = State.deviceToken {
      loginRequest.deviceToken = deviceToken
    }

    let route = "login"
    Requests.post(toRoute: route, withProtoMessage: loginRequest) {
      result in
      if case let .ok(loginResponse)? = result {
        User.updateMe(withUser: loginResponse.user)
        UserDefaults.standard.set(loginResponse.user.uid, forKey: "user.uid")
        completion(loginResponse.successful)
      } else {
        completion(false)
      }
    }
  }

  static func logout(completion: @escaping () -> Void) {
    User.getMe { me in
      var logoutRequest = LogoutRequest()
      logoutRequest.userID = me.uid
      if let deviceToken = State.deviceToken {
        logoutRequest.deviceToken = deviceToken
      }

      let route = "logout"
      Requests.post(toRoute: route, withProtoMessage: logoutRequest) { _ in
        UserDefaults.standard.removeObject(forKey: "user.uid")
        completion()
      }
    }
  }

  static func getMe(withOldMe oldMe: User, completion: @escaping (User) -> Void) {
    let route = "users/\(oldMe.uid)"
    Requests.get(toRoute: route) { (result: Result<User>?) in
      if case let .ok(me)? = result {
        completion(me)
      } else {
        completion(oldMe)
      }
    }
//    var testUser = User()
//    testUser.username = "tester"
//    testUser.phoneNo = "9999"
//    completion(testUser)
  }

  static func getMe(withId id: Id, completion: @escaping (User?) -> Void) {
    let route = "users/\(id)"
    Requests.get(toRoute: route) { (result: Result<User>?) in
      if case let .ok(me)? = result {
        completion(me)
      } else {
        completion(nil)
      }
    }
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

  static func getContacts(completion: @escaping ([Contact]) -> Void) {
    User.getMe { me in
      let route = "contacts/\(me.uid)"
      Requests.get(toRoute: route) { (result: Result<GetContactResponse>?) in
        if case let .ok(getContactResponse)? = result {
          completion(getContactResponse.contacts)
        } else {
          completion([])
        }
      }
    }
  }

  static func getTransactions(completion: @escaping ([Transaction]) -> Void) {
    User.getMe { me in
      let route = "transactions/\(me.uid)"
      Requests.get(toRoute: route) { (result: Result<GetTransactionsResponse>?) in
        if case let .ok(getTransactionsResponse)? = result {
          completion(getTransactionsResponse.transactions)
        } else {
          completion([])
        }
      }
    }
  }

  static func addContact(withUsername username: String, completion: @escaping (Bool) -> Void) {
    User.getMe { me in
      var addContactRequest = AddContactRequest()
      addContactRequest.contactUsername = username
      addContactRequest.userID = me.uid

      let route = "contacts"
      Requests.post(toRoute: route, withProtoMessage: addContactRequest) { result in
        if case let .ok(addContactResponse)? = result {
          completion(addContactResponse.successful)
        } else {
          completion(false)
        }
      }
    }
  }

  static func searchForUser(withAlias alias: String, completion: @escaping () -> Void) {

  }
}
