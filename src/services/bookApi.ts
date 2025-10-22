import axios from 'axios';

// Google Books API base URL
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export interface GoogleBooksResponse {
  items?: Array<{
    volumeInfo: {
      title: string;
      authors?: string[];
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
      description?: string;
      publishedDate?: string;
      pageCount?: number;
      categories?: string[];
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
    };
  }>;
}

export interface BookSearchResult {
  isbn: string;
  title: string;
  authors: string[];
  cover: string | null;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
}

/**
 * Search for a book by ISBN using Google Books API
 * No API key required for basic usage (1000 requests/day limit)
 */
export async function searchBookByISBN(isbn: string): Promise<BookSearchResult | null> {
  try {
    const response = await axios.get<GoogleBooksResponse>(GOOGLE_BOOKS_API, {
      params: {
        q: `isbn:${isbn}`,
        maxResults: 1,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return null;
    }

    const book = response.data.items[0];
    const volumeInfo = book.volumeInfo;

    // Extract ISBN from industry identifiers
    const isbnIdentifier =
      volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier || isbn;

    return {
      isbn: isbnIdentifier,
      title: volumeInfo.title,
      authors: volumeInfo.authors || [],
      cover: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || null,
      description: volumeInfo.description,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
    };
  } catch (error) {
    console.error('Error searching for book by ISBN:', error);

    throw new Error('Failed to search for book. Please check your internet connection.');
  }
}

/**
 * Search for books by title/author using Google Books API
 */
export async function searchBooksByQuery(query: string): Promise<BookSearchResult[]> {
  try {
    const response = await axios.get<GoogleBooksResponse>(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        maxResults: 10,
      },
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map(book => {
      const volumeInfo = book.volumeInfo;

      // Extract ISBN from industry identifiers
      const isbnIdentifier =
        volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier || '';

      return {
        isbn: isbnIdentifier,
        title: volumeInfo.title,
        authors: volumeInfo.authors || [],
        cover: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || null,
        description: volumeInfo.description,
        publishedDate: volumeInfo.publishedDate,
        pageCount: volumeInfo.pageCount,
        categories: volumeInfo.categories,
      };
    });
  } catch (error) {
    console.error('Error searching for books:', error);

    throw new Error('Failed to search for books. Please check your internet connection.');
  }
}
