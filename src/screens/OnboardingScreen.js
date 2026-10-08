import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius } from '../theme/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'restaurant-outline',
    title: 'Rescue Surplus Food',
    desc: 'After weddings, events or restaurant rush hours — don\'t let good food go to waste.',
    color: colors.primary,
  },
  {
    id: '2',
    icon: 'heart-outline',
    title: 'Connect with NGOs',
    desc: 'Nearby orphanages, shelters and community homes can claim your food in seconds.',
    color: colors.secondary,
  },
  {
    id: '3',
    icon: 'bicycle-outline',
    title: 'Deliver via Rapido / Porter',
    desc: 'Choose your favourite delivery partner to pick up and drop off the food.',
    color: colors.accent,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const onNext = () => {
    if (index < slides.length - 1) {
      ref.current.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      navigation.replace('RoleSelect');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={() => navigation.replace('RoleSelect')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.illustration, { backgroundColor: item.color + '15' }]}>
              <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={64} color="#fff" />
              </View>
              <View style={[styles.blob, { backgroundColor: item.color + '25' }]} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, { width: i === index ? 24 : 8, backgroundColor: i === index ? colors.primary : colors.border }]} />
          ))}
        </View>
        <PrimaryButton
          title={index === slides.length - 1 ? 'Get Started' : 'Next'}
          icon="arrow-forward"
          onPress={onNext}
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  skip: { position: 'absolute', top: 60, right: 24, zIndex: 10, padding: 8 },
  skipText: { color: colors.textSecondary, fontWeight: '600', fontSize: 14 },
  slide: { width, paddingHorizontal: 32, alignItems: 'center', paddingTop: 100 },
  illustration: {
    width: width * 0.72, height: width * 0.72, borderRadius: width * 0.36,
    alignItems: 'center', justifyContent: 'center', marginBottom: 40,
  },
  iconCircle: {
    width: 130, height: 130, borderRadius: 65,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 10,
  },
  blob: { position: 'absolute', width: 80, height: 80, borderRadius: 40, top: 30, right: 20 },
  title: { fontSize: 28, fontWeight: '800', color: colors.textPrimary, textAlign: 'center', marginBottom: 16, letterSpacing: -0.5 },
  desc: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 12 },
  footer: { padding: 24, paddingBottom: 32 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24, gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});
