import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../theme/theme';

export default function Header({ title, subtitle, showBack, rightIcon, onRightPress }) {
  const nav = useNavigation();
  return (
    <View style={styles.wrap}>
      {showBack ? (
        <TouchableOpacity style={styles.iconBtn} onPress={() => nav.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : <View style={{ width: 40 }} />}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightIcon ? (
        <TouchableOpacity style={styles.iconBtn} onPress={onRightPress}>
          <Ionicons name={rightIcon} size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : <View style={{ width: 40 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
