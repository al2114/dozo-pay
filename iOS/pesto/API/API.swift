//
//  API.swift
//  pesto
//
//  Created by Saurav Mitra on 13/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

typealias Id = Int32
typealias TransactionRequest = Pesto_UserMessages_TransactionRequest
typealias TransactionResponse = Pesto_UserMessages_TransactionResponse
typealias TopupRequest = Pesto_UserMessages_TopupRequest
typealias TopupResponse = Pesto_UserMessages_TopupResponse

struct API {
  static func payUser(withId payeeId: Id, amount: Int32, completion: @escaping (Bool) -> Void) {
    User.getMe { me in
      var transactionRequest = TransactionRequest()
      transactionRequest.amount = amount
      transactionRequest.payerID = me.uid
      transactionRequest.payeeID = payeeId

      let route = "pay"
      Util.post(toRoute: route, withProtoMessage: transactionRequest) {
        result in
        if case let .ok(transactionResponse)? = result {
          completion(transactionResponse.successful)
        } else {
          completion(false)
        }
      }
      return nil
    }
  }

  static func topup(amount: Int32, completion: @escaping (Bool) -> Void) {
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
      return nil
    }
  }

  static func getTransactions(completion: @escaping () -> Void) {

  }

  static func trust(contact: User, completion: @escaping () -> Void) {

  }

  static func untrust(contact: User, completion: @escaping () -> Void) {

  }

  static func getBalance(completion: @escaping (Int32) -> Void) {
    User.getMe { me in
      completion(me.balance)
      return nil
    }
  }
}
