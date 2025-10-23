import { View, Text } from 'react-native';
import { bookStorage } from '../services/bookStorage';
import { BookList } from '../components/book/BookList';

export default function ShowBooksScreen() {
  return (
    <View>
      <Text>Showing All Books!</Text>
      <BookList />
    </View>
  );
}
