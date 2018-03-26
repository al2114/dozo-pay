//
//  Colors.swift
//  pesto
//
//  Created by Saurav Mitra on 21/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

extension UIColor {
  convenience init(hex: String, alpha: CGFloat = 1) {
    assert(hex[hex.startIndex] == "#", "Expected hex string of format #RRGGBB")

    let scanner = Scanner(string: hex)
    scanner.scanLocation = 1  // skip #

    var rgb: UInt32 = 0
    scanner.scanHexInt32(&rgb)

    self.init(
      red:   CGFloat((rgb & 0xFF0000) >> 16)/255.0,
      green: CGFloat((rgb &   0xFF00) >>  8)/255.0,
      blue:  CGFloat((rgb &     0xFF)      )/255.0,
      alpha: alpha)
  }
}

extension UIColor {
  static var pestoGreen: UIColor { return UIColor(hex: "#16a747") }

  static var primaryBackground: UIColor { return .pestoGreen }
  static var secondaryBackground: UIColor { return UIColor(hex: "#ffffff") }
  static var primaryTitle: UIColor { return UIColor(hex: "#ffffff") }
  static var secondaryTitle: UIColor { return .pestoGreen }
  static var text: UIColor { return UIColor(hex: "#404040") }
  static var secondaryText: UIColor { return UIColor(hex: "#b5b5b5") }
  static var accent: UIColor { return UIColor(hex: "#16a747") }
  static var highlight: UIColor { return UIColor(hex: "#52e56d") }
  static var subdued: UIColor { return UIColor(hex: "#f2f2f2") }
  static var washed: UIColor { return UIColor.white.withAlphaComponent(0.4) }
  static var red: UIColor { return UIColor(hex: "#d70000") }
  static var green: UIColor { return .pestoGreen }
}

extension UIFont {
  static var bold: UIFont { return UIFont(name: "GillSans-Bold", size: UIFont.labelFontSize)! }
  static var semibold: UIFont { return UIFont(name: "GillSans-SemiBold", size: UIFont.labelFontSize)! }
  static var regular: UIFont { return UIFont(name: "GillSans", size: UIFont.labelFontSize)! }
  static var light: UIFont { return UIFont(name: "GillSans-Light", size: UIFont.labelFontSize)! }
}
