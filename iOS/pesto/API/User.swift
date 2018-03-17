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
typealias RegisterRequest = Pesto_UserMessages_RegisterRequest
typealias RegisterResponse = Pesto_UserMessages_RegisterResponse
typealias LoginRequest = Pesto_UserMessages_LoginRequest
typealias LoginResponse = Pesto_UserMessages_LoginResponse

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

  static func getMe(completion: @escaping (User) -> Void) {
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
