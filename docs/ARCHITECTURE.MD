# Project Architecture & Planning Guide

## Project: Book Collection Scanner

**Last Updated:** October 18, 2025  
**Status:** Planning Phase

---

## 1. Project Discovery

### Problem Statement

**What problem are we solving?**

- I have a large collection of children's books at home
- When shopping at stores, I can't remember which books I already own
- This leads to duplicate purchases or missed opportunities

**Current Solution (Manual):**

- Try to remember books from memory (unreliable)
- Take photos of my bookshelf (cumbersome to search through) Ai Search?
- Keep a notes app list (hard to maintain, requires manual typing)

**Desired Solution:**

- Quick barcode scan to add books to digital collection
- Instant check at store: "Do I own this?"
- Easy browsing of my collection

---

## 2. User Stories & Requirements

### Must Have (MVP)

- [ ] As a user, I want to scan a book's barcode to add it to my collection
- [ ] As a user, I want to manually search and add books if barcode doesn't work
- [ ] As a user, I want to scan a book in-store to see if I already own it
- [ ] As a user, I want to view my entire book collection
- [ ] As a user, I want to see book details (title, author, cover image)

### Should Have (Phase 2)

- [ ] As a user, I want to search/filter my collection
- [ ] As a user, I want to remove books from my collection
- [ ] As a user, I want to see how many books I have
- [ ] As a user, I want to mark books as "read" or "wishlist"
- [ ] As a user, I want to sort books (by title, author, date added)

### Could Have (Future)

- [ ] As a user, I want to sync my collection across devices (requires auth)
- [ ] As a user, I want to share my collection with family members
- [ ] As a user, I want to export my collection as a list
- [ ] As a user, I want book recommendations based on my collection
- [ ] As a user, I want to track reading progress

### Won't Have (Not in Scope)

- Social features (reviews, ratings)
- Book lending tracking
- Price comparison shopping
- E-book integration

---

## 3. Technical Architecture Decisions

### Platform

**Decision:** React Native with Expo  
**Reasoning:**

- Want to learn React Native
- Expo simplifies camera/barcode setup
- Cross-platform (iOS & Android) from one codebase
- Can test immediately on physical device

**Alternatives Considered:**

- Native iOS/Android (too time-consuming, two codebases)
- Flutter (want to stick with React ecosystem)
- PWA (limited camera access, no app store presence)

### Data Storage

**Decision:** Local-first with AsyncStorage  
**Reasoning:**

- Simple MVP, single device use case
- No backend complexity
- Offline-first (works anywhere)
- Fast and free
- Easy migration path to cloud later

**Alternatives Considered:**

- Firebase (overkill for MVP, adds auth complexity)
- SQLite (more setup, unnecessary for small dataset)
- Cloud-only (requires internet, slower, needs backend)

### Book Data Source

**Decision:** Google Books API  
**Reasoning:**

- Free tier is generous
- Comprehensive book data (title, author, cover, description)
- ISBN lookup works well
- Good for children's books

**Alternatives Considered:**

- Open Library API (backup option, less reliable data)
- Amazon API (requires approval, commercial focus)
- ISBN DB (paid, limited free tier)

### State Management

**Decision:** Start with React Context + AsyncStorage  
**Reasoning:**

- Simple app, don't need Redux yet
- Context API sufficient for passing book collection
- Can upgrade to Redux later if needed
- Less boilerplate for MVP

**Future Consideration:** Redux Toolkit if app grows complex

### Navigation

**Decision:** React Navigation (Stack + Bottom Tabs)  
**Reasoning:**

- Standard for React Native
- Familiar patterns (similar to web routing)
- Good documentation
- Supports deep linking for future features

---

## 4. System Architecture

### High-Level Flow

```
User Opens App
    ↓
Home Screen (Collection View)
    ↓
User Chooses Action:
    ├─→ Scan Barcode → Camera → Process ISBN → Check if exists → Add/Alert
    ├─→ Manual Search → Search Screen → Results → Select Book → Add
    └─→ View Book Details → Detail Screen → Edit/Remove options
```

### Data Flow

```
[Barcode Scanner] → ISBN
    ↓
[Google Books API] → Book Info (title, author, cover, etc.)
    ↓
[Check AsyncStorage] → Does book exist?
    ├─→ Yes: Alert "Already owned"
    └─→ No: Save to AsyncStorage → Update UI
```

### Component Hierarchy

```
App
└── Navigation
    ├── Home Screen
    │   ├── Header (with add buttons)
    │   ├── Collection Stats
    │   └── Book List
    │       └── Book Card (repeating)
    ├── Scanner Screen
    │   ├── Camera View
    │   ├── Scan Overlay
    │   └── Result Modal
    ├── Manual Add Screen
    │   ├── Search Bar
    │   ├── Search Results
    │   └── Book Result Card (repeating)
    └── Book Detail Screen
        ├── Book Cover
        ├── Book Info
        └── Action Buttons
```

