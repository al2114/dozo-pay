//
//  Util.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import SwiftProtobuf

//let server = "http://localhost:3001"
//let server = "http://192.168.1.108:3001"
let server = "https://pesto-pay.com"

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
  static func amountToCurrencyString(_ amount: Amount) -> String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .currency
    formatter.maximumFractionDigits = 2
    formatter.locale = Locale.defaultLocale
    return formatter.string(from: NSNumber(value: Double(amount) / 100)) ?? "\(Locale.defaultCurrencySymbol)0.00"
  }

  static func currencyStringToAmount(_ string: String) -> Int32 {
    return Int32(string.replacingOccurrences(of: Locale.defaultCurrencySymbol, with: "").replacingOccurrences(of: ".", with: "").replacingOccurrences(of: ",", with: "")) ?? 0
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
  static func get<T: SwiftProtobuf.Message>(toRoute route: String, completion: @escaping (Result<T>?) -> Void) {
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

extension Util {
  static func dateStringFromProtoTimestamp(_ timestamp: SwiftProtobuf.Google_Protobuf_Timestamp) -> String {

    let calendar = Calendar.current

    let date = Date(timeIntervalSince1970: TimeInterval(timestamp.seconds))
    let dateComponents = calendar.dateComponents([.year, .month, .day], from: date)

    let today = Date()
    let todayComponents = calendar.dateComponents([.year, .month, .day], from: today)

    let yesterday = calendar.date(byAdding: .day, value: -1, to: today)
    let yesterdayComponents = calendar.dateComponents([.year, .month, .day], from: yesterday!)

    let lastWeek = calendar.date(byAdding: .day, value: -7, to: today)

    let dateFormatter = DateFormatter()
    dateFormatter.locale = Locale.defaultLocale

    dateFormatter.dateFormat = "MM/dd/yy HH:mm"

    var dateString = ""

    if dateComponents == todayComponents {
      dateFormatter.dateFormat = "H:mm"
      dateString = "Today \(dateFormatter.string(from: date))"
    }
    else if dateComponents == yesterdayComponents  {
      dateFormatter.dateFormat = "H:mm"
      dateString = "Yesterday \(dateFormatter.string(from: date))"
    }
    else if date > lastWeek! {
      dateFormatter.dateFormat = "E H:mm"
      dateString = dateFormatter.string(from: date)
    }
    else {
      dateFormatter.dateFormat = "MMM dd H:mm"
      dateString = dateFormatter.string(from: date)
    }
    print("to \(dateString)")

    return dateString
  }
}

enum Result<T> {
  case ok(response: T)
  case error(description: String)
}

protocol RequestResponsePair: SwiftProtobuf.Message {
  associatedtype ResponseType: SwiftProtobuf.Message
}

extension RegisterRequest: RequestResponsePair {
  typealias ResponseType = RegisterResponse
}

extension RegisterDeviceTokenRequest: RequestResponsePair {
  typealias ResponseType = NoResponse
}

extension LoginRequest: RequestResponsePair {
  typealias ResponseType = LoginResponse
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
