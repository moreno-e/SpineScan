import { View, Text, StyleSheet } from 'react-native';
import { AddBook } from '../components/add-book';
import { Book } from '../types';

export default function ManualAddScreen() {
  return (
    <View style={styles.container}>
      <AddBook />
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
  },
});
