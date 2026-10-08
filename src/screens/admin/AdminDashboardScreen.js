import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import MetricCard from '../../components/MetricCard';
import { useApp } from '../../context/AppContext';

export default function AdminDashboardScreen() {
  const {
    donations,
    requests,
    stats,
    pendingApprovals,
    approveShelter,
    rejectShelter,
    openDonationDetails,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('approvals'); // 'approvals' | 'donations' | 'dispatch'

  const pendingCount = pendingApprovals.filter((a) => a.status === 'Pending').length;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header Banner */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.adminBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
            <Text style={styles.adminBadgeText}>ADMIN CONTROL PANEL</Text>
          </View>
          <Text style={styles.title}>Platform Administration & Verification</Text>
          <Text style={styles.subtitle}>
            Monitor city-wide surplus food flows, verify registered orphanages/shelters, and oversee logistics.
          </Text>
        </View>
      </View>

      {/* Admin KPI Metrics */}
      <View style={styles.metricsGrid}>
        <MetricCard
          value={`${stats.foodRescuedKg} kg`}
          label="Total Food Rescued"
          icon="leaf"
          bgColor={colors.metricGreen}
          iconColor="#2E7D32"
          subIcon="leaf"
        />
        <MetricCard
          value={stats.peopleFed}
          label="People Fed"
          icon="heart"
          bgColor={colors.metricOrange}
          iconColor="#E65100"
          subIcon="heart"
        />
        <MetricCard
          value={`${pendingCount} Pending`}
          label="Shelter Approvals"
          icon="document-text"
          bgColor={colors.metricBlue}
          iconColor="#0288D1"
          subIcon="checkbox"
        />
        <MetricCard
          value={stats.activeDonors}
          label="Verified Food Donors"
          icon="business"
          bgColor={colors.metricPurple}
          iconColor="#7B1FA2"
          subIcon="people"
        />
      </View>

      {/* Navigation Sub-Tabs */}
      <View style={styles.tabNavRow}>
        <TouchableOpacity
          style={[styles.tabNavBtn, activeAdminTab === 'approvals' && styles.tabNavBtnActive]}
          onPress={() => setActiveAdminTab('approvals')}
        >
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={activeAdminTab === 'approvals' ? '#FFFFFF' : colors.textPrimary}
          />
          <Text style={[styles.tabNavText, activeAdminTab === 'approvals' && styles.tabNavTextActive]}>
            Shelter & NGO Verifications ({pendingCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabNavBtn, activeAdminTab === 'donations' && styles.tabNavBtnActive]}
          onPress={() => setActiveAdminTab('donations')}
        >
          <Ionicons
            name="restaurant-outline"
            size={16}
            color={activeAdminTab === 'donations' ? '#FFFFFF' : colors.textPrimary}
          />
          <Text style={[styles.tabNavText, activeAdminTab === 'donations' && styles.tabNavTextActive]}>
            Platform Live Donations ({donations.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabNavBtn, activeAdminTab === 'dispatch' && styles.tabNavBtnActive]}
          onPress={() => setActiveAdminTab('dispatch')}
        >
          <Ionicons
            name="bicycle-outline"
            size={16}
            color={activeAdminTab === 'dispatch' ? '#FFFFFF' : colors.textPrimary}
          />
          <Text style={[styles.tabNavText, activeAdminTab === 'dispatch' && styles.tabNavTextActive]}>
            Live Courier Dispatch ({requests.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TAB 1: SHELTER APPROVALS */}
      {activeAdminTab === 'approvals' && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>NGO & Shelter Registration Verification</Text>
              <Text style={styles.sectionSub}>Review submitted registration IDs, trust deeds, and beneficiary audits.</Text>
            </View>
          </View>

          <View style={styles.approvalsList}>
            {pendingApprovals.map((app) => (
              <View key={app.id} style={styles.approvalItem}>
                <View style={styles.approvalTop}>
                  <View style={styles.orgIconWrap}>
                    <Ionicons name="business" size={20} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.orgTitleRow}>
                      <Text style={styles.orgName}>{app.orgName}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              app.status === 'Approved'
                                ? colors.successBg
                                : app.status === 'Rejected'
                                ? colors.dangerBg
                                : colors.warningBg,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            {
                              color:
                                app.status === 'Approved'
                                  ? colors.success
                                  : app.status === 'Rejected'
                                  ? colors.danger
                                  : colors.warning,
                            },
                          ]}
                        >
                          {app.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.orgMeta}>
                      {app.type} • Reg No: <Text style={{ fontWeight: '700' }}>{app.regNumber}</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.orgDetailsGrid}>
                  <View style={styles.detailPill}>
                    <Ionicons name="person-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.detailPillText}>Lead: {app.headPerson}</Text>
                  </View>
                  <View style={styles.detailPill}>
                    <Ionicons name="call-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.detailPillText}>{app.phone}</Text>
                  </View>
                  <View style={styles.detailPill}>
                    <Ionicons name="people-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.detailPillText}>{app.beneficiariesCount} Daily Beneficiaries</Text>
                  </View>
                  <View style={styles.detailPill}>
                    <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.detailPillText}>{app.city}</Text>
                  </View>
                </View>

                <View style={styles.docRow}>
                  <Ionicons name="document-attach-outline" size={14} color={colors.primary} />
                  <Text style={styles.docText}>Attached Verification: {app.documents}</Text>
                </View>

                {app.status === 'Pending' && (
                  <View style={styles.actionBtnRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => rejectShelter(app.id)}
                    >
                      <Ionicons name="close-circle-outline" size={16} color={colors.danger} />
                      <Text style={styles.rejectBtnText}>Reject Application</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() => approveShelter(app.id)}
                    >
                      <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                      <Text style={styles.approveBtnText}>Approve & Verify Shelter</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* TAB 2: PLATFORM DONATIONS */}
      {activeAdminTab === 'donations' && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>All Active Food Postings</Text>
          <Text style={styles.sectionSub}>Live audit of all food posted by hotels, restaurants, and mess facilities.</Text>

          <View style={styles.tableWrap}>
            <View style={styles.thRow}>
              <Text style={[styles.th, { flex: 1.5 }]}>Donor Name</Text>
              <Text style={[styles.th, { flex: 1.8 }]}>Food Items</Text>
              <Text style={[styles.th, { flex: 1 }]}>Quantity</Text>
              <Text style={[styles.th, { flex: 1 }]}>Cooked Time</Text>
              <Text style={[styles.th, { flex: 1 }]}>Safety Status</Text>
              <Text style={[styles.th, { flex: 0.8, textAlign: 'right' }]}>Action</Text>
            </View>

            {donations.map((d) => (
              <View key={d.id} style={styles.trRow}>
                <Text style={[styles.td, { flex: 1.5, fontWeight: '700' }]}>{d.donorName}</Text>
                <Text style={[styles.td, { flex: 1.8 }]} numberOfLines={1}>{d.foodType}</Text>
                <Text style={[styles.td, { flex: 1, color: colors.accent, fontWeight: '700' }]}>{d.quantity}</Text>
                <Text style={[styles.td, { flex: 1 }]}>{d.cookedTime || '12:00 PM'}</Text>
                <View style={[styles.td, { flex: 1 }]}>
                  <View style={styles.safePill}>
                    <Ionicons name="shield-checkmark" size={11} color={colors.success} />
                    <Text style={styles.safePillText}>Verified</Text>
                  </View>
                </View>
                <View style={[styles.td, { flex: 0.8, alignItems: 'flex-end' }]}>
                  <TouchableOpacity
                    style={styles.inspectBtn}
                    onPress={() => openDonationDetails(d)}
                  >
                    <Text style={styles.inspectBtnText}>Inspect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* TAB 3: LIVE DISPATCH */}
      {activeAdminTab === 'dispatch' && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Logistics & Dispatch Stream</Text>
          <Text style={styles.sectionSub}>Live tracking of courier rides (Rapido, Porter, Zomato Feeding) and OTP verifications.</Text>

          <View style={styles.dispatchList}>
            {requests.map((r) => (
              <View key={r.id} style={styles.dispatchCard}>
                <View style={styles.dispatchTop}>
                  <View style={styles.riderIcon}>
                    <Ionicons name="bicycle" size={20} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dispatchTitle}>{r.foodType} ({r.servings} meals)</Text>
                    <Text style={styles.dispatchSub}>
                      From: <Text style={{ fontWeight: '700' }}>{r.donorName}</Text> ➔ To: <Text style={{ fontWeight: '700' }}>{r.requestedBy}</Text>
                    </Text>
                  </View>
                  <View style={styles.otpBadge}>
                    <Text style={styles.otpBadgeLabel}>OTP Code:</Text>
                    <Text style={styles.otpBadgeVal}>{r.otp || '6482'}</Text>
                  </View>
                </View>

                <View style={styles.dispatchFooter}>
                  <Text style={styles.partnerText}>Assigned Courier: {r.deliveryPartner || 'Rapido Partner Ramesh K'}</Text>
                  <Text style={styles.dispatchStatusText}>Status: {r.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 80,
    gap: spacing.xl,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  headerLeft: {
    gap: 6,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  adminBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tabNavRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tabNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabNavBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabNavText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tabNavTextActive: {
    color: '#FFFFFF',
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  approvalsList: {
    gap: spacing.md,
  },
  approvalItem: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  approvalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orgIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orgTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orgName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  orgMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orgDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  detailPillText: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  docText: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  actionBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.dangerBg,
  },
  rejectBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.danger,
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  approveBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  thRow: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  th: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  trRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  td: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  safePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  safePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
  },
  inspectBtn: {
    backgroundColor: colors.bg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inspectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  dispatchList: {
    gap: 10,
  },
  dispatchCard: {
    backgroundColor: colors.bg,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  dispatchTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  riderIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dispatchTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  dispatchSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  otpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  otpBadgeLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  otpBadgeVal: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  dispatchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 6,
  },
  partnerText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  dispatchStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
});
