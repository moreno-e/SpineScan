import { renderHook, act } from '@testing-library/react-native';
import { useBooks } from '../../hooks/useBooks';
import { bookStorage } from '../../services/bookStorage';
import type { Book } from '../../types';

// Mock the bookStorage module
jest.mock('../../services/bookStorage', () => ({
  bookStorage: {
    getAll: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    checkIfExists: jest.fn(),
    clear: jest.fn(),
  },
}));

// This tells TypeScript: "Trust me, this is a Jest mock"
// Now TypeScript knows about .mockResolvedValue()
const mockBookStorage = bookStorage as jest.Mocked<typeof bookStorage>;

describe('useBooks', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('loadBooks functionality', () => {
    it('should load books when books are present', async () => {
      // Arrange: Mock data
      const mockBooks: Book[] = [
        {
          isbn: '1234567890',
          title: 'Test Book 1',
          authors: ['Author 1'],
          cover: null,
          addedAt: Date.now(),
        },
        {
          isbn: '0987654321',
          title: 'Test Book 2',
          authors: ['Author 2'],
          cover: null,
          addedAt: Date.now(),
        },
      ];

      // Mock bookStorage.getAll to return our test data
      mockBookStorage.getAll.mockResolvedValue(mockBooks);

      // Act: Render the hook
      const { result } = renderHook(() => useBooks());

      // Assert: Check initial loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.books).toEqual([]);

      // Wait for the async operation to complete
      await act(async () => {
        // The useEffect will trigger loadBooks automatically
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Assert: Check final state
      expect(result.current.loading).toBe(false);
      expect(result.current.books).toEqual(mockBooks);
      expect(result.current.error).toBeNull();
      expect(mockBookStorage.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle empty books array', async () => {
      // Arrange: Mock empty array
      mockBookStorage.getAll.mockResolvedValue([]);

      // Act
      const { result } = renderHook(() => useBooks());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Assert
      expect(result.current.loading).toBe(false);
      expect(result.current.books).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('should handle storage errors', async () => {
      // Arrange: Mock error
      const errorMessage = 'Storage error';
      mockBookStorage.getAll.mockRejectedValue(new Error(errorMessage));

      // Act
      const { result } = renderHook(() => useBooks());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Assert
      expect(result.current.loading).toBe(false);
      expect(result.current.books).toEqual([]);
      expect(result.current.error).toBe('Failed to load books');
    });
  });

  describe('addBook functionality', () => {
    it('should add a book to the collection', async () => {
      // Arrange: Mock data
      const mockBook: Book = {
        isbn: '1234567890',
        title: 'Test Book 1',
        authors: ['Author 1'],
        cover: null,
        addedAt: Date.now(),
      };

      mockBookStorage.checkIfExists.mockResolvedValue(false);
      mockBookStorage.add.mockResolvedValue(undefined);

      // Act
      const { result } = renderHook(() => useBooks());

      await act(async () => {
        await result.current.addBook(mockBook);
      });

      // Assert
      expect(result.current.books).toEqual([mockBook]);
      expect(mockBookStorage.add).toHaveBeenCalledTimes(1);
      expect(mockBookStorage.add).toHaveBeenCalledWith(mockBook);
    });

    it('should throw an error if the book already exists', async () => {
      const mockBook: Book = {
        isbn: '1234567890',
        title: 'Test Book 1',
        authors: ['Author 1'],
        cover: null,
        addedAt: Date.now(),
      };

      // Mock storage methods
      mockBookStorage.getAll.mockResolvedValue([]);
      mockBookStorage.checkIfExists.mockResolvedValue(false);
      mockBookStorage.add.mockResolvedValue(undefined);

      const { result } = renderHook(() => useBooks());

      // Wait for initial load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Verify no initial error
      expect(result.current.error).toBeNull();

      // First addBook call - should succeed
      await act(async () => {
        await result.current.addBook(mockBook);
      });

      // Verify book was added to local state
      expect(result.current.books).toEqual([mockBook]);
      expect(result.current.error).toBeNull();

      // Update mock to reflect book now exists
      mockBookStorage.checkIfExists.mockResolvedValue(true);

      // Second addBook call - should fail
      await act(async () => {
        try {
          await result.current.addBook(mockBook);
        } catch (error) {
          // Expected to throw - this is fine
        }
      });

      // Verify error was set and book wasn't added again
      expect(result.current.error).toBe('Book already exists in collection');
      expect(result.current.books).toEqual([mockBook]); // Still only one book
      expect(mockBookStorage.add).toHaveBeenCalledTimes(1); // Only called once
    });
  });
  describe('removeBook functionality', () => {
    it('should remove a book from the collection', async () => {
      const mockBook: Book = {
        isbn: '1234567890',
        title: 'Test Book 1',
        authors: ['Author 1'],
        cover: null,
        addedAt: Date.now(),
      };

      // Mock storage to return book initially
      mockBookStorage.getAll.mockResolvedValue([mockBook]);
      // Need to mock the remove method to return undefined. We don't need run the actual remove function.
      mockBookStorage.remove.mockResolvedValue(undefined);

      const { result } = renderHook(() => useBooks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Verify book is loaded
      expect(result.current.books).toEqual([mockBook]);
      expect(result.current.books).toHaveLength(1);

      // Now remove the book
      await act(async () => {
        await result.current.removeBook(mockBook.isbn);
      });

      // Verify book was removed
      expect(result.current.books).toEqual([]);
      expect(result.current.books).toHaveLength(0);
      expect(mockBookStorage.remove).toHaveBeenCalledWith(mockBook.isbn);
    });

    it('should handle removeBook errors', async () => {
      const mockBook: Book = {
        isbn: '1234567890',
        title: 'Test Book 1',
        authors: ['Author 1'],
        cover: null,
        addedAt: Date.now(),
      };

      mockBookStorage.getAll.mockResolvedValue([mockBook]);
      mockBookStorage.remove.mockRejectedValue(new Error('Storage error'));

      const { result } = renderHook(() => useBooks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Verify initial state
      expect(result.current.books).toEqual([mockBook]);
      expect(result.current.error).toBeNull();

      // Try to remove book (should fail)
      await act(async () => {
        try {
          await result.current.removeBook('123');
        } catch (error) {
          // Expected to throw - this is fine
        }
      });

      // Verify error was handled
      expect(result.current.error).toBe('Failed to remove book');
      expect(result.current.books).toEqual([mockBook]); // Book still there
    });
  });
});
