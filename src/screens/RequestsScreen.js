import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function RequestsScreen() {
  const { requests, updateRequestStatus, navigateTo, setSelectedRequest } = useApp();
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Active' | 'Completed'

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'Active') {
      return r.status === 'Pending' || r.status === 'Accepted' || r.status === 'In Transit';
    }
    if (activeTab === 'Completed') {
      return r.status === 'Delivered';
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return { bg: colors.warningBg, text: colors.warning };
      case 'Accepted':
        return { bg: colors.successBg, text: colors.success };
      case 'In Transit':
        return { bg: colors.infoBg, text: colors.info };
      case 'Delivered':
        return { bg: colors.successBg, text: colors.success };
      default:
        return { bg: colors.bg, text: colors.textSecondary };
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Food Requests</Text>
          <Text style={styles.subtitle}>
            Track real-time approval status, volunteer partner assignments, and delivery OTPs.
          </Text>
        </View>

        {/* Tab Filters */}
        <View style={styles.tabRow}>
          {['All', 'Active', 'Completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="clipboard-outline" size={44} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>No Requests Found</Text>
          <Text style={styles.emptySub}>You haven't requested any food in this category yet.</Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => navigateTo('home')}>
            <Text style={styles.exploreBtnText}>Browse Available Food</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.requestsList}>
          {filteredRequests.map((req) => {
            const statusStyle = getStatusColor(req.status);

            return (
              <View key={req.id} style={styles.requestCard}>
                {/* Top Row: Food & Status */}
                <View style={styles.cardHeader}>
                  <View style={styles.foodInfo}>
                    <View style={styles.foodIconWrap}>
                      <Ionicons name="restaurant" size={20} color={colors.primary} />
                    </View>
                    <View>
                      <Text style={styles.foodTitle}>{req.foodType}</Text>
                      <Text style={styles.donorSub}>From {req.donorName} • {req.servings} Servings</Text>
                    </View>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
                      {req.status}
                    </Text>
                  </View>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.detailText} numberOfLines={1}>{req.location}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.detailText}>Requested: {req.time}</Text>
                  </View>

                  {req.otp && (
                    <View style={styles.otpBox}>
                      <Ionicons name="key-outline" size={14} color={colors.primary} />
                      <Text style={styles.otpLabel}>Delivery Verification OTP:</Text>
                      <Text style={styles.otpCode}>{req.otp}</Text>
                    </View>
                  )}
                </View>

                {/* Timeline Progress Bar */}
                <View style={styles.timelineBox}>
                  <Text style={styles.timelineHeading}>Delivery Progress Stage:</Text>
                  <View style={styles.timelineRow}>
                    {req.timeline?.map((stepItem, idx) => (
                      <View key={idx} style={styles.timelineStep}>
                        <View
                          style={[
                            styles.stepDot,
                            stepItem.done && styles.stepDotDone,
                            req.status === 'In Transit' && idx === 3 && styles.stepDotActive,
                          ]}
                        >
                          {stepItem.done && (
                            <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                          )}
                        </View>
                        <Text style={[styles.stepLabel, stepItem.done && styles.stepLabelDone]}>
                          {stepItem.step}
                        </Text>
                        {stepItem.time !== '—' && (
                          <Text style={styles.stepTime}>{stepItem.time}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                </View>

                {/* Card Actions */}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.trackBtn}
                    onPress={() => {
                      setSelectedRequest(req);
                      navigateTo('tracking');
                    }}
                  >
                    <Ionicons name="bicycle-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.trackBtnText}>Track Delivery & Courier</Text>
                  </TouchableOpacity>

                  {req.status === 'Pending' && (
                    <TouchableOpacity
                      style={styles.advanceBtn}
                      onPress={() => updateRequestStatus(req.id, 'Accepted')}
                    >
                      <Text style={styles.advanceBtnText}>Simulate Acceptance</Text>
                    </TouchableOpacity>
                  )}

                  {req.status === 'Accepted' && (
                    <TouchableOpacity
                      style={styles.advanceBtn}
                      onPress={() => updateRequestStatus(req.id, 'In Transit')}
                    >
                      <Text style={styles.advanceBtnText}>Simulate Pickup</Text>
                    </TouchableOpacity>
                  )}

                  {req.status === 'In Transit' && (
                    <TouchableOpacity
                      style={styles.advanceBtnSuccess}
                      onPress={() => updateRequestStatus(req.id, 'Delivered')}
                    >
                      <Text style={styles.advanceBtnSuccessText}>Confirm Delivery with OTP</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
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
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
  },
  requestsList: {
    gap: spacing.lg,
  },
  requestCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  foodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  donorSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  otpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  otpLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  otpCode: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1.5,
  },
  timelineBox: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timelineHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timelineStep: {
    flex: 1,
    alignItems: 'center',
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepDotDone: {
    backgroundColor: colors.success,
  },
  stepDotActive: {
    backgroundColor: colors.info,
  },
  stepLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '600',
  },
  stepLabelDone: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  stepTime: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  trackBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: radius.md,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  advanceBtn: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
  },
  advanceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  advanceBtnSuccess: {
    backgroundColor: colors.success,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  advanceBtnSuccessText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyCard: {
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
  exploreBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.md,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
