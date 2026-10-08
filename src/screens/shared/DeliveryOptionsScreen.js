import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { deliveryPartners } from '../../data/mockData';

export default function DeliveryOptionsScreen({ navigation, route }) {
  const donation = route.params?.donation;
  const [selected, setSelected] = useState('rapido');

  const handleConfirm = () => {
    const partner = deliveryPartners.find((p) => p.id === selected);
    Alert.alert(
      'Open Partner App?',
      `You will be redirected to the ${partner?.name} app to book the delivery.\n\nETA: ${partner?.eta}\nEstimated cost: ${partner?.cost}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => navigation.navigate('Tracking', { donation, partner }) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Delivery Partner" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={colors.info} />
          <Text style={styles.infoText}>
            Choose your favourite delivery service to pick up the food from the donor and drop it at your location.
          </Text>
        </View>

        {donation && (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Text style={styles.heroLabel}>PICKUP FROM</Text>
            <Text style={styles.heroTitle}>{donation.donorName}</Text>
            <View style={styles.heroRow}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.heroText}>{donation.pickupAddress}</Text>
            </View>
            <View style={styles.heroRow}>
              <Ionicons name="restaurant-outline" size={14} color="#fff" />
              <Text style={styles.heroText}>{donation.foodType} • {donation.quantity}</Text>
            </View>
          </LinearGradient>
        )}

        <Text style={styles.sectionTitle}>Choose a Delivery Partner</Text>

        {deliveryPartners.map((p) => {
          const isActive = selected === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.85}
              onPress={() => setSelected(p.id)}
              style={[styles.partnerCard, isActive && styles.partnerActive]}
            >
              <View style={[styles.partnerIcon, { backgroundColor: p.color + '20' }]}>
                <Ionicons name={p.icon} size={26} color={p.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.partnerName}>{p.name}</Text>
                <Text style={styles.partnerTag}>{p.tagline}</Text>
                <View style={styles.partnerMeta}>
                  <View style={styles.metaChip}>
                    <Ionicons name="time-outline" size={11} color={colors.textSecondary} />
                    <Text style={styles.metaChipText}>{p.eta}</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Ionicons name="cash-outline" size={11} color={colors.textSecondary} />
                    <Text style={styles.metaChipText}>{p.cost}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                {isActive && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.noteBox}>
          <Ionicons name="bulb-outline" size={18} color={colors.accent} />
          <Text style={styles.noteText}>
            You'll be redirected to the partner's app to complete the booking. Payment is done there.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Open Partner App"
          icon="open-outline"
          onPress={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  infoBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: colors.info + '10', padding: 14, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.info + '25', marginBottom: spacing.lg,
  },
  infoText: { flex: 1, fontSize: 12, color: colors.info, lineHeight: 18 },
  hero: { borderRadius: radius.lg, padding: 18, marginBottom: spacing.xxl, ...shadows.md },
  heroLabel: { fontSize: 10, letterSpacing: 1.5, fontWeight: '800', color: 'rgba(255,255,255,0.75)' },
  heroTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginTop: 4, marginBottom: 12 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  heroText: { color: 'rgba(255,255,255,0.9)', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 14 },
  partnerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: colors.border,
  },
  partnerActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight + '60' },
  partnerIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  partnerName: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  partnerTag: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  partnerMeta: { flexDirection: 'row', gap: 6, marginTop: 8 },
  metaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: colors.bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  metaChipText: { fontSize: 10, color: colors.textSecondary, fontWeight: '600' },
  radio: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  noteBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: colors.accent + '15', padding: 14, borderRadius: radius.md, marginTop: 14,
    borderWidth: 1, borderColor: colors.accent + '30',
  },
  noteText: { flex: 1, fontSize: 12, color: colors.textPrimary, lineHeight: 18 },
  footer: {
    padding: spacing.lg, backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
});
