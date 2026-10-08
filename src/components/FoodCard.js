import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function FoodCard({ donation, onSelect }) {
  const { openDonationDetails, requestDonation } = useApp();

  const handlePress = () => {
    if (onSelect) {
      onSelect(donation);
    } else {
      openDonationDetails(donation);
    }
  };

  const isVeg = donation.isVeg !== undefined ? donation.isVeg : donation.foodType?.toLowerCase().includes('veg');

  return (
    <View style={styles.card}>
      {/* Food Image & Veg Badge */}
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={styles.imageContainer}>
        <Image
          source={{ uri: donation.image }}
          style={styles.foodImage}
          resizeMode="cover"
        />
        <View style={[styles.vegBadge, { backgroundColor: isVeg ? colors.vegBg : colors.nonVegBg }]}>
          <Ionicons
            name={isVeg ? 'leaf' : 'restaurant'}
            size={11}
            color={isVeg ? colors.veg : colors.nonVeg}
            style={{ marginRight: 3 }}
          />
          <Text style={[styles.vegBadgeText, { color: isVeg ? colors.veg : colors.nonVeg }]}>
            {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          </Text>
        </View>

        {donation.matchScore && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>{donation.matchScore}% Match</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Donor Name & Quantity */}
        <View style={styles.titleRow}>
          <Text style={styles.donorName} numberOfLines={1}>
            {donation.donorName}
          </Text>
        </View>

        {/* Distance & Marked Location */}
        <View style={styles.metaRow}>
          <Ionicons name="location-sharp" size={13} color={colors.primary} />
          <Text style={styles.metaText} numberOfLines={1}>
            {donation.pickupAddress || donation.distance} • {donation.timeAgo || donation.expiry}
          </Text>
        </View>

        {/* Food Items Description */}
        <Text style={styles.foodItems} numberOfLines={1}>
          {donation.foodType}
        </Text>

        {/* Servings & Cooked Time */}
        <View style={styles.timeRow}>
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
            <Text style={styles.timeText}>Cooked {donation.cookedTime || '11:30 AM'}</Text>
          </View>
          <Text style={styles.servingsText}>{donation.servings || 30} meals</Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.requestBtn}
          onPress={handlePress}
          activeOpacity={0.85}
        >
          <Text style={styles.requestBtnText}>Request Food</Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    minWidth: 240,
    flex: 1,
    ...shadows.sm,
  },
  imageContainer: {
    height: 140,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.bg,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  vegBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  vegBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  matchBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15, 76, 58, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  donorName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  foodItems: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  servingsText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  requestBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  requestBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
