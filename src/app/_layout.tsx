import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Library',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="scanner" 
        options={{ 
          title: 'Scan Book',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="manual-add" 
        options={{ 
          title: 'Add Book Manually',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="book-detail" 
        options={{ 
          title: 'Book Details',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}
