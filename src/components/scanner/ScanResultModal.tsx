import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookSearchResult } from '../../services/bookApi';

interface ScanResultModalProps {
  visible: boolean;
  book: BookSearchResult | null;
  isProcessing: boolean;
  onAddBook: () => void;
  onRetry: () => void;
  onCancel: () => void;
}

/**
 * ScanResultModal
 *
 * A reusable modal component that displays the result of a barcode scan.
 * Handles three main UI states:
 *   - While processing (searching for book info)
 *   - When a matching book is found (show summary, with option to add to collection)
 *   - When the book is not found (show message, with retry/cancel options)
 *
 * Props:
 * @param {boolean} visible - Controls the visibility of the modal.
 * @param {BookSearchResult | null} book - The book data returned from search, or null if not found.
 * @param {boolean} isProcessing - Whether the app is currently searching for the book.
 * @param {() => void} onAddBook - Handler for when the user taps "Add to Collection".
 * @param {() => void} onRetry - Handler for retrying the scan/search.
 * @param {() => void} onCancel - Handler for dismissing the modal.
 *
 * Usage:
 * <ScanResultModal
 *   visible={modalVisible}
 *   book={foundBook}
 *   isProcessing={isSearching}
 *   onAddBook={handleAddBook}
 *   onRetry={handleRetry}
 *   onCancel={handleCancel}
 * />
 *
 * UI Variants:
 * - Shows a loading state when `isProcessing` is true.
 * - If `book` is valid, shows basic book info and add button.
 * - If `book` is null and not processing, shows "not found" message and retry/cancel buttons.
 */

export default function ScanResultModal({
  visible,
  book,
  isProcessing,
  onAddBook,
  onRetry,
  onCancel,
}: ScanResultModalProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <Ionicons name="search" size={48} color="#4CAF50" />
              <Text style={styles.processingText}>Searching for book...</Text>
            </View>
          ) : book ? (
            <View style={styles.bookContainer}>
              <View style={styles.bookInfo}>
                {book.cover && <Image source={{ uri: book.cover }} style={styles.bookCover} />}
                <View style={styles.bookDetails}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>by {book.authors.join(', ')}</Text>
                  {book.publishedDate && <Text style={styles.bookDate}>Published: {book.publishedDate}</Text>}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={onAddBook}>
                  <Ionicons name="add" size={20} color="#fff" />
                  <Text style={styles.addButtonText}>Add to Collection</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.notFoundContainer}>
              <Ionicons name="book-outline" size={48} color="#FF9800" />
              <Text style={styles.notFoundTitle}>Book Not Found</Text>
              <Text style={styles.notFoundText}>We couldn't find this book in our database.</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                  <Ionicons name="refresh" size={20} color="#fff" />
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  processingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  bookContainer: {
    alignItems: 'center',
  },
  bookInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookDate: {
    fontSize: 12,
    color: '#999',
  },
  notFoundContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
});
