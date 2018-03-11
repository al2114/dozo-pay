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

import Foundation

extension API {
  static func register(user: User, completion: @escaping (User) -> Void) {
    var registerRequest = RegisterRequest()
    registerRequest.password = "password"
    registerRequest.phoneNo = "07482365000"
    registerRequest.username = "test_user"

    let url = URL(string: "\(server)/register")!
    var request = URLRequest(url: url)
//    request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    request.httpMethod = "POST"
    request.httpBody = try! registerRequest.serializedData()
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
      guard let data = data, error == nil else {                                                 // check for fundamental networking error
        print("error=\(error)")
        return
      }

      if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {           // check for http errors
        print("statusCode should be 200, but is \(httpStatus.statusCode)")
        print("response = \(response)")
      }

      let responseString = String(data: data, encoding: .utf8)
      print("responseString = \(responseString)")

      let registerResponse = try! RegisterResponse(serializedData: data)
      print(registerResponse.successful)
    }
    task.resume()

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
