import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BookDetailScreen() {
  const { book } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Detail Screen</Text>
      <Text style={styles.subtitle}>Book details will be displayed here</Text>
      {book && <Text style={styles.bookInfo}>Book data: {JSON.stringify(book)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  bookInfo: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
