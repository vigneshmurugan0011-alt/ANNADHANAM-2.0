import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';

export default function DonorHomeScreen({ navigation }) {
  const { user, donations } = useApp();

  const myDonations = donations;
  const stats = {
    total: myDonations.length,
    active: myDonations.filter((d) => d.status === 'available').length,
    claimed: myDonations.filter((d) => d.status === 'claimed').length,
    meals: myDonations.reduce((s, d) => s + (d.servings || 0), 0),
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.name}>{user?.name || 'Donor'}</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroBlob} />
            <Ionicons name="heart" size={22} color="rgba(255,255,255,0.9)" style={{ marginBottom: 12 }} />
            <Text style={styles.heroTitle}>Donate Surplus Food</Text>
            <Text style={styles.heroDesc}>
              Post your leftover food and connect with nearby NGOs in seconds.
            </Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('CreateDonation')}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle" size={20} color={colors.primary} />
              <Text style={styles.heroBtnText}>Post a Donation</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="restaurant-outline" value={stats.total} label="Donations" color={colors.primary} />
          <StatCard icon="time-outline" value={stats.active} label="Active" color={colors.info} />
          <StatCard icon="checkmark-done-outline" value={stats.claimed} label="Claimed" color={colors.success} />
        </View>

        {/* Impact */}
        <View style={{ paddingHorizontal: spacing.lg, marginTop: 8 }}>
          <View style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="people" size={24} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.impactValue}>{stats.meals}+</Text>
              <Text style={styles.impactLabel}>Meals served through your donations</Text>
            </View>
            <Ionicons name="trophy-outline" size={26} color={colors.accent} />
          </View>
        </View>

        {/* Recent Donations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Donations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        {myDonations.length === 0 ? (
          <Card style={{ marginHorizontal: spacing.lg, alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="leaf-outline" size={40} color={colors.textMuted} />
            <Text style={{ color: colors.textSecondary, marginTop: 12, fontSize: 14 }}>No donations yet</Text>
            <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: 12 }}>Your first rescue starts here</Text>
          </Card>
        ) : (
          myDonations.slice(0, 4).map((d) => (
            <DonationCard key={d.id} donation={d} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const StatCard = ({ icon, value, label, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DonationCard = ({ donation }) => (
  <TouchableOpacity activeOpacity={0.85} style={styles.donationCard}>
    <View style={styles.donationIcon}>
      <Ionicons name="fast-food-outline" size={22} color={colors.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.donationTitle} numberOfLines={1}>{donation.foodType}</Text>
      <Text style={styles.donationSub}>{donation.quantity} • Serves {donation.servings}</Text>
      <View style={{ flexDirection: 'row', marginTop: 8, gap: 6 }}>
        <Badge
          label={donation.status === 'available' ? 'AVAILABLE' : 'CLAIMED'}
          color={donation.status === 'available' ? colors.success : colors.info}
        />
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
  </TouchableOpacity>
);

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
  dot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger },
  hero: { borderRadius: radius.xl, padding: 24, overflow: 'hidden', ...shadows.md },
  heroBlob: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.08)', top: -80, right: -60 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 8 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 19, marginBottom: 20, maxWidth: '85%' },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 12,
    borderRadius: radius.pill, alignSelf: 'flex-start',
  },
  heroBtnText: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: 10 },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  statIcon: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2, fontWeight: '600' },
  impactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.secondaryLight, borderRadius: radius.lg, padding: 16,
    borderWidth: 1, borderColor: colors.secondary + '30', marginTop: spacing.md,
  },
  impactIcon: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.secondary,
    alignItems: 'center', justifyContent: 'center',
  },
  impactValue: { fontSize: 20, fontWeight: '800', color: colors.secondary },
  impactLabel: { fontSize: 12, color: colors.secondary, marginTop: 2, fontWeight: '500' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginTop: spacing.xxl, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
  sectionLink: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  donationCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: spacing.lg, marginBottom: 10,
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14,
    borderWidth: 1, borderColor: colors.border,
  },
  donationIcon: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  donationTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  donationSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
