import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { colors, spacing, radius, shadows } from '../../theme/theme';

const steps = [
  { key: 'booked', label: 'Delivery Booked', icon: 'checkmark-circle', time: 'Just now' },
  { key: 'assigned', label: 'Partner Assigned', icon: 'person-add', time: '~2 min' },
  { key: 'pickup', label: 'Picked up from Donor', icon: 'cube', time: '~15 min' },
  { key: 'onway', label: 'On the way', icon: 'bicycle', time: '~25 min' },
  { key: 'delivered', label: 'Delivered', icon: 'home', time: '~35 min' },
];

export default function TrackingScreen({ navigation, route }) {
  const donation = route.params?.donation;
  const partner = route.params?.partner || { name: 'Rapido', eta: '15-25 min' };
  const [currentStep, setCurrentStep] = useState(1);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
    const t = setInterval(() => setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s)), 4000);
    return () => clearInterval(t);
  }, [pulseAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Track Delivery" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.map}>
          <View style={styles.mapLine} />
          <View style={styles.mapDotStart}>
            <Ionicons name="restaurant" size={16} color="#fff" />
          </View>
          <View style={styles.mapDotEnd}>
            <Ionicons name="heart" size={16} color="#fff" />
          </View>
          <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.mapRider}>
            <Ionicons name="bicycle" size={20} color={colors.primary} />
          </View>
          <View style={styles.etaBubble}>
            <Ionicons name="time" size={12} color="#fff" />
            <Text style={styles.etaBubbleText}>{partner.eta}</Text>
          </View>
        </View>

        {/* Partner Card */}
        <View style={styles.partnerCard}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.partnerIcon}
          >
            <Ionicons name="bicycle" size={22} color="#fff" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.partnerName}>{partner.name} Partner</Text>
            <Text style={styles.partnerSub}>Arriving in {partner.eta}</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Donation Mini Info */}
        {donation && (
          <View style={styles.donationInfo}>
            <Ionicons name="fast-food-outline" size={18} color={colors.primary} />
            <Text style={styles.donationText} numberOfLines={1}>
              {donation.foodType} • {donation.quantity}
            </Text>
          </View>
        )}

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Delivery Progress</Text>
        <View style={styles.timeline}>
          {steps.map((s, i) => {
            const done = i <= currentStep;
            const active = i === currentStep;
            return (
              <View key={s.key} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.stepDot, done && styles.stepDotDone, active && styles.stepDotActive]}>
                    {done && <Ionicons name="checkmark" size={12} color="#fff" />}
                  </View>
                  {i < steps.length - 1 && <View style={[styles.line, done && styles.lineDone]} />}
                </View>
                <View style={styles.timelineBody}>
                  <Text style={[styles.stepLabel, done && { color: colors.textPrimary }]}>{s.label}</Text>
                  <Text style={styles.stepTime}>{s.time}</Text>
                </View>
                {active && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>NOW</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  map: {
    height: 200, backgroundColor: colors.primaryLight + '80', borderRadius: radius.xl,
    position: 'relative', overflow: 'hidden', marginBottom: spacing.lg,
    borderWidth: 1, borderColor: colors.primary + '20',
  },
  mapLine: {
    position: 'absolute', top: 100, left: 50, right: 50, height: 3,
    backgroundColor: colors.primary + '40', borderRadius: 2,
  },
  mapDotStart: {
    position: 'absolute', top: 78, left: 30,
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#fff',
  },
  mapDotEnd: {
    position: 'absolute', top: 78, right: 30,
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.secondary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#fff',
  },
  mapRider: {
    position: 'absolute', top: 82, left: '46%',
    width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.primary,
    ...shadows.md,
  },
  pulse: {
    position: 'absolute', top: 72, left: '42%',
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: colors.primary + '30',
  },
  etaBubble: {
    position: 'absolute', top: 20, left: 20,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.textPrimary, paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: radius.pill,
  },
  etaBubbleText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  partnerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  partnerIcon: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
  },
  partnerName: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  partnerSub: { fontSize: 12, color: colors.success, fontWeight: '600', marginTop: 2 },
  callBtn: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: colors.success,
    alignItems: 'center', justifyContent: 'center',
  },
  donationInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primaryLight, padding: 12, borderRadius: radius.md, marginTop: 14,
  },
  donationText: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginTop: spacing.xxl, marginBottom: 14 },
  timeline: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16,
    borderWidth: 1, borderColor: colors.border,
  },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start' },
  timelineLeft: { alignItems: 'center', width: 30 },
  stepDot: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border,
    backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center',
  },
  stepDotDone: { backgroundColor: colors.success, borderColor: colors.success },
  stepDotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  line: { width: 2, flex: 1, minHeight: 34, backgroundColor: colors.border },
  lineDone: { backgroundColor: colors.success },
  timelineBody: { flex: 1, paddingLeft: 12, paddingBottom: 22 },
  stepLabel: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  stepTime: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  activeBadge: {
    backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.sm,
  },
  activeBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
});
