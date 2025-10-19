import { Book } from './book';

// Root Stack Navigator - defines what parameters each screen expects
export type RootStackParamList = {
  Home: undefined;                    // No parameters needed
  Scanner: undefined;                // No parameters needed  
  ManualAdd: undefined;              // No parameters needed
  BookDetail: { book: Book };        // Needs a book object
};

// Tab Navigator (if you decide to use tabs)
export type TabParamList = {
  HomeTab: undefined;
  ScannerTab: undefined;
  SearchTab: undefined;
};

// Navigation function types (what you can call on navigation object)
export interface NavigationFunctions {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
  reset: (state: any) => void;
}

// Route parameter types (what data gets passed to each screen)
export type HomeRouteParams = RootStackParamList['Home'];        // undefined
export type ScannerRouteParams = RootStackParamList['Scanner'];  // undefined
export type ManualAddRouteParams = RootStackParamList['ManualAdd']; // undefined
export type BookDetailRouteParams = RootStackParamList['BookDetail']; // { book: Book }

// Screen-specific navigation props
export interface HomeScreenProps {
  navigation: NavigationFunctions;
  route: {
    params: HomeRouteParams;
  };
}

export interface ScannerScreenProps {
  navigation: NavigationFunctions;
  route: {
    params: ScannerRouteParams;
  };
}

export interface ManualAddScreenProps {
  navigation: NavigationFunctions;
  route: {
    params: ManualAddRouteParams;
  };
}

export interface BookDetailScreenProps {
  navigation: NavigationFunctions;
  route: {
    params: BookDetailRouteParams;
  };
}
