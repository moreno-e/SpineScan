export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  cover: string | null;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  addedAt: number;
  status?: 'owned' | 'wishlist' | 'read';
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
