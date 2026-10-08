import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/Badge';

const filters = ['All', 'Available', 'Claimed'];

export default function DonorHistoryScreen({ navigation }) {
  const { donations } = useApp();
  const [filter, setFilter] = useState('All');

  const list = donations.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'Available') return d.status === 'available';
    return d.status === 'claimed';
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Donations</Text>
        <Text style={styles.subtitle}>{donations.length} total posts</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8, marginBottom: 12 }}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filter, filter === f && styles.filterActive]}
          >
            <Text style={[styles.filterText, filter === f && { color: '#fff' }]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: spacing.lg }} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="file-tray-outline" size={50} color={colors.textMuted} />
            <Text style={styles.emptyText}>No donations found</Text>
          </View>
        ) : (
          list.map((d) => (
            <TouchableOpacity
              key={d.id}
              activeOpacity={0.85}
              style={styles.card}
              onPress={() => navigation.navigate('DeliveryOptions', { donation: d })}
            >
              <View style={styles.row}>
                <View style={styles.icon}>
                  <Ionicons name="fast-food-outline" size={22} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{d.foodType}</Text>
                  <Text style={styles.cardSub}>{d.quantity} • Serves {d.servings}</Text>
                </View>
                <Badge
                  label={d.status === 'available' ? 'AVAILABLE' : 'CLAIMED'}
                  color={d.status === 'available' ? colors.success : colors.info}
                />
              </View>
              <View style={styles.cardFooter}>
                <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                <Text style={styles.footerText}>{d.pickupAddress}</Text>
                <Text style={styles.footerDot}>•</Text>
                <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                <Text style={styles.footerText}>{d.expiry}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg },
  title: { fontSize: 26, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  filter: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
  },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  empty: { alignItems: 'center', paddingVertical: 80 },
  emptyText: { color: colors.textSecondary, marginTop: 12, fontSize: 14 },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  cardSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12,
    paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border,
  },
  footerText: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },
  footerDot: { color: colors.textMuted, marginHorizontal: 4 },
});
