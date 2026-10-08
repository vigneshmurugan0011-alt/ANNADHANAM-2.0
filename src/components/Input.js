import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/theme';

export default function Input({ label, icon, error, style, ...props }) {
  return (
    <View style={[{ marginBottom: spacing.md }, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrap, error && { borderColor: colors.danger }]}>
        {icon && <Ionicons name={icon} size={18} color={colors.textMuted} style={{ marginRight: 10 }} />}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 6, letterSpacing: 0.2 },
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.md, height: 52,
  },
  input: { flex: 1, fontSize: 15, color: colors.textPrimary, paddingVertical: 0 },
  error: { color: colors.danger, fontSize: 12, marginTop: 4 },
});
