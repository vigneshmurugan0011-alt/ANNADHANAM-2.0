import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';

export default function MetricCard({
  value,
  label,
  icon,
  bgColor = colors.metricGreen,
  iconColor = colors.primary,
  subIcon,
}) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
      </View>

      <Text style={styles.labelText}>{label}</Text>

      {subIcon && (
        <View style={styles.subIconWrap}>
          <Ionicons name={subIcon} size={14} color={iconColor} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 120,
    borderRadius: radius.lg,
    padding: spacing.md,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueRow: {
    marginTop: 2,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  subIconWrap: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    opacity: 0.8,
  },
});
