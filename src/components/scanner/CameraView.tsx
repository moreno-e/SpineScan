import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView as ExpoCameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

interface CameraViewProps {
  onBarcodeScanned: (data: string) => void;
  isActive: boolean;
}

/**
 * CameraView
 *
 * A functional React Native component that wraps Expo's CameraView for barcode scanning.
 * Single responsibility: Camera operations
 * Handles camera functionality, barcode detection and permissions and displays status messages to the user.
 *
 * Props:
 * - onBarcodeScanned: (data: string) => void
 *      Callback function called with barcode data when a barcode is successfully scanned.
 * - isActive: boolean
 *      If true, enables the barcode scanner and listens for barcode scans; if false, disables scanning.
 *
 * Usage:
 * Should be placed inside a parent screen/component to enable scanning of book barcodes.
 * Shows camera preview and handles permission prompts automatically.
 */

export default function CameraView({ onBarcodeScanned, isActive }: CameraViewProps) {
  const [permission, requestPermission] = useCameraPermissions();

  // Handle permission states
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Text style={styles.subMessage}>Tap to grant camera access for scanning book barcodes</Text>
        <Text style={styles.permissionButton} onPress={requestPermission}>
          Grant Permission
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpoCameraView
        style={styles.camera}
        onBarcodeScanned={isActive ? (result: BarcodeScanningResult) => onBarcodeScanned(result.data) : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subMessage: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
});
