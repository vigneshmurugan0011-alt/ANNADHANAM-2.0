import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, radius, shadows } from '../../theme/theme';

export default function DonationSuccessScreen({ navigation, route }) {
  const donation = route.params?.donation;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.trophyWrap}>
          <LinearGradient colors={[colors.success, '#059669']} style={styles.trophyCircle}>
            <Ionicons name="checkmark" size={60} color="#fff" />
          </LinearGradient>
          <View style={styles.ring1} />
          <View style={styles.ring2} />
        </View>

        <Text style={styles.title}>Donation Posted! 🎉</Text>
        <Text style={styles.subtitle}>
          Nearby NGOs have been notified. Sit back — someone will claim it soon.
        </Text>

        {donation && (
          <View style={styles.summaryCard}>
            <Row icon="fast-food-outline" label="Food" value={donation.foodType} />
            <Divider />
            <Row icon="scale-outline" label="Quantity" value={donation.quantity} />
            <Divider />
            <Row icon="people-outline" label="Servings" value={`${donation.servings} people`} />
            <Divider />
            <Row icon="location-outline" label="Pickup" value={donation.pickupAddress} />
            <Divider />
            <Row icon="time-outline" label="Safe for" value={donation.expiry} />
          </View>
        )}

        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={20} color={colors.accent} />
          <Text style={styles.tipText}>
            Tip: Choose a delivery partner like Rapido or Porter once the food is claimed.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Back to Home"
          icon="home-outline"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </SafeAreaView>
  );
}

const Row = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>
      <Ionicons name={icon} size={18} color={colors.primary} />
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
  </View>
);
const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  trophyWrap: { alignItems: 'center', marginBottom: 24, position: 'relative' },
  trophyCircle: {
    width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.success, shadowOpacity: 0.4, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 12,
  },
  ring1: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 2, borderColor: colors.success + '30', top: -20 },
  ring2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: colors.success + '15', top: -40 },
  title: { fontSize: 26, fontWeight: '800', color: colors.textPrimary, textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: 10, paddingHorizontal: 20, lineHeight: 21 },
  summaryCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16, marginTop: 28,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  rowIcon: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  rowValue: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, maxWidth: '55%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10, marginLeft: 46 },
  tipBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: colors.accent + '15', padding: 14, borderRadius: radius.md, marginTop: 20,
    borderWidth: 1, borderColor: colors.accent + '30',
  },
  tipText: { flex: 1, fontSize: 12, color: colors.textPrimary, lineHeight: 18 },
  footer: {
    padding: spacing.lg, backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
});
