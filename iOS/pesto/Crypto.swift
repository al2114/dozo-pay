//
//  Crypto.swift
//  pesto
//
//  Created by Saurav Mitra on 24/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import Foundation

struct Crypto {
  private static func pbkdf2SHA1(password: String, salt: Data, keyByteCount: Int, rounds: Int) -> Data? {
    return pbkdf2(hash:CCPBKDFAlgorithm(kCCPRFHmacAlgSHA1), password:password, salt:salt, keyByteCount:keyByteCount, rounds:rounds)
  }

  private static func pbkdf2SHA256(password: String, salt: Data, keyByteCount: Int, rounds: Int) -> Data? {
    return pbkdf2(hash:CCPBKDFAlgorithm(kCCPRFHmacAlgSHA256), password:password, salt:salt, keyByteCount:keyByteCount, rounds:rounds)
  }

  private static func pbkdf2SHA512(password: String, salt: Data, keyByteCount: Int, rounds: Int) -> Data? {
    return pbkdf2(hash:CCPBKDFAlgorithm(kCCPRFHmacAlgSHA512), password:password, salt:salt, keyByteCount:keyByteCount, rounds:rounds)
  }

  private static func pbkdf2(hash :CCPBKDFAlgorithm, password: String, salt: Data, keyByteCount: Int, rounds: Int) -> Data? {
    let passwordData = password.data(using:String.Encoding.utf8)!
    var derivedKeyData = Data(repeating:0, count:keyByteCount)

    let derivationStatus = derivedKeyData.withUnsafeMutableBytes {derivedKeyBytes in
      salt.withUnsafeBytes { saltBytes in

        CCKeyDerivationPBKDF(
          CCPBKDFAlgorithm(kCCPBKDF2),
          password, passwordData.count,
          saltBytes, salt.count,
          hash,
          UInt32(rounds),
          derivedKeyBytes, derivedKeyData.count)
      }
    }
    if (derivationStatus != 0) {
      print("Error: \(derivationStatus)")
      return nil;
    }

    return derivedKeyData
  }

  static func encrypt(text: String) -> String {
    let salt = "0ff231bac4f1bf4b4c5aca8b73afc803930a5aada5de98b2fe054460cc2dfcf3".data(using: .utf8)!
    let keyByteCount = 16
    let rounds = 100000
    let data = pbkdf2SHA256(password: text, salt: salt, keyByteCount: keyByteCount, rounds: rounds)!
    return data.hexString
  }
}

fileprivate extension Data {
  var hexString: String {
    return map { String(format: "%02hhx", $0) }.joined()
  }
}
