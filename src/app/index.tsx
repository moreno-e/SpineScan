import { View, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/layout/Screen';
import { Button } from '../components/ui/Button';

export default function HomeScreen() {
  return (
    <Screen centered>
      <Image source={require('../../assets/SpineScan.png')} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <Button title="📸 Scan Book" onPress={() => router.push('/scanner')} variant="primary" size="medium" />

        <Button
          title="📚 View Collection"
          onPress={() => router.push('/show-books')}
          variant="secondary"
          size="medium"
        />

        <Button title="➕ Add Manually" onPress={() => router.push('/manual-add')} variant="secondary" size="medium" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 10,
  },
});
