import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useScanner } from '../hooks/useScanner';
import CameraView from '../components/scanner/CameraView';
import ScanOverlay from '../components/scanner/ScanOverlay';
import ScannerControls from '../components/scanner/ScannerControls';
import ScanResultModal from '../components/scanner/ScanResultModal';

export default function ScannerScreen() {
  const router = useRouter();
  const [isFlashOn, setIsFlashOn] = useState(false);

  const { state, handleBarcodeScanned, resetScanner, retryScan, addBookToCollection } = useScanner();

  const handleCancel = () => {
    router.back();
  };

  const handleToggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const handleManualEntry = () => {
    router.push('/manual-add');
  };

  const handleAddBook = () => {
    if (state.book) {
      addBookToCollection(state.book);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView onBarcodeScanned={handleBarcodeScanned} isActive={state.isScanning} />

      <ScanOverlay isScanning={state.isScanning} message={state.error || 'Point camera at barcode'} />

      <ScannerControls
        onCancel={handleCancel}
        onToggleFlash={handleToggleFlash}
        isFlashOn={isFlashOn}
        onManualEntry={handleManualEntry}
      />

      <ScanResultModal
        visible={state.showResult}
        book={state.book}
        isProcessing={state.isProcessing}
        onAddBook={handleAddBook}
        onRetry={retryScan}
        onCancel={resetScanner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
