import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Book } from '../types';

const STORAGE_KEY = '@BOOKS_COLLECTION';

export const bookStorage = {
  // Get all books from storage
  async getAll(): Promise<Book[]> {
    try {
      const booksJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (!booksJson) {
        return [];
      }
      return JSON.parse(booksJson);
    } catch (error) {
      console.error('Error getting all books:', error);
      return [];
    }
  },

  async getBook(isbn: string): Promise<Book | null> {
    try {
      const books = await this.getAll(); // Get all books
      const book = books.find(book => book.isbn === isbn); // Find by ISBN
      return book || null;
    } catch (error) {
      console.error('Error getting book:', error);
      return null;
    }
  },
  // Add a new book to the collection
  async add(book: Book): Promise<void> {
    try {
      const existingBooks = await this.getAll();
      const updatedBooks = [...existingBooks, book];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error('Failed to add book');
    }
  },

  // Check if a book exists by ISBN
  async checkIfExists(isbn: string): Promise<boolean> {
    try {
      const books = await this.getAll();
      return books.some(book => book.isbn === isbn);
    } catch (error) {
      console.error('Error checking if book exists:', error);
      return false;
    }
  },

  // Remove a book by ISBN
  async remove(isbn: string): Promise<void> {
    try {
      const books = await this.getAll();
      const updatedBooks = books.filter(book => book.isbn !== isbn);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Error removing book:', error);
      throw new Error('Failed to remove book');
    }
  },

  // Clear all books (bonus method)
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing books:', error);
      throw new Error('Failed to clear books');
    }
  },
};
