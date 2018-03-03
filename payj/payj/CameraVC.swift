//
//  CameraVC.swift
//  payj
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 PayJ. All rights reserved.
//

import UIKit
import AVFoundation

class CameraVC: UIViewController {
  var qrReader: QRReader!

  var captureReceiptButton: UIButton!

  override func viewDidLoad() {
    // Get the back-facing camera for capturing videos
    view.backgroundColor = .primaryBackground

    qrReader = QRReader(frame: .zero)
    qrReader.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(qrReader)
    NSLayoutConstraint.activate([
      qrReader.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      qrReader.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      qrReader.widthAnchor.constraint(equalTo: view.widthAnchor),
      qrReader.heightAnchor.constraint(equalTo: qrReader.widthAnchor)
      ])
    qrReader.start()

    captureReceiptButton = UIButton(type: .system)
    captureReceiptButton.translatesAutoresizingMaskIntoConstraints = false
    captureReceiptButton.setTitle("Capture Receipt", for: .normal)
    view.addSubview(captureReceiptButton)
    NSLayoutConstraint.activate([
      captureReceiptButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      captureReceiptButton.topAnchor.constraint(equalTo: qrReader.bottomAnchor, constant: 10)
      ])
  }
}
