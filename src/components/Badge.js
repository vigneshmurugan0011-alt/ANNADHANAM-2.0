import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function Badge({ label, color = colors.primary, bg }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg || color + '20' }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
  text: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
});
