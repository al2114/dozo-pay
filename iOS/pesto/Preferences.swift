//
//  Preferences.swift
//  pesto
//
//  Created by Andrew Li on 28/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import Foundation

extension Locale {
  static var defaultLocale: Locale { return Locale(identifier: "en_GB") }
  static var defaultCurrencySymbol: String { return defaultLocale.currencySymbol ?? "" }
}

