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
  var label: UILabel!

  var captureSession: AVCaptureSession!
  var videoPreviewLayer: AVCaptureVideoPreviewLayer!
  var qrCodeFrameView: UIView!

  override func viewDidLoad() {
    // Get the back-facing camera for capturing videos
    let deviceDiscoverySession = AVCaptureDevice.DiscoverySession(deviceTypes: [.builtInDualCamera, .builtInWideAngleCamera], mediaType: AVMediaType.video, position: .back)
    
    guard let captureDevice = deviceDiscoverySession.devices.first else {
      print("Failed to get the camera device")
      return
    }
    
    do {
      // Get an instance of the AVCaptureDeviceInput class using the previous device object.
      let input = try AVCaptureDeviceInput(device: captureDevice)
      
      // Set the input device on the capture session.
      captureSession = AVCaptureSession()
      captureSession.addInput(input)

      // Initialize a AVCaptureMetadataOutput object and set it as the output device to the capture session.
      let captureMetadataOutput = AVCaptureMetadataOutput()
      captureSession.addOutput(captureMetadataOutput)
      captureMetadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
      captureMetadataOutput.metadataObjectTypes = [AVMetadataObject.ObjectType.qr]

      qrCodeFrameView = UIView()
      qrCodeFrameView.layer.borderColor = UIColor.green.cgColor
      qrCodeFrameView.layer.borderWidth = 2
    } catch {
      print(error)
      return
    }
    videoPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
    videoPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
    videoPreviewLayer?.frame = view.layer.bounds
    view.layer.addSublayer(videoPreviewLayer!)

    label = UILabel()
    label.textColor = .white
    label.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(label)
    NSLayoutConstraint.activate([
      label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
      ])

    if let qrCodeFrameView = qrCodeFrameView {
      view.addSubview(qrCodeFrameView)
    }
    captureSession.startRunning()
  }
}

extension CameraVC: AVCaptureMetadataOutputObjectsDelegate {
  func metadataOutput(_ captureOutput: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {

    guard metadataObjects.count > 0, let metadataObj = metadataObjects[0] as? AVMetadataMachineReadableCodeObject, metadataObj.type == AVMetadataObject.ObjectType.qr else {
      qrCodeFrameView.frame = CGRect.zero
      label.backgroundColor = .clear
      label.text = ""
      return
    }

    let barCodeObject = videoPreviewLayer.transformedMetadataObject(for: metadataObj)
    qrCodeFrameView.frame = barCodeObject!.bounds

    label.backgroundColor = .black
    label.text = metadataObj.stringValue
  }
}

