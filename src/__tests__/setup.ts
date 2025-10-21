// Jest setup file for React Native Testing Library

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo modules that might cause issues in tests
jest.mock('expo-constants', () => ({
  default: {
    appOwnership: 'expo',
  },
}));
