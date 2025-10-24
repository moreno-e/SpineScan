# SpineScan 📚

A React Native mobile app for scanning and managing your personal book collection. Built with Expo and designed for offline-first book cataloging.

## Features

- 📱 **Barcode Scanning**: Scan book ISBNs with your camera
- 🔍 **Manual Search**: Search and add books manually using Google Books API
- 📖 **Book Collection**: View and manage your personal library
- 📱 **Offline-First**: Works without internet connection
- 🎨 **Clean UI**: Modern, intuitive interface

## Tech Stack

- **React Native** with Expo (SDK ~54)
- **TypeScript** for type safety
- **Expo Router** for navigation
- **AsyncStorage** for local data persistence
- **Google Books API** for book data
- **expo-barcode-scanner** for ISBN scanning

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Navigation configuration
│   ├── index.tsx           # Home screen
│   ├── scanner.tsx         # Barcode scanner
│   ├── manual-add.tsx      # Manual book entry
│   ├── show-books.tsx      # Book collection
│   └── book-detail.tsx     # Individual book details
├── components/             # Reusable UI components
├── types/                  # TypeScript type definitions
│   ├── book.ts            # Book data types
│   ├── api.ts             # API response types
│   ├── navigation.ts      # Navigation types
│   └── common.ts          # Shared types
└── services/              # Business logic
    └── bookStorage.ts     # AsyncStorage wrapper
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spinescan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web (for development)
   npm run web
   ```

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run tunnel` - Start with tunnel for device testing

### Architecture

This app follows a **local-first, offline-capable** architecture:

- **Storage**: AsyncStorage for local data persistence
- **Navigation**: Expo Router with stack-based navigation
- **State Management**: React Context + AsyncStorage
- **API**: Google Books API for book metadata
- **Offline Support**: All data stored locally, works without internet

### Key Features

#### 📱 Barcode Scanning

- Scan ISBN barcodes with device camera
- Automatic book data retrieval from Google Books API
- Offline scanning with sync when online

#### 🔍 Manual Book Entry

- Search books by title, author, or ISBN
- Google Books API integration
- Rich book metadata (cover, description, etc.)

#### 📚 Book Collection

- View all books in your library
- Search and filter your collection
- Book details with cover images
- Local storage with offline access

## Data Storage

The app uses **AsyncStorage** for local data persistence:

- **Books Collection**: `@books_collection` - Array of Book objects
- **User Preferences**: `@user_preferences` - App settings
- **Offline-First**: All data stored locally, no cloud dependency

## API Integration

### Google Books API

- **Free tier** with generous limits
- **ISBN lookup** for barcode scanning
- **Search functionality** for manual entry
- **Rich metadata** including covers and descriptions

## Future Enhancements

- [ ] Book categories and tags
- [ ] Reading progress tracking
- [ ] Book recommendations
- [ ] Export/import functionality
- [ ] Cloud sync (optional)
- [ ] Reading statistics
- [ ] Wishlist feature

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Google Books API** for comprehensive book data
- **Expo** for the excellent React Native development experience
- **React Native** community for the amazing ecosystem
- **Cursor & Claude API** for the development help and learning adventure

---
