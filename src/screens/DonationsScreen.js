import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function DonationsScreen() {
  const { donations, navigateTo } = useApp();
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Available' | 'Claimed'

  const filtered = donations.filter((d) => {
    if (activeFilter === 'Available') return d.status === 'available';
    if (activeFilter === 'Claimed') return d.status === 'claimed';
    return true;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Food Donations</Text>
          <Text style={styles.subtitle}>
            Manage your surplus food posts, monitor claims, and view community impact.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigateTo('donate')}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.postBtnText}>Post New Donation</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersRow}>
        {['All', 'Available', 'Claimed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterBtn, activeFilter === tab && styles.filterBtnActive]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text style={[styles.filterBtnText, activeFilter === tab && styles.filterBtnTextActive]}>
              {tab} ({donations.filter((d) => (tab === 'All' ? true : d.status === tab.toLowerCase())).length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Donations List */}
      {filtered.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="gift-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>No Donations in this section</Text>
          <Text style={styles.emptySub}>Ready to rescue surplus food? Post your first donation now.</Text>
          <TouchableOpacity style={styles.postBtn} onPress={() => navigateTo('donate')}>
            <Text style={styles.postBtnText}>Donate Food Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.list}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View style={{ flex: 1 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.foodName}>{item.foodType}</Text>
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            item.status === 'available' ? colors.successBg : colors.infoBg,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            color:
                              item.status === 'available' ? colors.success : colors.info,
                          },
                        ]}
                      >
                        {item.status === 'available' ? 'AVAILABLE' : 'CLAIMED'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.servingsText}>
                    {item.quantity} • Serves {item.servings} people
                  </Text>

                  <View style={styles.metaRow}>
                    <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.metaText}>{item.pickupAddress}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.metaText}>Cooked {item.cookedTime || '12 PM'}</Text>
                  </View>
                </View>
              </View>

              {item.status === 'claimed' && item.claimedBy && (
                <View style={styles.claimedInfo}>
                  <Ionicons name="heart" size={16} color={colors.accent} />
                  <Text style={styles.claimedText}>
                    Claimed by: <Text style={{ fontWeight: '800' }}>{item.claimedBy}</Text>
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  postBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.md,
  },
  postBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  filterBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  servingsText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '700',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  dot: {
    color: colors.textMuted,
    marginHorizontal: 2,
  },
  claimedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  claimedText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
});
