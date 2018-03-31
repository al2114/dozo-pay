//
//  Notifications.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 29/03/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import UIKit

struct Notifications {
  static var subscriber: UIViewController?
  static var generalNotifications: [String: () -> Void] = [:]
  static var subscribedNotifications: [String: () -> Void]? = nil

  static func subscribe(_ vc: UIViewController, to notifications: [String: () -> Void]) {
    subscriber = vc
    subscribedNotifications = notifications
  }

  static func receiveNotification(aps: JSON, completion: () -> Void) {
    if aps["content-available"] as? Int == 1 {
      guard let label = aps["notificationsLabel"] as? String else {
        completion()
        return
      }
      if let notificationHandler = generalNotifications[label] ?? subscribedNotifications?[label] {
        notificationHandler()
      }
    } else  {
      print("Notification opened in foreground or background")
    }
    completion()
  }
}

