import { View, Text } from 'react-native';
import { bookStorage } from '../services/bookStorage';
import { ShowBookDetail } from '../components/book/show-book-detail';
export default function ShowBooksScreen() {
  return (
    <View>
      <Text>Showing All Books!</Text>
      <ShowBookDetail />
    </View>
  );
}
