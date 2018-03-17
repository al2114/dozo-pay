//
//  InclusiveView.swift
//  Pesto Pay
//
//  Created by Andrew Li on 17/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

class InclusiveView: UIView {
  override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
    guard !clipsToBounds && !isHidden && (alpha != 0) else {
      return nil
    }
    
    for subview in subviews.reversed() {
      let subpoint = subview.convert(point, from: self)
      if let result = subview.hitTest(subpoint, with: event){
        return result
      }
    }
    return super.hitTest(point, with: event)
  }
}
