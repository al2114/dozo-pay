//
//  NavigationController.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 09/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

extension UINavigationController {
  func configure() {
    navigationBar.setBackgroundImage(UIImage(), for: .default)
    navigationBar.backgroundColor = .primaryBackground
    navigationBar.shadowImage = UIImage()
    navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: UIBarButtonItemStyle.plain, target: nil, action: nil)
//    navigationBar.backIndicatorImage = UIImage()
    //    navVC.navigationBar.isTranslucent = true
    
    navigationBar.barTintColor = .primaryBackground
    navigationBar.tintColor = .primaryTitle
  }
}
