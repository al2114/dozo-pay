//
//  CameraVC.swift
//  pesto
//
//  Created by Saurav Mitra on 06/02/2018.
//  Copyright © 2018 Pesto Technologies Ltd. All rights reserved.
//

import UIKit
import AVFoundation

class CameraVC: UIViewController {
  var qrReader: QRReader!

  var captureReceiptButton: UIButton!

  var processingQRCode: Bool = false

  override func viewDidLoad() {
    super.viewDidLoad()

    self.edgesForExtendedLayout = []

    // Get the back-facing camera for capturing videos
    view.backgroundColor = .primaryBackground

    qrReader = QRReader {
      code in
      if !self.processingQRCode {
        self.processingQRCode = true
        if code.hasPrefix("pesto:") {
          print("Found matching prefix")
          let splits = code.split(separator: ":", maxSplits: 3, omittingEmptySubsequences: false)
          if splits.count == 3, let uid = Int32(splits[2]) {
            var user = User()
            user.username = String(splits[1])
            user.uid = uid
            let sendAmountVC = SendAmountVC()
            sendAmountVC.payee = user
            self.show(sendAmountVC, sender: self)
          } else {
            print("Does not match pattern, omitting")
            self.processingQRCode = false
          }
        } else {
          self.processingQRCode = false
        }
      }
    }
    qrReader.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(qrReader)
    NSLayoutConstraint.activate([
      qrReader.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      qrReader.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      qrReader.widthAnchor.constraint(equalTo: view.widthAnchor),
      qrReader.heightAnchor.constraint(equalTo: view.heightAnchor)
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

  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(true)
    processingQRCode = false
  }
}
