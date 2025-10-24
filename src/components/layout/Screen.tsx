import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  padded?: boolean;
}

export const Screen = ({ children, title, subtitle, centered = false, padded = true }: ScreenProps) => {
  const containerStyle = [padded ? theme.layout.padded : theme.layout.screen, centered && theme.layout.centered];

  return (
    <View style={containerStyle}>
      {title && <Text style={theme.text.title}>{title}</Text>}
      {subtitle && <Text style={theme.text.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
};
