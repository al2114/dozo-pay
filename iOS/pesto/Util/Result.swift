//
//  Result.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

enum Result<T> {
  case ok(response: T)
  case error(description: String)
}
