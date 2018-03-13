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
        let sendAmountVC = SendAmountVC()
        var user = User()
        user.username = code
        sendAmountVC.payee = user
        self.show(sendAmountVC, sender: self)
      }
    }
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

  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(true)
    processingQRCode = false
  }
}
