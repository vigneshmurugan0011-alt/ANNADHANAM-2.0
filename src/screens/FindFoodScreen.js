import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import FoodCard from '../components/FoodCard';
import { useApp } from '../context/AppContext';

export default function FindFoodScreen() {
  const {
    donations,
    searchQuery,
    setSearchQuery,
    locationQuery,
    setLocationQuery,
    openDonationDetails,
  } = useApp();

  const [filterVeg, setFilterVeg] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('nearest'); // 'nearest' | 'match' | 'freshest' | 'quantity'

  const categories = ['All', 'Cooked Meals', 'Packed Food', 'Bakery', 'Breakfast', 'Catering Surplus'];

  // Filter donations
  const filteredDonations = donations.filter((d) => {
    // text query
    const matchesQuery =
      !searchQuery ||
      d.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase());

    // location query
    const matchesLoc =
      !locationQuery ||
      d.pickupAddress.toLowerCase().includes(locationQuery.toLowerCase()) ||
      d.distance.toLowerCase().includes(locationQuery.toLowerCase());

    // veg filter
    const isVeg = d.isVeg !== undefined ? d.isVeg : d.foodType?.toLowerCase().includes('veg');
    const matchesVeg =
      filterVeg === 'all' ||
      (filterVeg === 'veg' && isVeg) ||
      (filterVeg === 'non-veg' && !isVeg);

    // category filter
    const matchesCategory =
      selectedCategory === 'All' || d.category === selectedCategory;

    return matchesQuery && matchesLoc && matchesVeg && matchesCategory;
  });

  // Sort donations
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === 'match') {
      return (b.matchScore || 0) - (a.matchScore || 0);
    }
    if (sortBy === 'quantity') {
      return (b.servings || 0) - (a.servings || 0);
    }
    // default nearest
    const distA = parseFloat(a.distance) || 0;
    const distB = parseFloat(b.distance) || 0;
    return distA - distB;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header & Search Bar */}
      <View style={styles.topSection}>
        <Text style={styles.pageTitle}>Find Surplus Food Near You</Text>
        <Text style={styles.pageSubtitle}>
          Real-time rescued food available from verified restaurants, catering halls, and community kitchens.
        </Text>

        {/* Search & Location Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrap}>
            <Ionicons name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by food items, donor name, or dish..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.locationInputWrap}>
            <Ionicons name="location-sharp" size={18} color={colors.primary} style={{ marginRight: 6 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Filter location (e.g. Chennai, Guindy)..."
              placeholderTextColor={colors.textMuted}
              value={locationQuery}
              onChangeText={setLocationQuery}
            />
            {locationQuery.length > 0 && (
              <TouchableOpacity onPress={() => setLocationQuery('')}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Chips & Sorting */}
        <View style={styles.filtersBar}>
          {/* Veg / Non-Veg Toggles */}
          <View style={styles.vegToggleGroup}>
            <TouchableOpacity
              style={[styles.toggleBtn, filterVeg === 'all' && styles.toggleBtnActive]}
              onPress={() => setFilterVeg('all')}
            >
              <Text style={[styles.toggleText, filterVeg === 'all' && styles.toggleTextActive]}>
                All Food ({donations.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, filterVeg === 'veg' && styles.toggleBtnActiveVeg]}
              onPress={() => setFilterVeg('veg')}
            >
              <Ionicons name="leaf" size={12} color={filterVeg === 'veg' ? colors.veg : colors.textSecondary} style={{ marginRight: 4 }} />
              <Text style={[styles.toggleText, filterVeg === 'veg' && { color: colors.veg, fontWeight: '700' }]}>
                Vegetarian
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, filterVeg === 'non-veg' && styles.toggleBtnActiveNonVeg]}
              onPress={() => setFilterVeg('non-veg')}
            >
              <Ionicons name="restaurant" size={12} color={filterVeg === 'non-veg' ? colors.nonVeg : colors.textSecondary} style={{ marginRight: 4 }} />
              <Text style={[styles.toggleText, filterVeg === 'non-veg' && { color: colors.nonVeg, fontWeight: '700' }]}>
                Non-Vegetarian
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sort dropdown buttons */}
          <View style={styles.sortGroup}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <TouchableOpacity
              style={[styles.sortBtn, sortBy === 'nearest' && styles.sortBtnActive]}
              onPress={() => setSortBy('nearest')}
            >
              <Text style={[styles.sortBtnText, sortBy === 'nearest' && styles.sortBtnTextActive]}>Nearest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortBtn, sortBy === 'match' && styles.sortBtnActive]}
              onPress={() => setSortBy('match')}
            >
              <Text style={[styles.sortBtnText, sortBy === 'match' && styles.sortBtnTextActive]}>Best Match</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortBtn, sortBy === 'quantity' && styles.sortBtnActive]}
              onPress={() => setSortBy('quantity')}
            >
              <Text style={[styles.sortBtnText, sortBy === 'quantity' && styles.sortBtnTextActive]}>Max Meals</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Header */}
      <View style={styles.resultsInfoRow}>
        <Text style={styles.resultsCount}>
          Showing {sortedDonations.length} available donations
        </Text>
        <View style={styles.verifiedTag}>
          <Ionicons name="shield-checkmark" size={14} color={colors.success} style={{ marginRight: 4 }} />
          <Text style={styles.verifiedTagText}>All Donations Food-Safety Verified</Text>
        </View>
      </View>

      {/* Grid of Food Cards */}
      {sortedDonations.length === 0 ? (
        <View style={styles.emptyStateCard}>
          <Ionicons name="search-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyStateTitle}>No Food Donations Found</Text>
          <Text style={styles.emptyStateDesc}>
            Try clearing your search or expanding your distance filter.
          </Text>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              setSearchQuery('');
              setLocationQuery('');
              setFilterVeg('all');
              setSelectedCategory('All');
            }}
          >
            <Text style={styles.clearBtnText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.foodGrid}>
          {sortedDonations.map((donation) => (
            <View key={donation.id} style={styles.foodGridCol}>
              <FoodCard donation={donation} onSelect={openDonationDetails} />
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
  topSection: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  pageSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  searchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: spacing.md,
  },
  searchInputWrap: {
    flex: 1.5,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  locationInputWrap: {
    flex: 1,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
  filtersBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: spacing.md,
    paddingTop: spacing.xs,
  },
  vegToggleGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleBtnActiveVeg: {
    backgroundColor: colors.vegBg,
    borderColor: colors.veg,
  },
  toggleBtnActiveNonVeg: {
    backgroundColor: colors.nonVegBg,
    borderColor: colors.nonVeg,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sortGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  sortBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.bg,
  },
  sortBtnActive: {
    backgroundColor: colors.primaryLight,
  },
  sortBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sortBtnTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: spacing.xs,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryChipTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  foodGridCol: {
    flexBasis: 280,
    flexGrow: 1,
    maxWidth: 360,
  },
  emptyStateCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptyStateDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  clearBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.md,
  },
  clearBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
