import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { deliveryPartners } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function TrackingScreen() {
  const { selectedRequest, requests } = useApp();

  // Use selected request or fallback to first request
  const currentReq = selectedRequest || requests[0] || {
    foodType: 'Cooked Meals (Rice & Sambar)',
    donorName: 'Sri Sai Mess',
    location: 'Anna University, Hostel Block A',
    status: 'In Transit',
    otp: '6482',
    servings: 30,
  };

  const [selectedPartner, setSelectedPartner] = useState(deliveryPartners[0]);
  const [currentStage, setCurrentStage] = useState(3); // 0..4

  const stages = [
    { title: 'Request Accepted', time: '11:45 AM', sub: 'Donor verified availability', icon: 'checkmark-circle' },
    { title: 'Delivery Booked', time: '11:52 AM', sub: 'Automated logistics partner dispatch', icon: 'bicycle' },
    { title: 'Rider Assigned', time: '12:05 PM', sub: `${selectedPartner.name} - Ramesh K (+91 98401 22334)`, icon: 'person' },
    { title: 'Food Picked Up', time: '12:15 PM', sub: 'Package temperature & hygiene checked', icon: 'cube' },
    { title: 'Delivered', time: 'ETA 12:35 PM', sub: 'Verify OTP at destination', icon: 'home' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Live Food Delivery Tracking</Text>
        <Text style={styles.subtitle}>
          Track courier location, volunteer dispatch, and confirm handover with secure OTP.
        </Text>
      </View>

      <View style={styles.grid}>
        {/* Left Column: Live Map & Partner Info */}
        <View style={styles.leftCol}>
          {/* Simulated Map View */}
          <View style={styles.mapCard}>
            <View style={styles.mapHeader}>
              <View style={styles.liveTag}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE GPS TRACKING</Text>
              </View>
              <Text style={styles.etaText}>ETA: {selectedPartner.eta}</Text>
            </View>

            {/* Visual Route */}
            <View style={styles.routeBox}>
              <View style={styles.routePoint}>
                <View style={[styles.pointCircle, { backgroundColor: colors.primary }]}>
                  <Ionicons name="restaurant" size={16} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pointTitle}>Pickup: {currentReq.donorName}</Text>
                  <Text style={styles.pointSub}>Anna Nagar West</Text>
                </View>
              </View>

              <View style={styles.routeLineWrap}>
                <View style={styles.dashLine} />
                <View style={styles.riderMarker}>
                  <Ionicons name="bicycle" size={18} color={colors.primary} />
                </View>
              </View>

              <View style={styles.routePoint}>
                <View style={[styles.pointCircle, { backgroundColor: colors.accent }]}>
                  <Ionicons name="location" size={16} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pointTitle}>Drop-off: {currentReq.location}</Text>
                  <Text style={styles.pointSub}>Community Shelter</Text>
                </View>
              </View>
            </View>

            {/* OTP Box inside map */}
            <View style={styles.otpBanner}>
              <Ionicons name="key" size={20} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.otpBannerTitle}>Delivery Handover OTP</Text>
                <Text style={styles.otpBannerSub}>Share this code only with the delivery rider upon arrival.</Text>
              </View>
              <View style={styles.otpPill}>
                <Text style={styles.otpNumber}>{currentReq.otp || '6482'}</Text>
              </View>
            </View>
          </View>

          {/* Assigned Delivery Partner Card */}
          <View style={styles.partnerCard}>
            <View style={styles.partnerTop}>
              <View style={[styles.partnerIconWrap, { backgroundColor: selectedPartner.color + '20' }]}>
                <Ionicons name={selectedPartner.icon} size={24} color={selectedPartner.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.partnerName}>{selectedPartner.name}</Text>
                <Text style={styles.partnerTagline}>{selectedPartner.tagline}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{selectedPartner.rating}</Text>
              </View>
            </View>

            <View style={styles.partnerDivider} />

            <View style={styles.riderRow}>
              <View style={styles.riderAvatar}>
                <Ionicons name="person" size={16} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.riderName}>Ramesh K (Volunteer Courier)</Text>
                <Text style={styles.riderPhone}>+91 98401 22334 • Hero Electric NYX</Text>
              </View>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call" size={16} color="#FFFFFF" />
                <Text style={styles.callBtnText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Right Column: Timeline & Alternative Partners */}
        <View style={styles.rightCol}>
          {/* Timeline Progress */}
          <View style={styles.timelineCard}>
            <Text style={styles.timelineTitle}>Delivery Progress Stages</Text>
            <View style={styles.stagesList}>
              {stages.map((stage, idx) => {
                const isDone = idx <= currentStage;
                const isCurrent = idx === currentStage;
                return (
                  <View key={idx} style={styles.stageRow}>
                    <View style={styles.stageIndicator}>
                      <View
                        style={[
                          styles.stageDot,
                          isDone && styles.stageDotDone,
                          isCurrent && styles.stageDotActive,
                        ]}
                      >
                        <Ionicons
                          name={isDone ? 'checkmark' : stage.icon}
                          size={12}
                          color={isDone ? '#FFFFFF' : colors.textMuted}
                        />
                      </View>
                      {idx < stages.length - 1 && (
                        <View style={[styles.stageLine, isDone && styles.stageLineDone]} />
                      )}
                    </View>

                    <View style={styles.stageTextWrap}>
                      <View style={styles.stageHeaderRow}>
                        <Text style={[styles.stageHeading, isDone && { color: colors.textPrimary, fontWeight: '800' }]}>
                          {stage.title}
                        </Text>
                        <Text style={styles.stageTime}>{stage.time}</Text>
                      </View>
                      <Text style={styles.stageSub}>{stage.sub}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Integrated Logistics Partner Options */}
          <View style={styles.partnerOptionsCard}>
            <Text style={styles.partnerOptTitle}>Integrated Delivery Partners</Text>
            <View style={styles.partnerList}>
              {deliveryPartners.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.partnerItem, selectedPartner.id === p.id && styles.partnerItemActive]}
                  onPress={() => setSelectedPartner(p)}
                >
                  <Ionicons name={p.icon} size={20} color={p.color} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.partnerItemName}>{p.name}</Text>
                    <Text style={styles.partnerItemCost}>{p.cost} • {p.eta}</Text>
                  </View>
                  <Ionicons
                    name={selectedPartner.id === p.id ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 80,
  },
  header: {
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  leftCol: {
    flex: 1.5,
    minWidth: 320,
    gap: spacing.lg,
  },
  rightCol: {
    flex: 1.2,
    minWidth: 280,
    gap: spacing.lg,
  },
  mapCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadows.sm,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  etaText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  routeBox: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  pointSub: {
    fontSize: 11,
    color: colors.textMuted,
  },
  routeLineWrap: {
    paddingLeft: 15,
    height: 36,
    position: 'relative',
    justifyContent: 'center',
  },
  dashLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.border,
  },
  riderMarker: {
    position: 'absolute',
    left: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  otpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primaryLightest,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  otpBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  otpBannerSub: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  otpPill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  otpNumber: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
  partnerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  partnerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  partnerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  partnerTagline: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  ratingBadge: {
    backgroundColor: colors.metricOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E65100',
  },
  partnerDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  riderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  riderPhone: {
    fontSize: 10,
    color: colors.textMuted,
  },
  callBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  timelineCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  stagesList: {
    gap: 14,
  },
  stageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stageIndicator: {
    alignItems: 'center',
    width: 24,
  },
  stageDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageDotDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stageDotActive: {
    backgroundColor: colors.info,
    borderColor: colors.info,
  },
  stageLine: {
    width: 2,
    height: 34,
    backgroundColor: colors.border,
    marginTop: 2,
  },
  stageLineDone: {
    backgroundColor: colors.success,
  },
  stageTextWrap: {
    flex: 1,
  },
  stageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stageHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stageTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  stageSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  partnerOptionsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  partnerOptTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  partnerList: {
    gap: 8,
  },
  partnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  partnerItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLightest,
  },
  partnerItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  partnerItemCost: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
