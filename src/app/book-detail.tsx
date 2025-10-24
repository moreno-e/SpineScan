import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BookDetail } from '../components/book/BookDetail';

export default function BookDetailScreen() {
  const { isbn } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <BookDetail isbn={isbn as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
