import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { searchBookByISBN, BookSearchResult } from '../services/bookApi';

import { bookStorage } from '../services/bookStorage';

export interface ScannerState {
  isScanning: boolean;
  isProcessing: boolean;
  showResult: boolean;
  book: BookSearchResult | null;
  error: string | null;
}

export function useScanner() {
  const [state, setState] = useState<ScannerState>({
    isScanning: true,
    isProcessing: false,
    showResult: false,
    book: null,
    error: null,
  });

  const handleBarcodeScanned = useCallback(
    async (data: string) => {
      // Prevent multiple scans while processing
      if (state.isProcessing) return;

      setState(prev => ({
        ...prev,
        isScanning: false,
        isProcessing: true,
        showResult: true,
      }));

      try {
        const book = await searchBookByISBN(data);

        setState(prev => ({
          ...prev,
          isProcessing: false,
          book,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          book: null,
          error: 'Failed to search for book. Please try again.',
        }));
      }
    },
    [state.isProcessing]
  );

  const resetScanner = useCallback(() => {
    setState({
      isScanning: true,
      isProcessing: false,
      showResult: false,
      book: null,
      error: null,
    });
  }, []);

  const retryScan = useCallback(() => {
    setState(prev => ({
      ...prev,
      isScanning: true,
      showResult: false,
      book: null,
      error: null,
    }));
  }, []);

  const addBookToCollection = useCallback(
    async (book: BookSearchResult) => {
      try {
        await bookStorage.add({ ...book, addedAt: Date.now() });

        Alert.alert('Success', `${book.title} added to your collection!`);

        resetScanner();
      } catch (error) {
        Alert.alert('Error', 'Failed to add book to collection');
      }
    },
    [resetScanner]
  );

  return {
    state,
    handleBarcodeScanned,
    resetScanner,
    retryScan,
    addBookToCollection,
  };
}
