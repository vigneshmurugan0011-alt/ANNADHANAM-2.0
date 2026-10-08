import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

export default function DonationDetailsScreen({ navigation, route }) {
  const donation = route.params?.donation;
  const { user, claimDonation, setActiveDonation } = useApp();

  const handleClaim = () => {
    Alert.alert(
      'Claim Donation?',
      `You are claiming "${donation.foodType}" from ${donation.donorName}.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Claim Now',
          onPress: () => {
            claimDonation(donation.id, user);
            setActiveDonation(donation);
            navigation.navigate('DeliveryOptions', { donation: { ...donation, status: 'claimed' } });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Donation Details" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="fast-food" size={28} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>{donation?.foodType}</Text>
          <Text style={styles.heroSub}>{donation?.quantity} • Serves {donation?.servings} people</Text>

          <View style={styles.heroRow}>
            <View style={styles.heroChip}>
              <Ionicons name="time-outline" size={14} color="#fff" />
              <Text style={styles.heroChipText}>Safe {donation?.expiry}</Text>
            </View>
            <View style={styles.heroChip}>
              <Ionicons name="navigate-outline" size={14} color="#fff" />
              <Text style={styles.heroChipText}>{donation?.distance} away</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Donor</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="business-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{donation?.donorName}</Text>
              <Text style={styles.sub}>Verified Donor ✓</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pickup Location</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{donation?.pickupAddress}</Text>
              <Text style={styles.sub}>{donation?.distance} from your location</Text>
            </View>
          </View>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={26} color={colors.primary} />
            <Text style={styles.mapText}>Tap to view on map</Text>
          </View>
        </View>

        {donation?.notes ? (
          <>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.card}>
              <Text style={styles.notesText}>{donation.notes}</Text>
            </View>
          </>
        ) : null}

        <View style={styles.safetyBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.success} />
          <Text style={styles.safetyText}>
            All donations are verified. Choose a delivery partner after claiming.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Claim This Donation"
          icon="hand-right-outline"
          onPress={handleClaim}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { borderRadius: radius.xl, padding: 20, ...shadows.md },
  heroIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  heroRow: { flexDirection: 'row', gap: 8, marginTop: 16, flexWrap: 'wrap' },
  heroChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: radius.pill,
  },
  heroChipText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginTop: spacing.xxl, marginBottom: 10 },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  sub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  callBtn: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  mapPlaceholder: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primaryLight, marginTop: 12, padding: 16,
    borderRadius: radius.md,
  },
  mapText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  notesText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  safetyBox: {
    flexDirection: 'row', gap: 10, alignItems: 'center',
    backgroundColor: colors.success + '10', padding: 14, borderRadius: radius.md,
    marginTop: spacing.xxl, borderWidth: 1, borderColor: colors.success + '25',
  },
  safetyText: { flex: 1, fontSize: 12, color: colors.success, lineHeight: 18, fontWeight: '500' },
  footer: {
    padding: spacing.lg, backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
});
