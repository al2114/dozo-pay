//
//  ProtectedTextfield.swift
//  Pesto Pay
//
//  Created by Andrew Li on 17/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class ProtectedTextfield: TextField {
  var button: UIButton!
  
  override init(fontSize: CGFloat?) {
    super.init(fontSize: fontSize)
    
    button = UIButton()
    button.translatesAutoresizingMaskIntoConstraints = false
    button.addTarget(self, action: #selector(onTouch), for: .touchUpInside)
    button.backgroundColor = .red
    self.addSubview(button)
    NSLayoutConstraint.activate([
      button.centerXAnchor.constraint(equalTo: self.centerXAnchor),
      button.centerYAnchor.constraint(equalTo: self.centerYAnchor),
      button.widthAnchor.constraint(equalTo: self.widthAnchor),
      button.heightAnchor.constraint(equalTo: self.heightAnchor)
      ])
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc func onTouch() {
    self.becomeFirstResponder()
  }
}

