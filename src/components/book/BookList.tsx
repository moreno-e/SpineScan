import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import { Book } from '../../types';
import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { BookCard } from './BookCard';
import { theme } from '../../constants/theme';

export const BookList = () => {
  const { books, loading, error, removeBook } = useBooks();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [slideAnimation] = useState(new Animated.Value(0));

  const enterEditMode = () => {
    setIsEditMode(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const exitEditMode = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsEditMode(false);
      setSelectedBooks([]);
    });
  };

  const toggleBookSelection = (book: Book) => {
    // cannot use includes because the books are not the same object, they have different references
    if (selectedBooks.some(b => b.isbn === book.isbn)) {
      setSelectedBooks(selectedBooks.filter(b => b.isbn !== book.isbn));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleSelectedBooksToDelete = async () => {
    try {
      for (const book of selectedBooks) {
        await removeBook(book.isbn);
      }
      setSelectedBooks([]);
      setIsEditMode(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete books');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading books...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Edit Mode Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => {
            return isEditMode ? exitEditMode() : enterEditMode();
          }}
        >
          <Text style={styles.toggleButtonText}>{isEditMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        {selectedBooks.length > 0 && isEditMode && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleSelectedBooksToDelete()}>
            <Text style={styles.toggleButtonText}>{'Delete Books'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.isbn}
        renderItem={({ item }: { item: Book }) => {
          console.log('Rendering book:', item.title);
          return (
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: slideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 10],
                    }),
                  },
                ],
              }}
            >
              <View style={styles.bookItemWrapper}>
                {isEditMode && (
                  <View style={styles.selectionIndicator}>
                    <Text style={styles.selectionText}>
                      {selectedBooks.some(book => book.isbn === item.isbn) ? '✓' : '○'}
                    </Text>
                  </View>
                )}
                <BookCard book={item} onPress={() => toggleBookSelection(item)} />
              </View>
            </Animated.View>
          );
        }}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No books found. Add some books first!</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    minHeight: 400, // Ensure minimum height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  toggleButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  toggleButtonText: {
    color: theme.colors.background,
    ...theme.typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.error,
    marginTop: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
  },
  bookItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  selectionIndicator: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderColor: theme.colors.border,
  },
  selectionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
