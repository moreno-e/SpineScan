import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScanOverlayProps {
  isScanning: boolean;
  message?: string;
}
/**
 * ScanOverlay
 *
 * A UI component that overlays the camera view during barcode scanning.
 * Displays a highlighted scan area with styled corners and informational messages to guide the user.
 *
 * Props:
 * @param {boolean} isScanning - Whether scanning is currently in progress. Shows a "Scanning..." message when true.
 * @param {string} [message] - Optional message to display below the scan area. Defaults to "Point camera at barcode".
 *
 * Usage:
 * <ScanOverlay isScanning={scanActive} message="Align barcode within frame" />
 */

export default function ScanOverlay({ isScanning, message = 'Point camera at barcode' }: ScanOverlayProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.scanArea}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        {isScanning && <Text style={styles.scanningText}>Scanning...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 150,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scanningText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
