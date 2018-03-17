//
//  String.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 06/03/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

extension String {
  var attributed: NSAttributedString {
    return NSAttributedString(string: self)
  }

  func colored(with color: UIColor) -> NSAttributedString {
    return NSAttributedString(string: self, attributes: [.foregroundColor: color])
  }
}

extension NSAttributedString {
  func withAttribute(_ attribute: NSAttributedStringKey, value: Any) -> NSAttributedString {
    let string = NSMutableAttributedString(attributedString: self)
    string.addAttribute(attribute, value: value, range: NSRange(location: 0, length: self.length))
    return string
  }
  
  func withKerning(_ value: Any) -> NSAttributedString {
    let string = NSMutableAttributedString(attributedString: self)
    string.addAttribute(.kern, value: value, range: NSRange(location: 0, length: self.length-1))
    return string
  }
}

func +(left: NSAttributedString, right: NSAttributedString) -> NSAttributedString
{
  let result = NSMutableAttributedString()
  result.append(left)
  result.append(right)
  return result
}
