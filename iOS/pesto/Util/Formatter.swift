//
//  DateFormatter.swift
//  Pesto Pay
//
//  Created by Saurav Mitra on 18/04/2018.
//  Copyright © 2018 Pesto Techonologies Ltd. All rights reserved.
//

import Foundation

struct Formatter {
  static func dateString(fromTimestamp timestamp: Timestamp) -> String {
    let calendar = Calendar.current

    let date = Date(timeIntervalSince1970: TimeInterval(timestamp.seconds))
    let dateComponents = calendar.dateComponents([.year, .month, .day], from: date)

    let today = Date()
    let todayComponents = calendar.dateComponents([.year, .month, .day], from: today)

    let yesterday = calendar.date(byAdding: .day, value: -1, to: today)
    let yesterdayComponents = calendar.dateComponents([.year, .month, .day], from: yesterday!)

    let lastWeek = calendar.date(byAdding: .day, value: -7, to: today)

    let dateFormatter = DateFormatter()
    dateFormatter.locale = Locale.defaultLocale

    dateFormatter.dateFormat = "MM/dd/yy HH:mm"

    var dateString = ""

    if dateComponents == todayComponents {
      dateFormatter.dateFormat = "H:mm"
      dateString = "Today \(dateFormatter.string(from: date))"
    }
    else if dateComponents == yesterdayComponents  {
      dateFormatter.dateFormat = "H:mm"
      dateString = "Yesterday \(dateFormatter.string(from: date))"
    }
    else if date > lastWeek! {
      dateFormatter.dateFormat = "E H:mm"
      dateString = dateFormatter.string(from: date)
    }
    else {
      dateFormatter.dateFormat = "MMM dd H:mm"
      dateString = dateFormatter.string(from: date)
    }
    print("to \(dateString)")

    return dateString
  }

  static func currencyString(fromAmount amount: Amount) -> String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .currency
    formatter.maximumFractionDigits = 2
    formatter.locale = Locale.defaultLocale
    return formatter.string(from: NSNumber(value: Double(amount) / 100)) ?? "\(Locale.defaultCurrencySymbol)0.00"
  }

  static func amount(fromCurrencyString string: String) -> Int32 {
    return Int32(string.replacingOccurrences(of: Locale.defaultCurrencySymbol, with: "").replacingOccurrences(of: ".", with: "").replacingOccurrences(of: ",", with: "")) ?? 0
  }
}
