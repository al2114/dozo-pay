//
//  Colors.swift
//  payj
//
//  Created by Saurav Mitra on 21/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
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
  static var pestoGreen: UIColor { return UIColor(hex: "#46a716") }

  static var secondaryTitle: UIColor { return .pestoGreen }
  static var primaryBackground: UIColor { return .pestoGreen }
  static var highlight: UIColor = UIColor(hex: "#52e56d")
  static var accent: UIColor = UIColor(hex: "#2d740a")
  static var primaryTitle: UIColor = UIColor(hex: "#ffffff")
  static var secondaryBackground: UIColor = UIColor(hex: "#ffffff")
  static var subdued: UIColor = UIColor(hex: "#f2f2f2")
  static var text: UIColor = UIColor(hex: "#404040")
  static var red: UIColor = UIColor(hex: "#c54747")
  static var green: UIColor { return .pestoGreen }
}

extension UIFont {
  static var regular: UIFont { return UIFont(name: "GillSans", size: UIFont.labelFontSize)! }
  static var light: UIFont { return UIFont(name: "GillSans-Light", size: UIFont.labelFontSize)! }
}
