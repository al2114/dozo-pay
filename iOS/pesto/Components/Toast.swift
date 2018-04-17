//
//  File.swift
//  Pesto Pay
//
//  Created by Andrew Li on 17/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

extension UIViewController {

  func showToast(message : String) {
    showToast(message: message, withDuration: 5.0)
  }

  func showToast(message : String, withDuration duration : Double) {
    let toastLabel = UILabel(frame: CGRect(x: self.view.frame.origin.x, y: self.view.frame.size.height-60, width: self.view.frame.size.width, height: 60))
    toastLabel.textColor = .white
    toastLabel.backgroundColor = .red
    toastLabel.textAlignment = .center;
    toastLabel.font = UIFont.regular.withSize(18)
    toastLabel.text = message
    toastLabel.alpha = 1.0
    toastLabel.clipsToBounds  =  true
    self.view.addSubview(toastLabel)
    UIView.animate(withDuration: 0.5, delay: duration, options: .curveEaseOut, animations: {
      toastLabel.alpha = 0.0
    }, completion: {(isCompleted) in
      toastLabel.removeFromSuperview()
    })
  }
}