---

## 5. Folder Structure

```
book-scanner/
├── src/
│   ├── screens/              # Full-page views
│   │   ├── HomeScreen.tsx
│   │   ├── ScannerScreen.tsx
│   │   ├── ManualAddScreen.tsx
│   │   └── BookDetailScreen.tsx
│   │
│   ├── components/           # Reusable UI components
│   │   ├── BookCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ScanOverlay.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.tsx
│   │
│   ├── services/             # External integrations
│   │   ├── bookApi.ts        # Google Books API calls
│   │   └── storage.ts        # AsyncStorage wrapper
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useBooks.ts       # Book collection management
│   │   └── useScanner.ts     # Barcode scanning logic
│   │
│   ├── context/              # React Context for state
│   │   └── BooksContext.tsx
│   │
│   ├── types/                # TypeScript definitions
│   │   ├── Book.ts
│   │   └── navigation.ts
│   │
│   ├── utils/                # Helper functions
│   │   ├── isbn.ts           # ISBN validation
│   │   └── formatters.ts     # Date, text formatting
│   │
│   └── constants/            # App constants
│       ├── api.ts            # API endpoints
│       └── theme.ts          # Colors, spacing, fonts
│
├── assets/                   # Images, fonts
├── App.tsx                   # Root component
├── app.json                  # Expo config
└── package.json
```

---

## 6. Tech Stack

### Core

- **React Native** - Mobile framework
- **Expo** (~SDK 52) - Development toolchain
- **TypeScript** - Type safety

### Key Libraries

```json
{
  "expo-barcode-scanner": "Camera + barcode scanning",
  "@react-native-async-storage/async-storage": "Local storage",
  "@react-navigation/native": "Navigation",
  "@react-navigation/stack": "Stack navigation",
  "@react-navigation/bottom-tabs": "Tab navigation",
  "axios": "HTTP client for API calls"
}
```

### APIs

- **Google Books API** - Book data by ISBN
  - Endpoint: `https://www.googleapis.com/books/v1/volumes?q=isbn:{ISBN}`
  - Free tier: 1000 requests/day
  - No API key required for basic use

---

## 7. Data Models

### Book Type

```typescript
interface Book {
  isbn: string; // Primary key (e.g., "9780545582889")
  title: string; // "Harry Potter and the Sorcerer's Stone"
  authors: string[]; // ["J.K. Rowling"]
  cover: string | null; // URL to cover image
  description?: string; // Book summary
  publishedDate?: string; // "1998-09-01"
  pageCount?: number; // 309
  categories?: string[]; // ["Fiction", "Fantasy"]
  addedAt: number; // Timestamp when added to collection
  status?: 'owned' | 'wishlist' | 'read'; // Future feature
}
```

### Storage Schema (AsyncStorage)

```typescript
// Key: '@books_collection'
// Value: JSON string of Book[]
[
  {
    isbn: "9780545582889",
    title: "Harry Potter...",
    authors: ["J.K. Rowling"],
    addedAt: 1729267200000,
    ...
  },
  // ... more books
]
```

---

## 8. API Integration Plan

### Google Books API

**Search by ISBN:**

```
GET https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}
```

**Search by Title/Author:**

```
GET https://www.googleapis.com/books/v1/volumes?q={searchQuery}
```

**Response Mapping:**

```typescript
// API Response → Our Book Type
{
  items: [{
    volumeInfo: {
      title → book.title
      authors → book.authors
      imageLinks.thumbnail → book.cover
      description → book.description
      publishedDate → book.publishedDate
      industryIdentifiers[0].identifier → book.isbn
    }
  }]
}
```

**Error Handling:**

- No results found → Prompt manual entry
- API rate limit → Use cached data or retry
- Network error → Show offline message, use local storage

---

## 9. Development Phases

### Phase 0: Setup (1-2 days)

- [ ] Install Node.js, npm, Expo CLI
- [ ] Create Expo project: `npx create-expo-app book-scanner`
- [ ] Install dependencies
- [ ] Set up folder structure
- [ ] Configure TypeScript
- [ ] Test app runs on device (Expo Go)

### Phase 1: Core Scanning (3-4 days)

- [ ] Implement barcode scanner screen
- [ ] Request camera permissions
- [ ] Parse ISBN from barcode
- [ ] Fetch book data from Google Books API
- [ ] Save book to AsyncStorage
- [ ] Display success/error messages

### Phase 2: Collection View (2-3 days)

- [ ] Create home screen with book list
- [ ] Load books from AsyncStorage on mount
- [ ] Display book cards (cover, title, author)
- [ ] Implement book detail screen
- [ ] Add navigation between screens

