//
//  ProtoTypeAliases.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import SwiftProtobuf

typealias Id = Int32
typealias Amount = Int32

typealias Timestamp = SwiftProtobuf.Google_Protobuf_Timestamp
typealias Proto = SwiftProtobuf.Message

typealias User = Pesto_Models_User
typealias Room = Pesto_Models_Room
typealias Claim = Pesto_Models_Claim
typealias ClaimStatus = Pesto_Models_ClaimStatus
typealias RoomItem = Pesto_Models_RoomItem
typealias Contact = Pesto_Models_Contact
typealias Profile = Pesto_Models_Profile
typealias Transaction = Pesto_Models_Transaction

typealias CheckPasscodeRequest = Pesto_UserMessages_CheckPasscodeRequest
typealias TransactionRequest = Pesto_UserMessages_TransactionRequest
typealias TransactionResponse = Pesto_UserMessages_TransactionResponse
typealias TopupRequest = Pesto_UserMessages_TopupRequest
typealias TopupResponse = Pesto_UserMessages_TopupResponse
typealias AcceptClaimRequest = Pesto_UserMessages_AcceptClaimRequest
typealias AcceptClaimResponse = Pesto_UserMessages_AcceptClaimResponse
typealias CreateClaimRequest = Pesto_UserMessages_CreateClaimRequest
typealias CreateClaimResponse = Pesto_UserMessages_CreateClaimResponse
typealias RevokeClaimRequest = Pesto_UserMessages_RevokeClaimRequest
typealias RevokeClaimResponse = Pesto_UserMessages_RevokeClaimResponse
typealias ClaimInfoResponse = Pesto_UserMessages_ClaimInfoResponse
typealias RegisterRequest = Pesto_UserMessages_RegisterRequest
typealias RegisterResponse = Pesto_UserMessages_RegisterResponse
typealias LoginRequest = Pesto_UserMessages_LoginRequest
typealias LoginResponse = Pesto_UserMessages_LoginResponse
typealias LogoutRequest = Pesto_UserMessages_LogoutRequest
typealias GetContactResponse = Pesto_UserMessages_GetContactsResponse
typealias AddContactRequest = Pesto_UserMessages_AddContactRequest
typealias GetTransactionsResponse = Pesto_UserMessages_GetTransactionsResponse
typealias SuccessResponse = Pesto_UserMessages_SuccessResponse
typealias NoResponse = Pesto_UserMessages_NoResponse
