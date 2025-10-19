// Google Books API Response Types

export interface GoogleBooksVolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
}

export interface GoogleBooksVolume {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBooksVolume[];
}

export interface GoogleBooksError {
  error: {
    code: number;
    message: string;
  };
}

// API Request Types
export interface BookSearchParams {
  query: string;
  maxResults?: number;
  startIndex?: number;
}

export interface BookByISBNParams {
  isbn: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Specific API Response Types
export type BookSearchApiResponse = ApiResponse<GoogleBooksResponse>;
export type BookByISBNApiResponse = ApiResponse<GoogleBooksVolume>;