### Phase 3: Manual Search (2-3 days)

- [ ] Create search screen UI
- [ ] Implement search input with debouncing
- [ ] Display search results
- [ ] Add books from search results
- [ ] Handle edge cases (no results, duplicates)

### Phase 4: Polish & Testing (2-3 days)

- [ ] Improve UI/UX (styling, transitions)
- [ ] Add empty states
- [ ] Test duplicate detection
- [ ] Test offline behavior
- [ ] Handle edge cases (bad ISBN, no cover, etc.)
- [ ] Add loading states

### Phase 5: Enhancement (Future)

- [ ] Search/filter collection
- [ ] Sort options
- [ ] Delete books
- [ ] Export collection
- [ ] Statistics dashboard

---

## 10. Key Questions & Decisions Needed

### Before Starting

- [x] Which platform? → Expo
- [x] Auth required for MVP? → No, local-only
- [x] Which book API? → Google Books
- [ ] App name? → "BookShelf" / "MyLibrary" / TBD
- [ ] Color scheme? → TBD (maybe book-themed: warm browns, cream)

### During Development

- [ ] How to handle books without ISBN?
- [ ] What if barcode doesn't scan well?
- [ ] Should we support manual ISBN entry?
- [ ] How to handle duplicate detection? (same book, different ISBN)
- [ ] Image caching strategy?

---

## 11. Risk Assessment

### Technical Risks

| Risk                               | Impact | Likelihood | Mitigation                                       |
| ---------------------------------- | ------ | ---------- | ------------------------------------------------ |
| Google Books API rate limits       | High   | Low        | Cache responses, add Open Library as backup      |
| Barcode scanning doesn't work well | High   | Medium     | Add manual ISBN entry, improve lighting guidance |
| AsyncStorage data loss             | Medium | Low        | Document backup/export feature for future        |
| Poor book cover quality            | Low    | Medium     | Use placeholder images, fetch higher res         |

### Learning Curve Risks

| Risk                                       | Impact | Mitigation                              |
| ------------------------------------------ | ------ | --------------------------------------- |
| React hooks unfamiliar (coming from Vue)   | Medium | Study hooks before coding, start simple |
| React Navigation different from Vue Router | Medium | Read docs thoroughly, follow tutorials  |
| Mobile debugging harder than web           | Low    | Use Expo's excellent dev tools          |

---

## 12. Success Metrics

### MVP Success Criteria

- [ ] Can scan 10 books in under 2 minutes
- [ ] 95%+ barcode recognition rate (good lighting)
- [ ] Collection loads in under 1 second
- [ ] Can successfully identify duplicates in-store
- [ ] Zero data loss after app restart

### User Experience Goals

- Scanning feels instant (<2 seconds from scan to confirmation)
- UI is intuitive (no tutorial needed)
- Works offline (core features)
- Feels polished (smooth animations, good typography)

---

## 13. Next Steps

### Immediate (Before Coding)

1. [x] Complete this architecture document
2. [ ] Sketch basic wireframes for 4 main screens
3. [ ] Research Expo barcode scanner examples
4. [ ] Sign up for Google Books API (test endpoints)
5. [ ] Choose app name and color scheme

### First Day of Coding

1. [ ] Set up Expo project
2. [ ] Create folder structure
3. [ ] Set up basic navigation
4. [ ] Create placeholder screens
5. [ ] Test app runs on physical device

### First Week Goal

- [ ] Working barcode scanner
- [ ] Books save to storage
- [ ] Can view collection
- [ ] Basic styling in place

---

## 14. Learning Goals

Since this is also a learning project, track these:

### React Native Concepts to Master

- [ ] React hooks (useState, useEffect, useContext)
- [ ] React Navigation
- [ ] AsyncStorage
- [ ] Camera permissions
- [ ] FlatList optimization
- [ ] React Native styling (flexbox)

### Expo Features to Learn

- [ ] expo-barcode-scanner
- [ ] File system access
- [ ] App permissions flow
- [ ] Development builds vs Expo Go

---

## Notes & Ideas

### Random Thoughts

- Could add a "reading challenge" feature later
- Maybe integrate with library APIs to check availability?
- Kids might enjoy seeing their reading progress visualized
- Could add book ratings/notes for each book

### Design Inspiration

- Keep it simple and functional (not over-designed)
- Think "practical tool" not "social media app"
- Fast is better than fancy for scanning workflow

---

## Resources & References

### Documentation

- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- Google Books API: https://developers.google.com/books

### Tutorials

- (Add helpful tutorials as you find them)

### Similar Apps (for inspiration)

- Libib
- Book Buddy
- CLZ Books

---

**Remember:** Start simple. Make it work, then make it better. Don't over-engineer the MVP.
