import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/Badge';
import { mockDonations } from '../../data/mockData';

export default function RecipientHomeScreen({ navigation }) {
  const { user, donations } = useApp();
  const [query, setQuery] = useState('');

  // Combine user-posted donations with mock donations
  const allDonations = [...donations.filter((d) => d.status === 'available'), ...mockDonations];

  const filtered = allDonations.filter(
    (d) => d.foodType.toLowerCase().includes(query.toLowerCase()) ||
           d.pickupAddress?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste 🙏</Text>
            <Text style={styles.name}>{user?.name || 'Recipient'}</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Search food or location..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          <View style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color={colors.primary} />
          </View>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="heart" size={22} color={colors.secondary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>{filtered.length} meals available nearby</Text>
            <Text style={styles.bannerSub}>Claim before they expire!</Text>
          </View>
        </View>

        {/* List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Now</Text>
          <Text style={styles.sectionLink}>Sorted by distance</Text>
        </View>

        {filtered.map((d) => (
          <TouchableOpacity
            key={d.id}
            activeOpacity={0.9}
            style={styles.donationCard}
            onPress={() => navigation.navigate('DonationDetails', { donation: d })}
          >
            <View style={styles.cardTop}>
              <View style={styles.donorIcon}>
                <Ionicons name="business-outline" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.donorName} numberOfLines={1}>{d.donorName}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.metaText}>{d.pickupAddress}</Text>
                </View>
              </View>
              <Badge label={d.distance || '2 km'} color={colors.info} />
            </View>

            <View style={styles.foodBox}>
              <Text style={styles.foodType}>{d.foodType}</Text>
              <Text style={styles.foodMeta}>{d.quantity} • Serves {d.servings} people</Text>
            </View>

            <View style={styles.cardBottom}>
              <View style={styles.chip}>
                <Ionicons name="time-outline" size={14} color={colors.success} />
                <Text style={[styles.chipText, { color: colors.success }]}>Safe {d.expiry}</Text>
              </View>
              {d.category && (
                <View style={styles.chip}>
                  <Ionicons name="restaurant-outline" size={14} color={colors.accent} />
                  <Text style={[styles.chipText, { color: colors.accent }]}>{d.category}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.claimBtn}
                onPress={() => navigation.navigate('DonationDetails', { donation: d })}
              >
                <Text style={styles.claimText}>Claim</Text>
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg,
  },
  greeting: { color: colors.textSecondary, fontSize: 13 },
  name: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginTop: 2 },
  notifBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: spacing.lg, paddingHorizontal: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.lg, height: 52,
    borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary, paddingVertical: 0 },
  filterBtn: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: spacing.lg, marginTop: spacing.lg,
    backgroundColor: colors.secondaryLight, borderRadius: radius.lg, padding: 16,
    borderWidth: 1, borderColor: colors.secondary + '25',
  },
  bannerIcon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  bannerTitle: { fontSize: 14, fontWeight: '800', color: colors.secondary },
  bannerSub: { fontSize: 12, color: colors.secondary, marginTop: 2, opacity: 0.8 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginTop: spacing.xxl, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
  sectionLink: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
  donationCard: {
    marginHorizontal: spacing.lg, marginBottom: 14,
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  donorIcon: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  donorName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  metaText: { fontSize: 11, color: colors.textMuted },
  foodBox: {
    backgroundColor: colors.bg, borderRadius: radius.md, padding: 12, marginBottom: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  foodType: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  foodMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 3 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: radius.sm,
    backgroundColor: colors.bg,
  },
  chipText: { fontSize: 11, fontWeight: '700' },
  claimBtn: {
    marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
  },
  claimText: { color: '#fff', fontSize: 12, fontWeight: '800' },
});
