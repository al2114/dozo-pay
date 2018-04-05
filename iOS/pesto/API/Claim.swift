//
//  claim.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

typealias CreateClaimRequest = Pesto_UserMessages_CreateClaimRequest
typealias CreateClaimResponse = Pesto_UserMessages_CreateClaimResponse

extension API {
  static func accept(claim: Claim, completion: @escaping () -> Void) {

  }

  static func confirm(claim: Claim, completion: @escaping () -> Void) {

  }

  static func createClaim(for amount: Amount, completion: @escaping (Claim) -> Void) {
    User.getMe { me in
      var me = me
      var createClaimRequest = CreateClaimRequest()
      createClaimRequest.amount = amount
      createClaimRequest.ownerID = me.uid

      let route = "claims/create"
      Util.post(toRoute: route, withProtoMessage: createClaimRequest) {
        result in
        if case let .ok(createClaimResponse)? = result {
          let claim = createClaimResponse.claim
          me.balance -= claim.amount
          completion(claim)
        }
      }
    }
  }

  static func revoke(claim: Claim, completion: @escaping () -> Void) {

  }
}
