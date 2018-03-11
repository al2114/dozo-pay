//
//  CircularImageView.swift
//  pesto
//
//  Created by Saurav Mitra on 05/03/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit

class CircularImageView: UIImageView {
  override func layoutSubviews() {
    super.layoutSubviews()

    self.layer.cornerRadius = min(self.bounds.width, self.bounds.height) / 2
    self.layoutIfNeeded()
  }
}

