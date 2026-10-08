import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadows } from '../theme/theme';

export default function PrimaryButton({
  title, onPress, variant = 'primary', icon, loading, disabled, style,
}) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  if (isPrimary) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.wrap, { opacity: disabled ? 0.5 : 1 }, style]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.row}>
              {icon && <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />}
              <Text style={styles.primaryText}>{title}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.wrap, styles.outlineWrap,
        isOutline && styles.outline,
        isGhost && styles.ghost,
        { opacity: disabled ? 0.5 : 1 }, style,
      ]}
    >
      <View style={styles.row}>
        {icon && <Ionicons name={icon} size={20} color={colors.primary} style={{ marginRight: 8 }} />}
        <Text style={[styles.outlineText, isGhost && { color: colors.textSecondary }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.lg, overflow: 'hidden' },
  gradient: { paddingVertical: 16, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center', minHeight: 56 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  outlineWrap: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: colors.primary, minHeight: 56 },
  outline: { backgroundColor: 'transparent', borderColor: colors.primary },
  ghost: { borderWidth: 0, backgroundColor: 'transparent' },
  outlineText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center' },
});
