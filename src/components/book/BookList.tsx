import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import { Book } from '../../types';
import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { BookCard } from './BookCard';
import { theme } from '../../constants/theme';
import { Input } from '../ui/Input';
import { router } from 'expo-router';

export const BookList = () => {
  const { books, loading, error, removeBook } = useBooks();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
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
      <Input
        placeholder="Search books"
        value={searchQuery}
        onChangeText={(searchQuery: string) => handleSearch(searchQuery)}
      />
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
        style={styles.flatList}
        data={
          searchQuery.length > 0
            ? books.filter((book: Book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
            : books
        }
        keyExtractor={item => item.isbn}
        renderItem={({ item }: { item: Book }) => {
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
                    <Text style={styles.selectionText} onPress={() => toggleBookSelection(item)}>
                      {selectedBooks.some(book => book.isbn === item.isbn) ? '✓' : '○'}
                    </Text>
                  </View>
                )}
                <BookCard
                  book={item}
                  onPress={() =>
                    !isEditMode
                      ? router.push({
                          pathname: '/book-detail',
                          params: { isbn: item.isbn },
                        })
                      : toggleBookSelection(item)
                  }
                  isEditMode={isEditMode}
                />
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
  },
  flatList: {
    flex: 1,
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
    width: '100%', // Ensure it takes full width
    flex: 1, // Allow it to expand to fill available space
  },
  selectionIndicator: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderColor: theme.colors.border,
    flexShrink: 0, // Don't shrink the indicator
  },
  selectionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
