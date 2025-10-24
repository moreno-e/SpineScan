import { View, StyleSheet } from 'react-native';
import { AddBook } from '../components/AddBook';

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
});
