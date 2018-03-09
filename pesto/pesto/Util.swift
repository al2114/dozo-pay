//
//  Util.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

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
