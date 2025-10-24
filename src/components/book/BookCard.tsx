import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Book } from '../../types';
import { theme } from '../../constants/theme';

interface BookCardProps {
  book: Book;
  onPress?: (book: Book) => void;
  isEditMode?: boolean;
}

export const BookCard = ({ book, onPress, isEditMode = false }: BookCardProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(book);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, isEditMode && styles.containerEditMode]} onPress={handlePress}>
      <View style={styles.content}>
        {book.cover && <Image source={{ uri: book.cover }} style={styles.cover} />}

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title || 'No Title'}
          </Text>
          <Text style={styles.authors} numberOfLines={1}>
            {book.authors?.join(', ') || 'No Author'}
          </Text>
          {book.description && (
            <Text style={styles.description} numberOfLines={2}>
              {book.description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    flex: 1, // Take up remaining space
    minWidth: 0, // Allow it to shrink
  },
  containerEditMode: {
    // Adjust width when in edit mode to account for selection indicator
    flex: 0.9, // Use 90% of available space to leave room for selection indicator
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  cover: {
    width: 60,
    height: 80,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  authors: {
    fontSize: 16,
    color: '#000000',
    marginBottom: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  description: {
    fontSize: 14,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
});
