import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/Badge';

export default function RecipientHistoryScreen({ navigation }) {
  const { donations, user } = useApp();
  const claimed = donations.filter((d) => d.status === 'claimed' && d.claimedBy === user?.name);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Claims</Text>
        <Text style={styles.subtitle}>{claimed.length} donations claimed</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {claimed.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="basket-outline" size={50} color={colors.textMuted} />
            <Text style={styles.emptyText}>No claims yet</Text>
            <Text style={styles.emptySub}>Discover donations and claim your first</Text>
          </View>
        ) : (
          claimed.map((d) => (
            <View key={d.id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.icon}>
                  <Ionicons name="checkmark-circle" size={22} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{d.foodType}</Text>
                  <Text style={styles.cardSub}>From {d.donorName}</Text>
                </View>
                <Badge label="CLAIMED" color={colors.info} />
              </View>
              <View style={styles.footerRow}>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Ionicons name="call-outline" size={16} color={colors.primary} />
                  <Text style={styles.secondaryText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => navigation.navigate('Tracking', { donation: d })}
                >
                  <Ionicons name="navigate-outline" size={16} color="#fff" />
                  <Text style={styles.primaryText}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  empty: { alignItems: 'center', paddingVertical: 80 },
  emptyText: { color: colors.textSecondary, marginTop: 12, fontSize: 15, fontWeight: '600' },
  emptySub: { color: colors.textMuted, marginTop: 4, fontSize: 12 },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.success + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  cardSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  footerRow: { flexDirection: 'row', gap: 10, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  secondaryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.primary,
  },
  secondaryText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  primaryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.primary,
  },
  primaryText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
