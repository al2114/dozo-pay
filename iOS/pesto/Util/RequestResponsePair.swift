//
//  RequestResponsePair.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

protocol RequestResponsePair: Proto {
  associatedtype ResponseType: Proto
}

extension RegisterRequest: RequestResponsePair {
  typealias ResponseType = RegisterResponse
}

extension LoginRequest: RequestResponsePair {
  typealias ResponseType = LoginResponse
}

extension LogoutRequest: RequestResponsePair {
  typealias ResponseType = NoResponse
}

extension TransactionRequest: RequestResponsePair {
  typealias ResponseType = TransactionResponse
}

extension TopupRequest: RequestResponsePair {
  typealias ResponseType = TopupResponse
}

extension AddContactRequest: RequestResponsePair {
  typealias ResponseType = SuccessResponse
}

extension CheckPasscodeRequest: RequestResponsePair {
  typealias ResponseType = SuccessResponse
}

extension CreateClaimRequest: RequestResponsePair {
  typealias ResponseType = CreateClaimResponse
}

extension AcceptClaimRequest: RequestResponsePair {
  typealias ResponseType = AcceptClaimResponse
}

extension RevokeClaimRequest: RequestResponsePair {
  typealias ResponseType = AcceptClaimResponse
}
