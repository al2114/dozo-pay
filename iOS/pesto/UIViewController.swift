//
//  UIViewController.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import Foundation

extension UIViewController {
  var topAnchor: NSLayoutYAxisAnchor {
    if #available(iOS 11.0, *) {
      return view.safeAreaLayoutGuide.topAnchor
    } else {
      return topLayoutGuide.topAnchor
    }
  }

  var bottomAnchor: NSLayoutYAxisAnchor {
    if #available(iOS 11.0, *) {
      return view.safeAreaLayoutGuide.bottomAnchor
    } else {
      return bottomLayoutGuide.bottomAnchor
    }
  }

  func addBackground() {
    view.backgroundColor = .primaryBackground
  }
}
