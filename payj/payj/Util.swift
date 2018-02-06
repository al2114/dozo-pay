//
//  Util.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
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
