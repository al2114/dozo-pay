//
//  CircleButton.swift
//  payj
//
//  Created by Andrew Li on 25/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit

class CircleButton: UIButton {
  var accentColor: UIColor
  
  init(accentColor: UIColor = .clear) {
    self.accentColor = accentColor
    super.init(frame: .zero)
    
    updateColors()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    
    self.imageView?.layer.cornerRadius = min(self.bounds.width, self.bounds.height) / 2
    self.layoutIfNeeded()
  }
  
  override func setImage(_ image: UIImage?, for state: UIControlState) {
    super.setImage(image?.withRenderingMode(.alwaysTemplate), for: state)
  }
  
  func updateColors() {
    self.tintColor = accentColor
    
    self.imageView?.layer.borderWidth = 1
    self.imageView?.clipsToBounds = true

//    self.imageView?.layer.borderColor = accentColor.cgColor
//    self.layer.borderColor = accentColor.cgColor
  }
  
  func setAccentColor(_ color: UIColor) {
    self.accentColor = color
    updateColors()
  }
}
