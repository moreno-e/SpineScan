// Common utility types used throughout the app

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Scanner specific types
export interface ScanResult {
  type: string;
  data: string;
}

export interface ScannerState {
  isScanning: boolean;
  hasPermission: boolean | null;
  scannedData: string | null;
  error: string | null;
}

// Storage types
export interface StorageKeys {
  BOOKS_COLLECTION: '@books_collection';
  USER_PREFERENCES: '@user_preferences';
}

// App state types
export interface AppState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

// Search and filter types
export interface SearchFilters {
  query: string;
  category?: string;
  author?: string;
  sortBy?: 'title' | 'author' | 'dateAdded' | 'publishedDate';
  sortOrder?: 'asc' | 'desc';
}

// Import Book type for AppState
import { Book } from './book';
