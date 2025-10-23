import { View, Text, StyleSheet } from 'react-native';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner Screen</Text>
      <Text style={styles.subtitle}>Barcode scanner will be implemented here</Text>
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
