import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { bookStorage } from '../../services/bookStorage';
import { Book } from '../../types';
import { useState, useEffect } from 'react';

export const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
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
        await bookStorage.remove(book.isbn);
      }
      setSelectedBooks([]);
      setIsEditMode(false);

      const books = await bookStorage.getAll();

      setBooks(books);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await bookStorage.getAll();

      setBooks(books);
    };
    fetchBooks();
  }, []);

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
        renderItem={({ item }: { item: Book }) => {
          return (
            <Animated.View
              style={[
                styles.bookItemContainer,
                {
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 10],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Selection Indicator */}
              {isEditMode && (
                <View style={styles.selectionIndicator}>
                  <TouchableOpacity onPress={() => toggleBookSelection(item)}>
                    <Text>{selectedBooks.some(book => book.isbn === item.isbn) ? '✓' : '○'}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Book Item */}
              <View style={[styles.bookItem, isEditMode && styles.bookItemEditMode]}>
                <Text>{item.title}</Text>
                <Text>{item.authors.join(', ')}</Text>
                <Text>{item.isbn}</Text>
                <Text>{item.description}</Text>
                <Text>{item.cover}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  bookItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookItem: {
    flex: 1,
    maxWidth: '85%',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  doneButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  selectionIndicator: {
    width: 20, // Fixed width for selection area
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  bookItemEditMode: {
    marginLeft: 0, // Remove left margin in edit mode
  },
});
