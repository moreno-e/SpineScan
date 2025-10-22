import { searchBookByISBN, searchBooksByQuery } from '../../services/bookApi';

// Mock axios to avoid actual API calls in tests
jest.mock('axios');
const mockedAxios = require('axios');

describe('bookApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchBookByISBN', () => {
    it('should return book data when ISBN is found', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              volumeInfo: {
                title: "Harry Potter and the Sorcerer's Stone",
                authors: ['J.K. Rowling'],
                imageLinks: {
                  thumbnail: 'https://example.com/cover.jpg',
                },
                description: 'A magical adventure...',
                publishedDate: '1998-09-01',
                pageCount: 309,
                categories: ['Fiction', 'Fantasy'],
                industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780545582889' }],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchBookByISBN('9780545582889');

      expect(result).toEqual({
        isbn: '9780545582889',
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ['J.K. Rowling'],
        cover: 'https://example.com/cover.jpg',
        description: 'A magical adventure...',
        publishedDate: '1998-09-01',
        pageCount: 309,
        categories: ['Fiction', 'Fantasy'],
      });

      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes', {
        params: { q: 'isbn:9780545582889', maxResults: 1 },
      });
    });

    it('should return null when no book is found', async () => {
      const mockResponse = {
        data: {
          items: [],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchBookByISBN('invalid-isbn');

      expect(result).toBeNull();
    });

    it('should throw error when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(searchBookByISBN('9780545582889')).rejects.toThrow(
        'Failed to search for book. Please check your internet connection.'
      );
    });
  });

  describe('searchBooksByQuery', () => {
    it('should return array of books when query matches', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              volumeInfo: {
                title: 'Harry Potter 1',
                authors: ['J.K. Rowling'],
                imageLinks: { thumbnail: 'https://example.com/cover1.jpg' },
                industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780545582889' }],
              },
            },
            {
              volumeInfo: {
                title: 'Harry Potter 2',
                authors: ['J.K. Rowling'],
                imageLinks: { thumbnail: 'https://example.com/cover2.jpg' },
                industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780545582896' }],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchBooksByQuery('Harry Potter');

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Harry Potter 1');
      expect(result[1].title).toBe('Harry Potter 2');
    });

    it('should return empty array when no books found', async () => {
      const mockResponse = {
        data: {
          items: [],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchBooksByQuery('nonexistent book');

      expect(result).toEqual([]);
    });
  });
});
