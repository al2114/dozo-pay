//
//  Util.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import SwiftProtobuf

let server = "http://localhost:3001"

struct Util {
  static var filter = CIFilter(name: "CIQRCodeGenerator")!

  static func qrCode(from string: String, withSize size: CGSize) -> UIImage? {
    //let data = string.data(using: String.Encoding.ascii)
    let data = string.data(using: String.Encoding.isoLatin1, allowLossyConversion: false)

    filter.setValue(data, forKey: "inputMessage")
    //filter.setValue("Q", forKey: "inputCorrectionLevel")

    if let output = filter.outputImage {
      let extent = output.extent
      let transform = CGAffineTransform(scaleX: size.width / extent.width, y: size.height / extent.height)
      return UIImage(ciImage: output.transformed(by: transform))
    }

    return nil
  }
}

extension Util {
  static func amountToCurrencyString(_ amount: Double) -> String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .currency
    formatter.maximumFractionDigits = 2
    formatter.locale = Locale.defaultLocale
    return formatter.string(from: amount as NSNumber) ?? "\(Locale.defaultCurrencySymbol)0.00"
  }

  static func currencyStringToAmount(_ string: String) -> Double {
    return Double(string.replacingOccurrences(of: Locale.defaultCurrencySymbol, with: "").replacingOccurrences(of: ",", with: "")) ?? 0
  }
}

extension Util {
  static func switchTo(viewController: UIViewController, presentingController: UIViewController? = nil, window: UIWindow? = UIApplication.shared.keyWindow) {
    let navVC = UINavigationController(rootViewController: viewController)
    navVC.configure()
    if let presentingController = presentingController {
      presentingController.present(navVC, animated: true) {
        window?.rootViewController = navVC
      }
    } else {
      window?.rootViewController = navVC
    }
  }
}

extension Util {
  static func post<T: RequestResponsePair>(toRoute route: String, withProtoMessage message: T, completion: ((Result<T.ResponseType>?) -> Void)? = nil) {
    let url = URL(string: "\(server)/register")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = try! message.serializedData()
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
      guard let data = data, error == nil else {
        // check for fundamental networking error
        print("error=\(String(describing: error))")
        completion?(nil)
        return
      }

      guard let httpStatus = response as? HTTPURLResponse else {
        completion?(nil)
        return
      }

      guard httpStatus.statusCode == 200 else { // check for http errors
        print("response = \(String(describing: response))")
        print("statusCode should be 200, but is \(httpStatus.statusCode)")
        completion?(nil)
        return
      }

      if let response = try? T.ResponseType(serializedData: data) {
        completion?(.ok(response: response))
      } else if let string = String.init(data: data, encoding: .utf8) {
        completion?(.error(description: string))
      } else {
        completion?(nil)
      }
    }
    task.resume()
  }
}

enum Result<T> {
  case ok(response: T)
  case error(description: String)
}

protocol RequestResponsePair: SwiftProtobuf.Message {
  associatedtype ResponseType: SwiftProtobuf.Message
}

extension Pesto_UserMessages_RegisterRequest: RequestResponsePair {
  typealias ResponseType = Pesto_UserMessages_RegisterResponse
}

extension Pesto_UserMessages_LoginRequest: RequestResponsePair {
  typealias ResponseType = Pesto_UserMessages_LoginResponse
}

extension Pesto_UserMessages_TransactionRequest: RequestResponsePair {
  typealias ResponseType = Pesto_UserMessages_TransactionResponse
}

extension Pesto_UserMessages_TopupRequest: RequestResponsePair {
  typealias ResponseType = Pesto_UserMessages_TopupResponse
}

extension UIViewController {
  var topAnchor: NSLayoutYAxisAnchor {
    if #available(iOS 11.0, *) {
      return view.safeAreaLayoutGuide.topAnchor
    } else {
      return topLayoutGuide.topAnchor
    }
  }

  var bottomAnchor: NSLayoutYAxisAnchor {
    if #available(iOS 11.0, *) {
      return view.safeAreaLayoutGuide.bottomAnchor
    } else {
      return bottomLayoutGuide.bottomAnchor
    }
  }
}