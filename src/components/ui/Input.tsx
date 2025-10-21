import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && styles.multiline, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: 16,
    backgroundColor: theme.colors.background,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
});
