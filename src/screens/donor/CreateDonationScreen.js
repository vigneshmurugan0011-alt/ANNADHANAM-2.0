import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import Header from '../../components/Header';
import { colors, spacing, radius } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

const foodCategories = [
  { id: 'cooked', label: 'Cooked Meals', icon: 'restaurant-outline' },
  { id: 'packed', label: 'Packed Food', icon: 'cube-outline' },
  { id: 'bakery', label: 'Bakery', icon: 'cafe-outline' },
  { id: 'fruits', label: 'Fruits', icon: 'nutrition-outline' },
  { id: 'groceries', label: 'Groceries', icon: 'basket-outline' },
];

export default function CreateDonationScreen({ navigation }) {
  const { addDonation, user, setActiveDonation } = useApp();
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [servings, setServings] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('cooked');
  const [expiry, setExpiry] = useState('4');

  const handleSubmit = () => {
    const d = addDonation({
      donorName: user?.name || 'Donor',
      foodType: foodType || 'Cooked Meals',
      quantity: quantity || '10 kg',
      servings: parseInt(servings, 10) || 30,
      pickupAddress: address || 'MG Road, Bengaluru',
      distance: '2.3 km',
      expiry: `${expiry} hours`,
      notes,
      category,
    });
    setActiveDonation(d);
    navigation.navigate('DonationSuccess', { donation: d });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="New Donation" showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>What are you donating?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, marginBottom: 24 }}>
            {foodCategories.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setCategory(c.id)}
                style={[styles.chip, category === c.id && styles.chipActive]}
                activeOpacity={0.85}
              >
                <Ionicons name={c.icon} size={20} color={category === c.id ? '#fff' : colors.textSecondary} />
                <Text style={[styles.chipText, category === c.id && { color: '#fff' }]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Input
            label="Food Description"
            placeholder="e.g. Veg Biryani, Curd Rice"
            icon="fast-food-outline"
            value={foodType}
            onChangeText={setFoodType}
          />

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input label="Quantity" placeholder="15 kg" icon="scale-outline" value={quantity} onChangeText={setQuantity} />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Servings" placeholder="60" icon="people-outline" keyboardType="numeric" value={servings} onChangeText={setServings} />
            </View>
          </View>

          <Input
            label="Pickup Address"
            placeholder="Where should the pickup happen?"
            icon="location-outline"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <Text style={styles.smallLabel}>Food is safe to consume for</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {['2', '4', '6', '8'].map((h) => (
              <TouchableOpacity
                key={h}
                onPress={() => setExpiry(h)}
                style={[styles.timeChip, expiry === h && styles.timeChipActive]}
              >
                <Text style={[styles.timeText, expiry === h && { color: '#fff' }]}>{h} hrs</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Special Notes (optional)"
            placeholder="e.g. Contains nuts, packed in boxes"
            icon="document-text-outline"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              Nearby NGOs will be notified instantly. You can choose a delivery partner after.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title="Post Donation"
            icon="checkmark-circle-outline"
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  smallLabel: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 10 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.pill,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  timeChip: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.md,
  },
  timeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeText: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  infoBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: colors.info + '10', padding: 14, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.info + '25',
  },
  infoText: { flex: 1, fontSize: 12, color: colors.info, lineHeight: 18 },
  footer: {
    padding: spacing.lg, backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
});
