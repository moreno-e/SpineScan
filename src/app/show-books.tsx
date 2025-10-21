import { View, Text } from 'react-native';
import { bookStorage } from '../services/bookStorage';
import { BooksList } from '../components/book/books-list';
export default function ShowBooksScreen() {
  return (
    <View>
      <Text>Showing All Books!</Text>
      <BooksList />
    </View>
  );
}
