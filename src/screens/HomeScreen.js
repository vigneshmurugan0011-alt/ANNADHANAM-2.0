import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import MetricCard from '../components/MetricCard';
import FoodCard from '../components/FoodCard';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const {
    user,
    donations,
    requests,
    stats,
    navigateTo,
    searchQuery,
    openDonationDetails,
    setSelectedRequest,
  } = useApp();

  const [nearbyInput, setNearbyInput] = useState('');
  const [showAllDonations, setShowAllDonations] = useState(false);

  const isDonor = user?.roleType === 'donor';
  const isAdmin = user?.roleType === 'admin';

  const filteredDonations = donations.filter((d) => {
    if (d.status !== 'available') return false;
    const q = (searchQuery || nearbyInput).toLowerCase().trim();
    if (!q) return true;
    return (
      d.foodItems?.toLowerCase().includes(q) ||
      d.donorName?.toLowerCase().includes(q) ||
      d.location?.toLowerCase().includes(q)
    );
  });

  const displayedDonations = showAllDonations ? filteredDonations : filteredDonations.slice(0, 4);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* 2-Column Responsive Layout: Left Main Column & Right Widget Column */}
      <View style={styles.dashboardGrid}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          {/* 1. Hero Section */}
          <View style={styles.heroCard}>
            <View style={styles.heroTextContent}>
              <Text style={styles.heroTitle}>
                Together we can{'\n'}turn surplus food into
              </Text>
              <View style={styles.scriptRow}>
                <Text style={styles.heroScript}>smiles</Text>
                <Ionicons name="heart-outline" size={24} color={colors.accent} style={{ marginLeft: 6 }} />
              </View>

              <Text style={styles.heroSubtitle}>
                {isDonor
                  ? 'Your cooked surplus meals can nourish hungry families across the city in minutes.'
                  : 'ANNADHANAM 2.0 connects food donors with people in need, reducing food waste and fighting hunger.'}
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => {
                  if (isAdmin) navigateTo('admin-dashboard');
                  else if (isDonor) navigateTo('donate');
                  else navigateTo('requests');
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.heroButtonText}>
                  {isAdmin ? 'Open Admin Control' : isDonor ? 'Donate Surplus Food' : 'View My Requests'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Food Bowl Photo */}
            <View style={styles.heroImageWrap}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
                }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.leafAccent}>
                <Ionicons name="leaf" size={24} color="#81C784" />
              </View>
            </View>
          </View>

          {/* 2. Nearby Active Donors Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="location" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Nearby Active Donors</Text>
              </View>
              {filteredDonations.length > 4 && (
                <TouchableOpacity onPress={() => setShowAllDonations(!showAllDonations)}>
                  <Text style={styles.viewAllText}>
                    {showAllDonations ? 'Show Less ↑' : `View All (${filteredDonations.length}) →`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Donor Cards Grid */}
            <View style={styles.donorsGrid}>
              {displayedDonations.map((donation) => (
                <View key={donation.id} style={styles.donorCardCol}>
                  <FoodCard donation={donation} onSelect={openDonationDetails} />
                </View>
              ))}
              {displayedDonations.length === 0 && (
                <View style={{ padding: 24, alignItems: 'center', width: '100%' }}>
                  <Ionicons name="nutrition-outline" size={40} color={colors.textMuted} />
                  <Text style={{ color: colors.textSecondary, marginTop: 8, fontWeight: '600' }}>
                    No matching food donations currently available.
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* 3. Recent Requests Table */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="time" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Recent Requests</Text>
              </View>
              <TouchableOpacity onPress={() => navigateTo('requests')}>
                <Text style={styles.viewAllText}>View All →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tableCard}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Food Type</Text>
                <Text style={[styles.thCell, { flex: 2 }]}>Location</Text>
                <Text style={[styles.thCell, { flex: 1.8 }]}>Requested By</Text>
                <Text style={[styles.thCell, { flex: 1.2 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 0.8, textAlign: 'right' }]}>Action</Text>
              </View>

              {/* Table Rows */}
              {requests.slice(0, 4).map((req, idx) => {
                const getStatusStyle = (status) => {
                  switch (status) {
                    case 'Pending':
                      return { bg: colors.warningBg, color: colors.warning, icon: 'time-outline' };
                    case 'Accepted':
                      return { bg: colors.successBg, color: colors.success, icon: 'checkmark-circle-outline' };
                    case 'In Transit':
                      return { bg: colors.infoBg, color: colors.info, icon: 'bicycle-outline' };
                    case 'Delivered':
                      return { bg: colors.successBg, color: colors.success, icon: 'checkmark-done-outline' };
                    default:
                      return { bg: colors.bg, color: colors.textSecondary, icon: 'ellipse-outline' };
                  }
                };

                const statusStyle = getStatusStyle(req.status);

                return (
                  <View
                    key={req.id}
                    style={[
                      styles.tableRow,
                      idx === requests.length - 1 && { borderBottomWidth: 0 },
                    ]}
                  >
                    {/* Food Type */}
                    <View style={[styles.tdCell, { flex: 1.5, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                      <View style={styles.foodTypeIconWrap}>
                        <Ionicons name="restaurant" size={14} color={colors.accent} />
                      </View>
                      <View>
                        <Text style={styles.foodTypeText}>{req.foodType}</Text>
                        <Text style={styles.foodSubText}>{req.servings} meals</Text>
                      </View>
                    </View>

                    {/* Location */}
                    <View style={[styles.tdCell, { flex: 2 }]}>
                      <Text style={styles.locationCellText} numberOfLines={1}>
                        {req.location}
                      </Text>
                    </View>

                    {/* Requested By */}
                    <View style={[styles.tdCell, { flex: 1.8 }]}>
                      <Text style={styles.requesterCellText} numberOfLines={1}>
                        {req.requestedBy}
                      </Text>
                    </View>

                    {/* Status Badge */}
                    <View style={[styles.tdCell, { flex: 1.2 }]}>
                      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Ionicons name={statusStyle.icon} size={12} color={statusStyle.color} style={{ marginRight: 4 }} />
                        <Text style={[styles.statusBadgeText, { color: statusStyle.color }]}>
                          {req.status}
                        </Text>
                      </View>
                    </View>

                    {/* Action */}
                    <View style={[styles.tdCell, { flex: 0.8, alignItems: 'flex-end' }]}>
                      <TouchableOpacity
                        style={styles.viewActionBtn}
                        onPress={() => {
                          setSelectedRequest(req);
                          navigateTo('requests');
                        }}
                      >
                        <Text style={styles.viewActionText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
          {/* 1. Metric Stats Row */}
          <View style={styles.metricsGrid}>
            <MetricCard
              value={`${stats.foodRescuedKg} kg`}
              label="Food Rescued"
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
              value={stats.deliveries}
              label="Deliveries"
              icon="car"
              bgColor={colors.metricBlue}
              iconColor="#0288D1"
              subIcon="car"
            />
            <MetricCard
              value={stats.activeDonors}
              label="Active Donors"
              icon="people"
              bgColor={colors.metricPurple}
              iconColor="#7B1FA2"
              subIcon="people"
            />
          </View>

          {/* 2. Role-Aware Action Card */}
          {isDonor ? (
            <View style={styles.findFoodNearCard}>
              <View style={styles.bowlPinIconWrap}>
                <View style={styles.bowlIllustration}>
                  <Ionicons name="restaurant" size={32} color="#2D6A4F" />
                  <View style={styles.mapPinOnBowl}>
                    <Ionicons name="flash" size={18} color={colors.accent} />
                  </View>
                </View>
              </View>

              <Text style={styles.findNearTitle}>Have Surplus Food?</Text>
              <Text style={styles.findNearDesc}>
                Post your excess cooked meals in under 60 seconds. Our delivery partners handle pickup and distribution.
              </Text>

              <TouchableOpacity
                style={styles.findNearButton}
                onPress={() => navigateTo('donate')}
                activeOpacity={0.85}
              >
                <Ionicons name="add-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.findNearButtonText}>Post Food Donation</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.findFoodNearCard}>
              <View style={styles.bowlPinIconWrap}>
                <View style={styles.bowlIllustration}>
                  <Ionicons name="nutrition" size={32} color="#2D6A4F" />
                  <View style={styles.mapPinOnBowl}>
                    <Ionicons name="location" size={18} color={colors.accent} />
                  </View>
                </View>
              </View>

              <Text style={styles.findNearTitle}>Filter by Area / Donor</Text>
              <Text style={styles.findNearDesc}>
                Filter available surplus food from verified kitchens in your neighborhood.
              </Text>

              <View style={styles.inputWithIcon}>
                <Ionicons name="search" size={16} color={colors.textMuted} style={{ marginRight: 6 }} />
                <TextInput
                  style={styles.nearbyInput}
                  placeholder="Enter location or dish name..."
                  placeholderTextColor={colors.textMuted}
                  value={nearbyInput}
                  onChangeText={setNearbyInput}
                />
              </View>

              {nearbyInput.length > 0 && (
                <TouchableOpacity
                  style={[styles.findNearButton, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}
                  onPress={() => setNearbyInput('')}
                >
                  <Text style={[styles.findNearButtonText, { color: colors.textPrimary }]}>Clear Filter</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* 3. Quick Actions Grid */}
          <View style={styles.quickActionsCard}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {isDonor ? (
                <>
                  <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('donate')}>
                    <Ionicons name="restaurant" size={20} color={colors.primary} />
                    <Text style={styles.quickActionLabel}>Donate Food</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('donations')}>
                    <Ionicons name="gift" size={20} color={colors.primary} />
                    <Text style={styles.quickActionLabel}>My Donations</Text>
                  </TouchableOpacity>
                </>
              ) : isAdmin ? (
                <>
                  <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('admin-dashboard')}>
                    <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
                    <Text style={styles.quickActionLabel}>Admin Panel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('donations')}>
                    <Ionicons name="gift" size={20} color={colors.primary} />
                    <Text style={styles.quickActionLabel}>All Donations</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('requests')}>
                  <Ionicons name="clipboard" size={20} color={colors.primary} />
                  <Text style={styles.quickActionLabel}>My Requests</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('tracking')}>
                <Ionicons name="bicycle" size={20} color={colors.primary} />
                <Text style={styles.quickActionLabel}>Track Delivery</Text>
              </TouchableOpacity>
                <Ionicons name="bicycle" size={20} color={colors.primary} />
                <Text style={styles.quickActionLabel}>Track Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionItem} onPress={() => navigateTo('help')}>
                <Ionicons name="headset" size={20} color={colors.primary} />
                <Text style={styles.quickActionLabel}>Help & Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. Be a Food Donor Promo Card */}
          <TouchableOpacity
            style={styles.beADonorCard}
            onPress={() => navigateTo('donate')}
            activeOpacity={0.9}
          >
            <View style={styles.donorPromoRow}>
              <View style={styles.donorPromoIconWrap}>
                <Ionicons name="fast-food" size={26} color="#2D6A4F" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.donorPromoTitle}>Be a Food Donor</Text>
                <Text style={styles.donorPromoSub}>
                  Your extra food can bring happiness to someone's life.
                </Text>
              </View>
              <View style={styles.circleArrowBtn}>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>

          {/* 5. Quote Banner */}
          <View style={styles.quoteCard}>
            <View style={styles.quoteTextWrap}>
              <Text style={styles.quoteText}>
                "Small acts create a big impact."
              </Text>
              <Text style={styles.quoteAuthor}>— ANNADHANAM 2.0</Text>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80',
              }}
              style={styles.quoteImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 60,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  leftColumn: {
    flex: 2,
    minWidth: 320,
    gap: spacing.xl,
  },
  rightColumn: {
    flex: 1,
    minWidth: 280,
    gap: spacing.xl,
  },

  // 1. Hero Card
  heroCard: {
    backgroundColor: '#FAF5EE', // Warm light cream
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.sm,
  },
  heroTextContent: {
    flex: 1.3,
    paddingRight: spacing.md,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primaryDark,
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  scriptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  heroScript: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 32,
    fontWeight: '700',
    color: colors.accent,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginVertical: 12,
    maxWidth: '90%',
  },
  heroButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginTop: 4,
    ...shadows.sm,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  heroImageWrap: {
    flex: 1,
    height: 180,
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  leafAccent: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 14,
    padding: 4,
  },

  // 2. Section Header
  sectionContainer: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },

  // Donors Grid
  donorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  donorCardCol: {
    flex: 1,
    minWidth: 220,
  },

  // 3. Table Card
  tableCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thCell: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tdCell: {
    justifyContent: 'center',
  },
  foodTypeIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.metricOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodTypeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  foodSubText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  locationCellText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  requesterCellText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  viewActionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.xs,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },

  // RIGHT COLUMN:
  // Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // Find Food Near You Card
  findFoodNearCard: {
    backgroundColor: '#FAF5EE',
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    textAlign: 'center',
    ...shadows.sm,
  },
  bowlPinIconWrap: {
    marginBottom: spacing.sm,
  },
  bowlIllustration: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapPinOnBowl: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  findNearTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  findNearDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 42,
    width: '100%',
    marginBottom: 10,
  },
  nearbyInput: {
    flex: 1,
    fontSize: 12,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
  findNearButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  findNearButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // Quick Actions
  quickActionsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  quickActionsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionItem: {
    flex: 1,
    minWidth: 90,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  // Be a Donor Card
  beADonorCard: {
    backgroundColor: colors.primaryLightest,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  donorPromoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  donorPromoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  donorPromoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  donorPromoSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  circleArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quote Card
  quoteCard: {
    backgroundColor: '#FAF5EE',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...shadows.sm,
  },
  quoteTextWrap: {
    flex: 1.2,
    padding: spacing.md,
  },
  quoteText: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: 18,
  },
  quoteAuthor: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 4,
  },
  quoteImage: {
    width: 100,
    height: 75,
  },
});
