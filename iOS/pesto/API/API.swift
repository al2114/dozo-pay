//
//  API.swift
//  pesto
//
//  Created by Saurav Mitra on 13/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

typealias Id = Int32
typealias Amount = Int32
typealias TransactionRequest = Pesto_UserMessages_TransactionRequest
typealias TransactionResponse = Pesto_UserMessages_TransactionResponse
typealias TopupRequest = Pesto_UserMessages_TopupRequest
typealias TopupResponse = Pesto_UserMessages_TopupResponse

typealias CheckPasscodeRequest = Pesto_UserMessages_CheckPasscodeRequest
typealias SuccessResponse = Pesto_UserMessages_SuccessResponse

struct API {
  static func checkPasscode(_ passcode: String, completion: @escaping (Bool) -> Void) {
    var checkPasscodeRequest = CheckPasscodeRequest()
    checkPasscodeRequest.passcode = passcode

    let route = "check-passcode"
    Util.post(toRoute: route, withProtoMessage: checkPasscodeRequest) {
      result in
      if case let .ok(response)? = result {
        completion(response.successful)
      } else {
        completion(false)
      }
    }
  }

  static func payUser(withId payeeId: Id, amount: Amount, completion: @escaping (Bool) -> Void) {
    User.getMe { me in
      var transactionRequest = TransactionRequest()
      transactionRequest.amount = amount
      transactionRequest.payerID = me.uid
      transactionRequest.payeeID = payeeId

      let route = "pay"
      Util.post(toRoute: route, withProtoMessage: transactionRequest) {
        result in
        if case let .ok(transactionResponse)? = result {
          User.updateMe(withUser: transactionResponse.user)
          completion(transactionResponse.successful)
        } else {
          completion(false)
        }
      }
    }
  }

  static func topup(amount: Amount, completion: @escaping (Bool) -> Void) {
    User.getMe { me in
      var topupRequest = TopupRequest()
      topupRequest.uid = me.uid
      topupRequest.amount = amount

      let route = "topup"
      Util.post(toRoute: route, withProtoMessage: topupRequest) {
        result in
        if case let .ok(topupResponse)? = result {
          User.updateMe(withUser: topupResponse.user)
          completion(topupResponse.successful)
        } else {
          completion(false)
        }
      }
    }
  }

  static func getTransactions(completion: @escaping () -> Void) {

  }

  static func trust(contact: User, completion: @escaping () -> Void) {

  }

  static func untrust(contact: User, completion: @escaping () -> Void) {

  }

  static func getBalance(completion: @escaping (Amount) -> Void) {
    User.getMe { me in
      completion(me.balance)
    }
  }
}
