import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../types';
import { FC } from 'react';
import { bookStorage } from '../services/bookStorage';

type AddBookProps = {
  onBookAdded?: (book: Book) => void;
  onCancel?: () => void;
};

export const AddBook: FC<AddBookProps> = ({ onBookAdded, onCancel }) => {
  // State declarations
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form handlers
  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!author.trim()) {
      setError('Author is required');
      return false;
    }
    return true;
  };

  // Submit function
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const newBook: Book = {
        isbn: isbn.trim() || `temp-${Date.now()}`,
        title: title.trim(),
        authors: [author.trim()],
        cover: coverUrl.trim() || null,
        description: description.trim() || undefined,
        addedAt: Date.now(),
      };

      await bookStorage.add(newBook);

      onBookAdded?.(newBook);
    } catch (err) {
      setError('Failed to add book');
    } finally {
      setLoading(false);
    }
  };
  // Render method
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Book</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
      <TextInput style={styles.input} placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Cover URL" value={coverUrl} onChangeText={setCoverUrl} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Book'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
