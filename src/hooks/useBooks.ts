import { useState, useEffect, useCallback } from 'react';
import { bookStorage } from '../services/bookStorage';
import type { Book } from '../types';

interface UseBooksReturn {
  // State
  books: Book[];
  loading: boolean;
  error: string | null;

  // Actions
  addBook: (book: Book) => Promise<void>;
  getBookByIsbn: (isbn: string) => Promise<Book | null>;
  removeBook: (isbn: string) => Promise<void>;
  checkIfBookExists: (isbn: string) => Promise<boolean>;
  refreshBooks: () => Promise<void>;
  clearAllBooks: () => Promise<void>;
}

/**
 * Custom hook for managing the local book collection.
 *
 * Features:
 * - Loads the book list from AsyncStorage on mount
 * - Provides loading and error states
 * - Actions to add, remove, check, refresh, and clear books
 * - Keeps local state and async storage in sync
 *
 * @returns {Object} UseBooksReturn
 *   @property {Book[]} books - Current list of books in the collection
 *   @property {boolean} loading - Indicator for loading state
 *   @property {string | null} error - Error message if any operation fails
 *   @property {(book: Book) => Promise<void>} addBook - Adds a book to the collection; throws if ISBN exists
 *   @property {(isbn: string) => Promise<void>} removeBook - Removes a book by ISBN
 *   @property {(isbn: string) => Promise<boolean>} checkIfBookExists - Checks if a book with the given ISBN exists
 *   @property {() => Promise<void>} refreshBooks - Reloads all books from storage
 *   @property {() => Promise<void>} clearAllBooks - Removes all books from the collection
 *
 * @example
 * const { books, addBook, removeBook, loading, error } = useBooks();
 *
 * // Add a new book
 * await addBook({
 *   isbn: '1234567890',
 *   title: 'New Title',
 *   authors: ['Someone'],
 *   description: 'Some desc',
 *   cover: null
 * });
 */

export const useBooks = (): UseBooksReturn => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load books from storage on mount
  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const allBooks = await bookStorage.getAll();

      setBooks(allBooks);
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load books when hook is first used
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Add a new book to the collection
  const addBook = useCallback(async (book: Book) => {
    try {
      setError(null);

      // Check if book already exists
      const exists = await bookStorage.checkIfExists(book.isbn);
      if (exists) {
        throw new Error('Book already exists in collection');
      }

      await bookStorage.add(book);

      // Update local state
      setBooks(prevBooks => [...prevBooks, book]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add book';
      setError(errorMessage);
      throw err; // Re-throw so component can handle it
    }
  }, []);

  const getBookByIsbn = useCallback(async (isbn: string) => {
    try {
      const book = await bookStorage.getBook(isbn);

      return book || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get book by ISBN';

      setError(errorMessage);

      return null;
    }
  }, []);

  // Remove a book from the collection
  const removeBook = useCallback(async (isbn: string) => {
    try {
      setError(null);
      await bookStorage.remove(isbn);

      // Update local state
      setBooks(prevBooks => prevBooks.filter(book => book.isbn !== isbn));
    } catch (err) {
      setError('Failed to remove book');
      console.error('Error removing book:', err);
      throw err;
    }
  }, []);

  // Check if a book exists (useful for scanner)
  const checkIfBookExists = useCallback(async (isbn: string): Promise<boolean> => {
    try {
      return await bookStorage.checkIfExists(isbn);
    } catch (err) {
      console.error('Error checking if book exists:', err);
      return false;
    }
  }, []);

  // Refresh books from storage
  const refreshBooks = useCallback(async () => {
    await loadBooks();
  }, [loadBooks]);

  // Clear all books (useful for testing or reset)
  const clearAllBooks = useCallback(async () => {
    try {
      setError(null);
      await bookStorage.clear();
      setBooks([]);
    } catch (err) {
      setError('Failed to clear books');
      console.error('Error clearing books:', err);
      throw err;
    }
  }, []);

  return {
    // State
    books,
    loading,
    error,

    // Actions
    addBook,
    getBookByIsbn,
    removeBook,
    checkIfBookExists,
    refreshBooks,
    clearAllBooks,
  };
};
