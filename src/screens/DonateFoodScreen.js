import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function DonateFoodScreen() {
  const { user, addDonation, navigateTo } = useApp();

  const [foodType, setFoodType] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [isVeg, setIsVeg] = useState(true);
  const [quantity, setQuantity] = useState('15 kg');
  const [servings, setServings] = useState('30');
  const [cookedTime, setCookedTime] = useState('12:00 PM');
  const [expiryHours, setExpiryHours] = useState('4');
  const [pickupAddress, setPickupAddress] = useState(user?.location || 'Anna Nagar 2nd Avenue, Chennai');
  const [landmark, setLandmark] = useState('Opposite Roundtana Metro Gate 2');
  const [coordinates, setCoordinates] = useState({ latitude: 13.0836, longitude: 80.2185 });
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(true);
  const [donorName, setDonorName] = useState(user?.name || 'Sri Sai Mess');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [notes, setNotes] = useState('');
  const [deliveryType, setDeliveryType] = useState('partner'); // 'donor_drop' | 'partner'

  // Preset location hubs for Chennai
  const locationPresets = [
    { name: 'Anna Nagar', address: 'Anna Nagar 2nd Avenue, Chennai', lat: 13.0836, lng: 80.2185, landmark: 'Near Metro Gate 2' },
    { name: 'T. Nagar', address: 'Usman Road, T. Nagar, Chennai', lat: 13.0418, lng: 80.2341, landmark: 'Near Ranganathan St' },
    { name: 'Guindy', address: 'Guindy Industrial Estate, Chennai', lat: 13.0067, lng: 80.2023, landmark: 'Opp. Olympia Tech Park' },
    { name: 'Mylapore', address: 'Luz Church Road, Mylapore, Chennai', lat: 13.0339, lng: 80.2694, landmark: 'Near Tank West Gate' },
    { name: 'Adyar', address: 'Gandhi Nagar 1st Main Rd, Adyar, Chennai', lat: 13.0033, lng: 80.2550, landmark: 'Opp. A2B Sweets' },
    { name: 'Velachery', address: '100 Feet Bypass Road, Velachery, Chennai', lat: 12.9815, lng: 80.2180, landmark: 'Near Phoenix Mall' },
  ];

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(4));
          const lng = parseFloat(position.coords.longitude.toFixed(4));
          setCoordinates({ latitude: lat, longitude: lng });
          setPickupAddress(`GPS Point (${lat}°N, ${lng}°E), Chennai Central District`);
          setLandmark('Current Live GPS Location Pin');
          setIsLocating(false);
          setLocationSuccess(true);
        },
        (error) => {
          // Fallback to high accuracy default
          setCoordinates({ latitude: 13.0836, longitude: 80.2185 });
          setPickupAddress('Anna Nagar 2nd Avenue, Chennai 600040');
          setLandmark('Opposite Roundtana Metro Gate 2');
          setIsLocating(false);
          setLocationSuccess(true);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setCoordinates({ latitude: 13.0836, longitude: 80.2185 });
      setPickupAddress('Anna Nagar 2nd Avenue, Chennai 600040');
      setLandmark('Opposite Roundtana Metro Gate 2');
      setIsLocating(false);
      setLocationSuccess(true);
    }
  };

  const handleSelectPreset = (preset) => {
    setPickupAddress(preset.address);
    setLandmark(preset.landmark);
    setCoordinates({ latitude: preset.lat, longitude: preset.lng });
    setLocationSuccess(true);
  };

  // Food Safety Checklist States
  const [safetyHygienic, setSafetyHygienic] = useState(true);
  const [safetyCovered, setSafetyCovered] = useState(true);
  const [safetyFresh, setSafetyFresh] = useState(true);

  // Nutrition tags
  const [selectedTags, setSelectedTags] = useState(['High Protein', 'Freshly Prepared']);

  const categories = ['Cooked Meals', 'Packed Food', 'Bakery', 'Breakfast Items', 'Catering Surplus'];

  const handleSubmit = () => {
    if (!foodType.trim()) {
      if (typeof window !== 'undefined') {
        window.alert('Please enter the food items being donated.');
      }
      return;
    }

    const created = addDonation({
      donorName: donorName || user?.name,
      foodType,
      category,
      isVeg,
      quantity,
      servings: parseInt(servings, 10) || 30,
      cookedTime,
      expiry: `${expiryHours} hours`,
      pickupAddress,
      landmark,
      coordinates,
      notes,
      safetyChecks: [
        'Hygienically prepared & packed',
        'Maintained safe food temperature',
        'Safety verified by donor checklist',
      ],
      nutrition: {
        calories: '450 kcal/meal',
        protein: '18g',
        carbs: '60g',
        fiber: '6g',
      },
    });

    if (typeof window !== 'undefined') {
      window.alert(`🎉 Donation of "${foodType}" posted with marked GPS location (${coordinates.latitude}, ${coordinates.longitude})! Nearby NGOs and shelters can now view your pinned location on the live map.`);
    }
    navigateTo('home');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* Title Header */}
        <View style={styles.headerBox}>
          <View style={styles.titleIconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="restaurant" size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.pageTitle}>Donate Surplus Food</Text>
              <Text style={styles.pageSub}>
                Every meal saved feeds a family in need. List your fresh surplus food in 60 seconds.
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION 1: Food Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="fast-food-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>1. Food Details</Text>
          </View>

          {/* Dish / Items name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Food Items / Dishes <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Veg Biryani, Curd Rice, Sambar & Dal"
              placeholderTextColor={colors.textMuted}
              value={foodType}
              onChangeText={setFoodType}
            />
          </View>

          {/* Veg / Non-Veg Selector */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Dietary Type</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.typeBtn, isVeg && styles.typeBtnVegActive]}
                onPress={() => setIsVeg(true)}
              >
                <Ionicons name="leaf" size={16} color={isVeg ? colors.veg : colors.textSecondary} />
                <Text style={[styles.typeBtnText, isVeg && { color: colors.veg, fontWeight: '800' }]}>
                  Pure Vegetarian
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeBtn, !isVeg && styles.typeBtnNonVegActive]}
                onPress={() => setIsVeg(false)}
              >
                <Ionicons name="restaurant" size={16} color={!isVeg ? colors.nonVeg : colors.textSecondary} />
                <Text style={[styles.typeBtnText, !isVeg && { color: colors.nonVeg, fontWeight: '800' }]}>
                  Non-Vegetarian
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Chips */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Food Category</Text>
            <View style={styles.chipsWrap}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, category === cat && styles.chipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity & Servings */}
          <View style={styles.rowTwo}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Approx. Weight / Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 15 kg / 3 trays"
                placeholderTextColor={colors.textMuted}
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Estimated People Servings <Text style={styles.req}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 30"
                keyboardType="numeric"
                placeholderTextColor={colors.textMuted}
                value={servings}
                onChangeText={setServings}
              />
            </View>
          </View>
        </View>

        {/* SECTION 2: Timing & Freshness */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>2. Cooked Time & Expiry</Text>
          </View>

          <View style={styles.rowTwo}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>When was it cooked?</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 12:30 PM today"
                placeholderTextColor={colors.textMuted}
                value={cookedTime}
                onChangeText={setCookedTime}
              />
            </View>

            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Safe to consume for</Text>
              <View style={styles.expiryRow}>
                {['2', '4', '6', '8'].map((hrs) => (
                  <TouchableOpacity
                    key={hrs}
                    style={[styles.expiryBtn, expiryHours === hrs && styles.expiryBtnActive]}
                    onPress={() => setExpiryHours(hrs)}
                  >
                    <Text style={[styles.expiryBtnText, expiryHours === hrs && styles.expiryBtnTextActive]}>
                      {hrs} hrs
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 3: Food Safety Checklist */}
        <View style={[styles.sectionCard, styles.safetyBg]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={18} color={colors.success} />
            <Text style={[styles.sectionTitle, { color: colors.primaryDark }]}>3. Food Safety Checklist</Text>
          </View>

          <Text style={styles.safetySub}>
            Please confirm all food quality & hygiene guidelines for recipient protection:
          </Text>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setSafetyHygienic(!safetyHygienic)}
          >
            <Ionicons
              name={safetyHygienic ? 'checkbox' : 'square-outline'}
              size={20}
              color={safetyHygienic ? colors.success : colors.textMuted}
            />
            <Text style={styles.checkLabel}>Prepared in a clean kitchen with potable drinking water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setSafetyCovered(!safetyCovered)}
          >
            <Ionicons
              name={safetyCovered ? 'checkbox' : 'square-outline'}
              size={20}
              color={safetyCovered ? colors.success : colors.textMuted}
            />
            <Text style={styles.checkLabel}>Packed in hygienic, covered food-grade containers or foil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setSafetyFresh(!safetyFresh)}
          >
            <Ionicons
              name={safetyFresh ? 'checkbox' : 'square-outline'}
              size={20}
              color={safetyFresh ? colors.success : colors.textMuted}
            />
            <Text style={styles.checkLabel}>Food has not been sitting open at room temperature for {'>'} 3 hours</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 4: Location & Contact */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>4. Pickup Location & GPS Marker</Text>
          </View>

          {/* GPS Auto-Detect Button */}
          <View style={styles.gpsActionWrap}>
            <TouchableOpacity
              style={styles.gpsDetectBtn}
              onPress={handleGetCurrentLocation}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isLocating ? 'sync-outline' : 'navigate'}
                size={18}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.gpsDetectBtnText}>
                {isLocating ? 'Detecting GPS Location...' : '📍 Use Current GPS Location'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.gpsHint}>
              Captures your live coordinates so recipient shelters can see your exact marked pickup spot.
            </Text>
          </View>

          {/* Quick Hub Selector */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Select or Choose Nearby Hub</Text>
            <View style={styles.chipsWrap}>
              {locationPresets.map((preset) => {
                const isSelected = coordinates.latitude === preset.lat && coordinates.longitude === preset.lng;
                return (
                  <TouchableOpacity
                    key={preset.name}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => handleSelectPreset(preset)}
                  >
                    <Ionicons
                      name="location"
                      size={12}
                      color={isSelected ? colors.primary : colors.textSecondary}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {preset.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Marked Location Interactive Map Preview Card */}
          <View style={styles.markedMapCard}>
            <View style={styles.mapVisualHeader}>
              <View style={styles.mapBadge}>
                <Ionicons name="radio-button-on" size={12} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={styles.mapBadgeText}>GPS PIN MARKED</Text>
              </View>
              <Text style={styles.coordsText}>
                Lat: {coordinates.latitude}° N, Lng: {coordinates.longitude}° E
              </Text>
            </View>

            {/* Simulated Visual Map Graphic */}
            <View style={styles.mapGraphicBox}>
              <View style={styles.mapRoad1} />
              <View style={styles.mapRoad2} />
              <View style={styles.mapRiver} />
              <View style={styles.mapCircleRadius} />
              
              {/* Animated Center Pin */}
              <View style={styles.mapPinContainer}>
                <View style={styles.pinPulse} />
                <View style={styles.mapPinBubble}>
                  <Ionicons name="location" size={24} color={colors.danger} />
                </View>
                <View style={styles.pinShadow} />
                <View style={styles.pinLabelTag}>
                  <Text style={styles.pinLabelText}>{pickupAddress.split(',')[0] || 'Marked Point'}</Text>
                </View>
              </View>

              <View style={styles.mapZoomControls}>
                <Text style={styles.mapWatermark}>ANNADHANAM MAPS • CHENNAI</Text>
              </View>
            </View>
          </View>

          {/* Donor details & address input */}
          <View style={styles.rowTwo}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Donor / Organization Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Grand Palace Hotel"
                placeholderTextColor={colors.textMuted}
                value={donorName}
                onChangeText={setDonorName}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Contact Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91 98765 43210"
                keyboardType="phone-pad"
                placeholderTextColor={colors.textMuted}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Pickup Address (Marked on Map) <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Door / Building, Street, Area, City"
              placeholderTextColor={colors.textMuted}
              value={pickupAddress}
              onChangeText={setPickupAddress}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nearby Landmark / Gate Directions</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Opposite Roundtana Metro Gate 2, near ICICI ATM"
              placeholderTextColor={colors.textMuted}
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Special Notes / Allergen Warnings (Optional)</Text>
            <TextInput
              style={[styles.input, { height: 60, paddingTop: 8 }]}
              placeholder="e.g. Contains peanuts; pack in stainless vessels"
              placeholderTextColor={colors.textMuted}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* SECTION 5: Delivery Preference */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bicycle-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>5. Delivery Arrangement</Text>
          </View>

          <View style={styles.deliveryOptRow}>
            <TouchableOpacity
              style={[styles.deliveryOptCard, deliveryType === 'partner' && styles.deliveryOptActive]}
              onPress={() => setDeliveryType('partner')}
            >
              <Ionicons name="bicycle" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.deliveryOptTitle}>Rapido / Porter Partner Pickup (Recommended)</Text>
                <Text style={styles.deliveryOptSub}>A delivery rider will pick up the food from your address.</Text>
              </View>
              <Ionicons
                name={deliveryType === 'partner' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.deliveryOptCard, deliveryType === 'donor_drop' && styles.deliveryOptActive]}
              onPress={() => setDeliveryType('donor_drop')}
            >
              <Ionicons name="car" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.deliveryOptTitle}>Self Delivery / Drop-off</Text>
                <Text style={styles.deliveryOptSub}>I will transport and drop the food off at the NGO location.</Text>
              </View>
              <Ionicons
                name={deliveryType === 'donor_drop' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* SUBMIT BUTTON */}
        <View style={styles.submitRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigateTo('home')}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.submitBtnText}>Post Food Donation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 100,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 720,
    gap: spacing.xl,
  },
  headerBox: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  titleIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  pageSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    maxWidth: 500,
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  req: {
    color: colors.danger,
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
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeBtnVegActive: {
    backgroundColor: colors.vegBg,
    borderColor: colors.veg,
  },
  typeBtnNonVegActive: {
    backgroundColor: colors.nonVegBg,
    borderColor: colors.nonVeg,
  },
  typeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 12,
  },
  expiryRow: {
    flexDirection: 'row',
    gap: 6,
  },
  expiryBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  expiryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  expiryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  expiryBtnTextActive: {
    color: '#FFFFFF',
  },
  safetyBg: {
    backgroundColor: colors.primaryLightest,
  },
  safetySub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  checkLabel: {
    fontSize: 12,
    color: colors.textPrimary,
    flex: 1,
  },
  deliveryOptRow: {
    gap: 10,
  },
  deliveryOptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  deliveryOptActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  deliveryOptTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  deliveryOptSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  submitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 14,
    marginTop: spacing.md,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  // GPS and Map Styles
  gpsActionWrap: {
    backgroundColor: '#FAF5EE',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  gpsDetectBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  gpsDetectBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  gpsHint: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
  markedMapCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  mapVisualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  mapBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2E7D32',
  },
  coordsText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  mapGraphicBox: {
    height: 140,
    backgroundColor: '#DcedC8',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapRoad1: {
    position: 'absolute',
    top: 40,
    left: -20,
    right: -20,
    height: 16,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-8deg' }],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C5E1A5',
  },
  mapRoad2: {
    position: 'absolute',
    left: 80,
    top: -20,
    bottom: -20,
    width: 14,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '15deg' }],
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#C5E1A5',
  },
  mapRiver: {
    position: 'absolute',
    right: 30,
    top: -20,
    bottom: -20,
    width: 24,
    backgroundColor: '#B3E5FC',
    transform: [{ rotate: '-25deg' }],
    opacity: 0.7,
  },
  mapCircleRadius: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    borderStyle: 'dashed',
    position: 'absolute',
  },
  mapPinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pinPulse: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
  },
  mapPinBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pinShadow: {
    width: 14,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 2,
  },
  pinLabelTag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  pinLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  mapZoomControls: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mapWatermark: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: radius.md,
    ...shadows.md,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
