import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../../types/book';
import { theme } from '../../constants/theme';
import { useBooks } from '../../hooks/useBooks';
import { useEffect, useState } from 'react';

interface BookDetailProps {
  isbn: string;
}

export const BookDetail = ({ isbn }: BookDetailProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const { getBookByIsbn } = useBooks();
  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBookByIsbn(isbn);

      if (book) {
        setBook(book);
      }
    };
    fetchBook();
  }, [isbn]);

  return (
    <View style={styles.container}>
      {book && (
        <>
          {book?.cover && <Image source={{ uri: book.cover }} style={styles.cover} />}

          <View style={styles.textContainer}>
            <Text style={styles.title}>{book?.title || 'No Title'}</Text>
            <Text style={styles.authors}>{book?.authors?.join(', ') || 'No Author'}</Text>
            <Text style={styles.categories}>Category: {book?.categories?.join(', ') || 'No Categories'}</Text>
            {book?.description && <Text style={styles.description}>{book?.description}</Text>}

            <View style={styles.collectionInformation}>
              <Text style={styles.collectionInformationTitle}>Your Collection Information</Text>
              <Text>Added At: {new Date(book?.addedAt || 0).toLocaleString() || 'No Added At'}</Text>
            </View>
          </View>
        </>
      )}
      {!book && <Text style={styles.loadingText}>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 34,
  },
  authors: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  loadingText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  categories: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.lg,
  },
  collectionInformation: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  collectionInformationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
});
