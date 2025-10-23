import { Book } from './book';

// Expo Router route parameters
export type RootStackParamList = {
  index: undefined;                    // Home screen (no parameters)
  scanner: undefined;                // Scanner screen (no parameters)  
  'manual-add': undefined;           // Manual Add screen (no parameters)
  'book-detail': { book: string };   // Book Detail screen (book as JSON string)
};

// Expo Router navigation functions
export interface ExpoRouterNavigation {
  push: (href: string, params?: any) => void;
  replace: (href: string, params?: any) => void;
  back: () => void;
  canGoBack: () => boolean;
}

// Route parameter types for Expo Router
export type HomeRouteParams = undefined;
export type ScannerRouteParams = undefined;
export type ManualAddRouteParams = undefined;
export type BookDetailRouteParams = { book: string }; // JSON string of Book

// Screen-specific props for Expo Router
export interface HomeScreenProps {
  // Expo Router doesn't pass navigation as prop, use router from expo-router
}

export interface ScannerScreenProps {
  // Expo Router doesn't pass navigation as prop, use router from expo-router
}

export interface ManualAddScreenProps {
  // Expo Router doesn't pass navigation as prop, use router from expo-router
}

export interface BookDetailScreenProps {
  // Use useLocalSearchParams() hook to get route parameters
}
