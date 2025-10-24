export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#666666',
    border: '#C6C6C8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
    },
  },
  // Common layout styles
  layout: {
    screen: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    centered: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    padded: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
  },
  // Common text styles
  text: {
    title: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      color: '#000000',
      textAlign: 'center' as const,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
      textAlign: 'center' as const,
      marginBottom: 40,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: '#000000',
      marginBottom: 16,
    },
  },
};
