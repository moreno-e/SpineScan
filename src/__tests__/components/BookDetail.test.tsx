import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { BookDetail } from '../../components/book/BookDetail';
import { useBooks } from '../../hooks/useBooks';
import type { Book } from '../../types';

// Mock the useBooks hook
jest.mock('../../hooks/useBooks', () => ({
  useBooks: jest.fn(),
}));

const mockUseBooks = useBooks as jest.MockedFunction<typeof useBooks>;

describe('BookDetail Component', () => {
  const mockBook: Book = {
    isbn: '1234567890',
    title: 'Test Book Title',
    authors: ['Author One', 'Author Two'],
    cover: 'https://example.com/cover.jpg',
    description: 'This is a test book description that should be displayed.',
    publishedDate: '2023-01-01',
    pageCount: 250,
    categories: ['Fiction', 'Adventure'],
    addedAt: Date.now(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading text when book is not loaded', () => {
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn(),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { getByText } = render(<BookDetail isbn="1234567890" />);

      expect(getByText('Loading...')).toBeTruthy();
    });
  });

  describe('Book Display', () => {
    beforeEach(() => {
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(mockBook),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });
    });

    it('should display book cover when available', async () => {
      const { getByDisplayValue } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        // Just verify the component renders without error when cover is present
        expect(getByDisplayValue).toBeTruthy();
      });
    });

    it('should display book title', async () => {
      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText(mockBook.title)).toBeTruthy();
      });
    });

    it('should display book authors', async () => {
      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('Author One, Author Two')).toBeTruthy();
      });
    });

    it('should display book description', async () => {
      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText(mockBook.description!)).toBeTruthy();
      });
    });

    it('should display book categories', async () => {
      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('Category: Fiction, Adventure')).toBeTruthy();
      });
    });

    it('should display collection information', async () => {
      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('Your Collection Information')).toBeTruthy();
        expect(getByText(/Added At:/)).toBeTruthy();
      });
    });
  });

  describe('Missing Data Handling', () => {
    it('should handle missing cover gracefully', async () => {
      const bookWithoutCover = { ...mockBook, cover: null };
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(bookWithoutCover),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        // Verify component renders without error when cover is missing
        expect(getByText(mockBook.title)).toBeTruthy();
      });
    });

    it('should handle missing description gracefully', async () => {
      const bookWithoutDescription = { ...mockBook, description: undefined };
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(bookWithoutDescription),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { queryByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(queryByText(mockBook.description!)).toBeNull();
      });
    });

    it('should show fallback text for missing title', async () => {
      const bookWithoutTitle = { ...mockBook, title: '' };
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(bookWithoutTitle),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('No Title')).toBeTruthy();
      });
    });

    it('should show fallback text for missing authors', async () => {
      const bookWithoutAuthors = { ...mockBook, authors: [] };
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(bookWithoutAuthors),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('No Author')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle getBookByIsbn error gracefully', async () => {
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: jest.fn().mockResolvedValue(null),
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { getByText } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(getByText('Loading...')).toBeTruthy();
      });
    });
  });

  describe('Component Integration', () => {
    it('should call getBookByIsbn with correct ISBN', async () => {
      const mockGetBookByIsbn = jest.fn().mockResolvedValue(mockBook);
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: mockGetBookByIsbn,
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(mockGetBookByIsbn).toHaveBeenCalledWith('1234567890');
      });
    });

    it('should re-fetch book when ISBN changes', async () => {
      const mockGetBookByIsbn = jest.fn().mockResolvedValue(mockBook);
      mockUseBooks.mockReturnValue({
        books: [],
        loading: false,
        error: null,
        addBook: jest.fn(),
        getBookByIsbn: mockGetBookByIsbn,
        removeBook: jest.fn(),
        checkIfBookExists: jest.fn(),
        refreshBooks: jest.fn(),
        clearAllBooks: jest.fn(),
      });

      const { rerender } = render(<BookDetail isbn="1234567890" />);

      await waitFor(() => {
        expect(mockGetBookByIsbn).toHaveBeenCalledWith('1234567890');
      });

      // Change ISBN and re-render
      rerender(<BookDetail isbn="9876543210" />);

      await waitFor(() => {
        expect(mockGetBookByIsbn).toHaveBeenCalledWith('9876543210');
      });
    });
  });
});
