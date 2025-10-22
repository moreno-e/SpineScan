import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScannerControlsProps {
  onCancel: () => void;
  onToggleFlash: () => void;
  isFlashOn: boolean;
  onManualEntry: () => void;
}

/**
 * ScannerControls
 *
 * A functional component that renders control buttons for the barcode scanner screen.
 * Provides UI for:
 *   - Cancelling the scan and closing the scanner (onCancel)
 *   - Toggling the camera flash on/off (onToggleFlash, isFlashOn)
 *   - Showing a manual entry interface for entering ISBN/book info manually (onManualEntry)
 *
 * Props:
 * @param {Object} props
 * @param {() => void} props.onCancel - Callback for when the user taps the "Cancel" button.
 * @param {() => void} props.onToggleFlash - Callback for toggling the camera flash.
 * @param {boolean} props.isFlashOn - Whether the flash is currently enabled.
 * @param {() => void} props.onManualEntry - Callback for showing the manual entry form.
 *
 * Usage:
 * <ScannerControls
 *   onCancel={handleCancel}
 *   onToggleFlash={handleFlashToggle}
 *   isFlashOn={flashEnabled}
 *   onManualEntry={handleManualEntry}
 * />
 */

export default function ScannerControls({ onCancel, onToggleFlash, isFlashOn, onManualEntry }: ScannerControlsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Ionicons name="close" size={24} color="#fff" />
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onToggleFlash}>
        <Ionicons name={isFlashOn ? 'flash' : 'flash-off'} size={24} color="#fff" />
        <Text style={styles.buttonText}>{isFlashOn ? 'Flash On' : 'Flash Off'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onManualEntry}>
        <Ionicons name="create" size={24} color="#fff" />
        <Text style={styles.buttonText}>Manual</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
