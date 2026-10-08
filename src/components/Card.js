import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius, spacing, shadows } from '../theme/theme';

export default function Card({ children, style, padded = true }) {
  return (
    <View style={[styles.card, padded && { padding: spacing.lg }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
});
