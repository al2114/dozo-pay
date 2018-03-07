//
//  TextField.swift
//  payj
//
//  Created by Saurav Mitra on 06/03/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class TextField: UITextField {
  init(fontSize: CGFloat? = nil) {
    super.init(frame: .zero)
    self.textColor = .primaryTitle
    self.textAlignment = .center
    if let fontSize = fontSize {
      self.font = UIFont.regular.withSize(fontSize)
    } else {
      self.font = .regular
    }
  }

  func setPlaceholder(_ text: String) {
    self.attributedPlaceholder = NSAttributedString(string: text, attributes: [.foregroundColor: UIColor.washed])
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
