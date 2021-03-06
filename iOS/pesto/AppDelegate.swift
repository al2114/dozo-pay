//
//  AppDelegate.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import UserNotifications

typealias JSON = [AnyHashable: Any]

struct State {
  static var deviceToken: String? = nil
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    if let notification = launchOptions?[.remoteNotification] as? JSON {
      let _ = notification["aps"] as! JSON
      print("Opened via notification")
    }

    UIApplication.shared.statusBarStyle = .lightContent
    window = UIWindow(frame: UIScreen.main.bounds)
    let loginVC = LoginVC()
    Util.switchTo(viewController: loginVC, window: window)

    let userId = Id(UserDefaults.standard.integer(forKey: "user.uid"))
    if userId != 0 {
      API.getMe(withId: userId) { me in
        if let me = me {
          User.updateMe(withUser: me)
          let homeVC = HomeVC()
          Util.switchTo(viewController: homeVC, window: self.window)
        }
      }
    }

    window?.backgroundColor = .primaryBackground
    window?.makeKeyAndVisible()

    UNUserNotificationCenter.current().delegate = self
    registerForPushNotifications(withApplication: application)

    return true
  }

  func registerForPushNotifications(withApplication application: UIApplication) {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) {
      (granted, error) in
      guard granted else { return }
      DispatchQueue.main.async {
        application.registerForRemoteNotifications()
      }
    }
  }

  func applicationWillResignActive(_ application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
  }

  func applicationWillEnterForeground(_ application: UIApplication) {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
  }

  func applicationDidBecomeActive(_ application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  }

  func applicationWillTerminate(_ application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    PersistenceService.saveContext()
  }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    State.deviceToken = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("Failed to register: \(error)")
  }

  func userNotificationCenter(_ center: UNUserNotificationCenter,  willPresent notification: UNNotification, withCompletionHandler   completionHandler: @escaping (_ options:   UNNotificationPresentationOptions) -> Void) {
    print("Notification from foreground")
    Notifications.receiveNotification(info: notification.request.content.userInfo) {
      completionHandler([.alert, .badge, .sound])
    }
  }

  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    // if you set a member variable in didReceiveRemoteNotification, you  will know if this is from closed or background
    print("Notification from closed or background")
    Notifications.receiveNotification(info: response.notification.request.content.userInfo) {
      completionHandler()
    }
  }
}
