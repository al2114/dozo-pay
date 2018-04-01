//
//  user.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

typealias User = Pesto_Models_User
typealias Room = Pesto_Models_Room
typealias Claim = Pesto_Models_Claim
typealias RoomItem = Pesto_Models_RoomItem
typealias Contact = Pesto_Models_Contact
typealias Profile = Pesto_Models_Profile
typealias Transaction = Pesto_Models_Transaction

typealias RegisterRequest = Pesto_UserMessages_RegisterRequest
typealias RegisterResponse = Pesto_UserMessages_RegisterResponse
typealias RegisterDeviceTokenRequest = Pesto_UserMessages_RegisterDeviceTokenRequest
typealias LoginRequest = Pesto_UserMessages_LoginRequest
typealias LoginResponse = Pesto_UserMessages_LoginResponse
typealias GetContactResponse = Pesto_UserMessages_GetContactsResponse
typealias AddContactRequest = Pesto_UserMessages_AddContactRequest
typealias GetTransactionsResponse = Pesto_UserMessages_GetTransactionsResponse
typealias NoResponse = Pesto_UserMessages_NoResponse

import Foundation

extension API {
  static func register(user: User, withPassword password: String, completion: @escaping (User?) -> Void) {
    var registerRequest = RegisterRequest()
    registerRequest.password = password
    registerRequest.phoneNo = user.phoneNo
    registerRequest.username = user.username

    let route = "register"
    Util.post(toRoute: route, withProtoMessage: registerRequest) {
      result in
      if case let .ok(registerResponse)? = result {
        completion(registerResponse.user)
      } else {
        completion(nil)
      }
    }

    completion(user)
  }

  static func registerDeviceToken(_ deviceToken: String, to user: User) {
    var registerDeviceTokenRequest = RegisterDeviceTokenRequest()
    registerDeviceTokenRequest.userID = user.uid
    registerDeviceTokenRequest.deviceToken = deviceToken

    let route = "register/device_token"
    Util.post(toRoute: route, withProtoMessage: registerDeviceTokenRequest) { result in }
  }

  static func login(withUsername username: String, password: String, completion: @escaping (Bool) -> Void) {
    var loginRequest = LoginRequest()
    loginRequest.username = username
    loginRequest.password = password

    let route = "login"
    Util.post(toRoute: route, withProtoMessage: loginRequest) {
      result in
      if case let .ok(loginResponse)? = result {
        User.updateMe(withUser: loginResponse.user)
        print(loginResponse.successful)
        completion(loginResponse.successful)
      } else {
        completion(false)
      }
    }
  }

  static func getMe(withOldMe oldMe: User, completion: @escaping (User) -> Void) {
    let route = "users/\(oldMe.uid)"
    Util.get(toRoute: route) { (result: Result<User>?) in
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

  static func getMe(withId id: Int32, completion: @escaping (User?) -> Void) {
    let route = "users/\(id)"
    Util.get(toRoute: route) { (result: Result<User>?) in
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
      Util.get(toRoute: route) { (result: Result<GetContactResponse>?) in
        if case let .ok(getContactResponse)? = result {
          completion(getContactResponse.contacts)
        } else {
          completion([])
        }
      }
      return nil
    }
  }

  static func getTransactions(completion: @escaping ([Transaction]) -> Void) {
    User.getMe { me in
      let route = "transactions/\(me.uid)"
      Util.get(toRoute: route) { (result: Result<GetTransactionsResponse>?) in
        if case let .ok(getTransactionsResponse)? = result {
          completion(getTransactionsResponse.transactions)
        } else {
          completion([])
        }
      }
      return nil
    }
  }

  static func addContact(withUsername username: String, completion: @escaping (Bool) -> Void) {
    User.getMe { me in
      var addContactRequest = AddContactRequest()
      addContactRequest.contactUsername = username
      addContactRequest.userID = me.uid

      let route = "contacts"
      Util.post(toRoute: route, withProtoMessage: addContactRequest) { result in
        if case let .ok(addContactResponse)? = result {
          completion(addContactResponse.successful)
        } else {
          completion(false)
        }
      }
      return nil
    }
  }

  static func searchForUser(withAlias alias: String, completion: @escaping () -> Void) {

  }
}
