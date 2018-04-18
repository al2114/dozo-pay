//
//  Notifications.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 29/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

struct Notifications {
  static private var subscriber: UIViewController?
  static private var generalNotifications: [String: (JSON) -> Void] = [:]
  static private var subscribedNotifications: [String: (JSON) -> Void]? = nil

  static func subscribe(_ vc: UIViewController, to notifications: [String: (JSON) -> Void]) {
    subscriber = vc
    subscribedNotifications = notifications
  }

  static func receiveNotification(info: JSON, completion: () -> Void) {
    defer {
      completion()
    }

    guard let label = info["notificationIdentifier"] as? String else {
      return
    }

    generalNotifications[label]?(info)
    subscribedNotifications?[label]?(info)
  }
}
