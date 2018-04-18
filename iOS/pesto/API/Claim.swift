//
//  claim.swift
//  pesto
//
//  Created by Saurav Mitra on 14/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

extension API {
  static func getClaim(withId claimId: Id, completion: @escaping (Claim,ClaimStatus) -> Void) {
    let route = "claims/info/\(claimId)"
    Requests.get(toRoute: route) { (result: Result<ClaimInfoResponse>?) in
      if case let .ok(ClaimInfoResponse)? = result {
        completion(ClaimInfoResponse.claim,ClaimInfoResponse.status)
      }
    }
  }

  static func acceptClaim(withID claimID: Id, completion: ((Bool) -> Void)?) {
    User.getMe { me in
      var acceptClaimRequest = AcceptClaimRequest()
      acceptClaimRequest.claimID = claimID
      acceptClaimRequest.receiverID = me.uid

      let route = "claims/accept"
      Requests.post(toRoute: route, withProtoMessage: acceptClaimRequest) {
        result in
        if case let .ok(acceptClaimResponse)? = result, acceptClaimResponse.successful {
          var me = me
          me.balance += acceptClaimResponse.claim.amount
          User.updateMe(withUser: me)
          completion?(acceptClaimResponse.successful)
        } else {
          completion?(false)
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
      Requests.post(toRoute: route, withProtoMessage: createClaimRequest) {
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
    Requests.post(toRoute: route, withProtoMessage: revokeClaimRequest) {
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
