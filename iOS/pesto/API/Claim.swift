//
//  claim.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

typealias Claim = Pesto_Models_Claim

typealias AcceptClaimRequest = Pesto_UserMessages_AcceptClaimRequest
typealias AcceptClaimResponse = Pesto_UserMessages_AcceptClaimResponse
typealias CreateClaimRequest = Pesto_UserMessages_CreateClaimRequest
typealias CreateClaimResponse = Pesto_UserMessages_CreateClaimResponse
typealias RevokeClaimRequest = Pesto_UserMessages_RevokeClaimRequest
typealias RevokeClaimResponse = Pesto_UserMessages_RevokeClaimResponse
typealias ClaimInfoResponse = Pesto_UserMessages_ClaimInfoResponse

extension API {

  static func getClaim(withID claimID: Id, completion: @escaping (Claim) -> Void) {
    let route = "claims/info/\(claimID)"
    Util.get(toRoute: route) { (result: Result<ClaimInfoResponse>?) in
      if case let .ok(ClaimInfoResponse)? = result {
        completion(ClaimInfoResponse.claim)
      } else {
        completion([])
      }
    }
  }

  static func acceptClaim(withID claimID: Id, completion: (() -> Void)?) {
    User.getMe { me in
      var acceptClaimRequest = AcceptClaimRequest()
      acceptClaimRequest.claimID = claimID
      acceptClaimRequest.receiverID = me.uid

      let route = "claims/accept"
      Util.post(toRoute: route, withProtoMessage: acceptClaimRequest) {
        result in
        if case let .ok(acceptClaimResponse)? = result, acceptClaimResponse.successful {
          var me = me
          me.balance += acceptClaimResponse.claim.amount
          User.updateMe(withUser: me)
          completion?()
        }
      }
    }
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
    var revokeClaimRequest = RevokeClaimRequest()
    revokeClaimRequest.claimID = claim.uid

    let route = "claims/revoke"
    Util.post(toRoute: route, withProtoMessage: revokeClaimRequest) {
      result in
      if case let .ok(acceptClaimResponse)? = result {
        User.getMe { me in
          var me = me
          me.balance += acceptClaimResponse.claim.amount
          User.updateMe(withUser: me)
        }
        completion()
      }
    }
  }
}
