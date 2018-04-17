//
//  Requests.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import Foundation
import SwiftProtobuf

struct Requests {
  static func get<T: Proto>(toRoute route: String, completion: @escaping (Result<T>?) -> Void) {
    let url = URL(string: "\(server)/\(route)")!
    let request = URLRequest(url: url)

    let handler = { result in
      DispatchQueue.main.async {
        completion(result)
      }
    }

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
      guard let data = data, error == nil else {
        // check for fundamental networking error
        print("error=\(String(describing: error))")
        handler(nil)
        return
      }

      guard let httpStatus = response as? HTTPURLResponse else {
        handler(nil)
        return
      }

      guard httpStatus.statusCode == 200 else { // check for http errors
        print("response = \(String(describing: response))")
        print("statusCode should be 200, but is \(httpStatus.statusCode)")
        completion(nil)
        return
      }

      if let response = try? T(serializedData: data) {
        handler(.ok(response: response))
      } else if let string = String.init(data: data, encoding: .utf8) {
        print("ERROR 🤯: \(string)")
        handler(.error(description: string))
      } else {
        handler(nil)
      }
    }
    task.resume()
  }

  static func post<T: RequestResponsePair>(toRoute route: String, withProtoMessage message: T, completion: ((Result<T.ResponseType>?) -> Void)? = nil) {
    let url = URL(string: "\(server)/\(route)")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = try! message.serializedData()

    let handler = { result in
      completion.map { completion in
        DispatchQueue.main.async {
          completion(result)
        }
      }
    }

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
      guard let data = data, error == nil else {
        // check for fundamental networking error
        print("error=\(String(describing: error))")
        handler(nil)
        return
      }

      guard let httpStatus = response as? HTTPURLResponse else {
        handler(nil)
        return
      }

      guard httpStatus.statusCode == 200 else { // check for http errors
        print("response = \(String(describing: response))")
        print("statusCode should be 200, but is \(httpStatus.statusCode)")
        handler(nil)
        return
      }

      if let response = try? T.ResponseType(serializedData: data) {
        handler(.ok(response: response))
      } else if let string = String.init(data: data, encoding: .utf8) {
        print("ERROR 🤯: \(string)")
        handler(.error(description: string))
      } else {
        handler(nil)
      }
    }
    task.resume()
  }
}
