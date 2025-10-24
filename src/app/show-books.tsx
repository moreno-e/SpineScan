import { View, Text, StyleSheet } from 'react-native';
import { BookList } from '../components/book/BookList';

export default function ShowBooksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Book Collection</Text>
      <BookList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
