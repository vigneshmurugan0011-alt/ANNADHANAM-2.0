import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function FoodDetailsModal() {
  const {
    selectedDonation,
    isDetailModalOpen,
    closeDonationDetails,
    requestDonation,
    user,
  } = useApp();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.location || 'Chennai');
  const [servingsNeeded, setServingsNeeded] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  if (!selectedDonation) return null;

  const isVeg = selectedDonation.isVeg !== undefined
    ? selectedDonation.isVeg
    : selectedDonation.foodType?.toLowerCase().includes('veg');

  const handleClaim = () => {
    requestDonation(selectedDonation, {
      deliveryAddress,
      servingsNeeded: servingsNeeded || selectedDonation.servings,
      specialNote,
    });
  };

  return (
    <Modal
      visible={isDetailModalOpen}
      animationType="fade"
      transparent
      onRequestClose={closeDonationDetails}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={closeDonationDetails}>
            <Ionicons name="close" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Food Image */}
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: selectedDonation.image }}
                style={styles.foodImage}
                resizeMode="cover"
              />
              <View style={[styles.vegBadge, { backgroundColor: isVeg ? colors.vegBg : colors.nonVegBg }]}>
                <Ionicons
                  name={isVeg ? 'leaf' : 'restaurant'}
                  size={12}
                  color={isVeg ? colors.veg : colors.nonVeg}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.vegBadgeText, { color: isVeg ? colors.veg : colors.nonVeg }]}>
                  {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </Text>
              </View>

              <View style={styles.matchBadge}>
                <Ionicons name="sparkles" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.matchBadgeText}>{selectedDonation.matchScore || 95}% High Match</Text>
              </View>
            </View>

            {/* Header info */}
            <View style={styles.headerInfo}>
              <Text style={styles.foodTitle}>{selectedDonation.foodType}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.donorName}>From {selectedDonation.donorName}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="location-sharp" size={13} color={colors.primary} />
                <Text style={styles.distanceText}>{selectedDonation.distance} away</Text>
              </View>
              <Text style={styles.quantityText}>
                {selectedDonation.quantity} • Serves {selectedDonation.servings} people
              </Text>
            </View>

            {/* Nutrition Breakdown */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Nutrition Information</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionVal}>{selectedDonation.nutrition?.calories || '450 kcal'}</Text>
                  <Text style={styles.nutritionLabel}>Calories / Meal</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionVal}>{selectedDonation.nutrition?.protein || '16g'}</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionVal}>{selectedDonation.nutrition?.carbs || '65g'}</Text>
                  <Text style={styles.nutritionLabel}>Carbohydrates</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionVal}>{selectedDonation.nutrition?.fiber || '7g'}</Text>
                  <Text style={styles.nutritionLabel}>Dietary Fiber</Text>
                </View>
              </View>
            </View>

            {/* Food Safety Status */}
            <View style={[styles.sectionCard, styles.safetyCard]}>
              <View style={styles.safetyHeader}>
                <Ionicons name="shield-checkmark" size={20} color={colors.success} />
                <Text style={styles.safetyTitle}>AI Safety Analysis: Verified Safe</Text>
              </View>
              <Text style={styles.safetyDesc}>
                Cooked at {selectedDonation.cookedTime || '11:30 AM'} • Safe to consume for {selectedDonation.expiry || '4 hours'}.
              </Text>
              <View style={styles.checklist}>
                {(selectedDonation.safetyChecks || [
                  'Cooked within 2 hours in certified kitchen',
                  'Stored in hygienic sealed containers',
                  'Temperature verification passed',
                ]).map((check, idx) => (
                  <View key={idx} style={styles.checkItem}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={styles.checkText}>{check}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Marked Donor Pickup Location & Live GPS Pin */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="location" size={18} color={colors.primary} />
                <Text style={styles.sectionTitle}>Marked Donor Pickup Location</Text>
              </View>

              {/* Map Preview Container */}
              <View style={styles.markedMapBox}>
                <View style={styles.mapGraphic}>
                  <View style={styles.mapGridLine1} />
                  <View style={styles.mapGridLine2} />
                  <View style={styles.mapRiver} />

                  {/* Marked Pin Marker */}
                  <View style={styles.pinCenter}>
                    <View style={styles.pinPulse} />
                    <View style={styles.pinBubble}>
                      <Ionicons name="location" size={24} color={colors.danger} />
                    </View>
                    <View style={styles.pinTag}>
                      <Text style={styles.pinTagText}>{selectedDonation.donorName}</Text>
                    </View>
                  </View>
                </View>

                {/* Location Meta Footer */}
                <View style={styles.mapMetaFooter}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.mapAddressTitle}>{selectedDonation.pickupAddress}</Text>
                    {selectedDonation.landmark && (
                      <Text style={styles.mapLandmarkText}>📍 Landmark: {selectedDonation.landmark}</Text>
                    )}
                    <Text style={styles.mapCoordsText}>
                      GPS: {selectedDonation.coordinates?.latitude || '13.0836'}° N, {selectedDonation.coordinates?.longitude || '80.2185'}° E • {selectedDonation.distance} away
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.openMapBtn}
                    onPress={() => {
                      const lat = selectedDonation.coordinates?.latitude || 13.0836;
                      const lng = selectedDonation.coordinates?.longitude || 80.2185;
                      if (typeof window !== 'undefined') {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
                      }
                    }}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="navigate" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                    <Text style={styles.openMapBtnText}>Directions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Notes */}
            {selectedDonation.notes && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Donor Notes</Text>
                <Text style={styles.notesText}>{selectedDonation.notes}</Text>
              </View>
            )}

            {/* Request Details Form */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Your Delivery Details</Text>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Drop-off Location / Shelter Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter destination address"
                  placeholderTextColor={colors.textMuted}
                  value={deliveryAddress}
                  onChangeText={setDeliveryAddress}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Special Instructions (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Call upon arrival at Gate 2"
                  placeholderTextColor={colors.textMuted}
                  value={specialNote}
                  onChangeText={setSpecialNote}
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Action */}
          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={closeDonationDetails}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptBtn} onPress={handleClaim} activeOpacity={0.85}>
              <Ionicons name="hand-right" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.acceptBtnText}>Accept & Request Food</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    width: '100%',
    maxWidth: 620,
    maxHeight: '90%',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.lg,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  scrollBody: {
    paddingBottom: 24,
  },
  imageWrap: {
    height: 220,
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
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  vegBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  matchBadge: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  headerInfo: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  donorName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dot: {
    color: colors.textMuted,
  },
  distanceText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accent,
  },
  sectionCard: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  nutritionItem: {
    flex: 1,
    minWidth: 100,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nutritionVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  nutritionLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  safetyCard: {
    backgroundColor: colors.primaryLightest,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  safetyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  safetyDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  checklist: {
    gap: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.bg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  locationSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  notesText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  formGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.md,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  acceptBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
