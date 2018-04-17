//
//  Util.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

struct Util {
  static func switchTo(viewController: UIViewController, presentingController: UIViewController? = nil, window: UIWindow? = UIApplication.shared.keyWindow) {
    let navVC = UINavigationController(rootViewController: viewController)
    navVC.configure()
    if let presentingController = presentingController {
      presentingController.present(navVC, animated: true) {
        window?.rootViewController = navVC
      }
    } else {
      window?.rootViewController = navVC
    }
  }
}
