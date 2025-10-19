import { View, Text, StyleSheet, FlatList } from 'react-native';
import { bookStorage } from '../../services/bookStorage';
import { Book } from '../../types';
import { useState, useEffect } from 'react';
export const ShowBookDetail = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await bookStorage.getAll();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <View>
      <Text>Showing All Books!</Text>
      <FlatList data={books} renderItem={({ item }: { item: Book }) => <Text>{item.title}</Text>} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
