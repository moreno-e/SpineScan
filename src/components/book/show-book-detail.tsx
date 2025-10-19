import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { bookStorage } from '../../services/bookStorage';
import { Book } from '../../types';
import { useState, useEffect } from 'react';
export const ShowBookDetail = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const handleEditBook = async (book: Book, isEditMode: boolean) => {
    if (isEditMode) {
      setSelectedBooks([...selectedBooks, book]);
    } else {
      setIsEditMode(false);
      setSelectedBooks([]);
    }
  };

  const toggleBookSelection = (book: Book) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter(b => b.isbn !== book.isbn));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
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
        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsEditMode(!isEditMode)}>
          <Text style={styles.toggleButtonText}>{isEditMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        renderItem={({ item }: { item: Book }) => (
          <View style={styles.bookItemContainer}>
            {isEditMode && (
              <View style={styles.selectionIndicator}>
                <TouchableOpacity onPress={() => toggleBookSelection(item)}>
                  <Text>{selectedBooks.includes(item) ? '✓' : '○'}</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.bookItem}>
              <Text>{item.title}</Text>
              <Text>{item.authors.join(', ')}</Text>
              <Text>{item.isbn}</Text>
              <Text>{item.description}</Text>
              <Text>{item.cover}</Text>
            </View>
          </View>
        )}
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
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  bookItem: {
    flex: 1,
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
  doneButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  selectionIndicator: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
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
});
