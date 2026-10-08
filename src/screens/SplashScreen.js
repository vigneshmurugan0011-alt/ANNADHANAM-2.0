import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 2200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark, '#B33A0E']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.iconWrap}>
        <Ionicons name="restaurant" size={56} color="#fff" />
      </View>

      <Text style={styles.title}>ANNADHANAM</Text>
      <Text style={styles.version}>2.0</Text>
      <Text style={styles.tagline}>Save Good Food.{'\n'}Feed Someone in Need.</Text>

      <View style={styles.footer}>
        <View style={styles.dot} />
        <View style={[styles.dot, { opacity: 0.5 }]} />
        <View style={[styles.dot, { opacity: 0.3 }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  circle1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -80, right: -100,
  },
  circle2: {
    position: 'absolute', width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: -60, left: -80,
  },
  iconWrap: {
    width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 28,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  title: { fontSize: 36, fontWeight: '900', color: '#fff', letterSpacing: 4 },
  version: { fontSize: 16, fontWeight: '700', color: 'rgba(255,255,255,0.85)', letterSpacing: 6, marginBottom: 24, marginTop: 4 },
  tagline: { fontSize: 16, color: 'rgba(255,255,255,0.95)', textAlign: 'center', lineHeight: 24, fontWeight: '500' },
  footer: {
    position: 'absolute', bottom: 60,
    flexDirection: 'row', gap: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
});
