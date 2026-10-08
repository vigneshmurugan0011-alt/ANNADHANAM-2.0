import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows } from '../theme/theme';

const roles = [
  {
    id: 'donor',
    icon: 'gift-outline',
    title: 'I want to Donate Food',
    desc: 'Hotels, restaurants, event organizers, hosts',
    gradient: [colors.primary, colors.primaryDark],
  },
  {
    id: 'recipient',
    icon: 'heart-outline',
    title: 'I want to Receive Food',
    desc: 'Orphanages, NGOs, shelters, community homes',
    gradient: [colors.secondary, '#1B4332'],
  },
];

export default function RoleSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.subtitle}>Choose your role to get started</Text>
      </View>

      <View style={styles.body}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r.id}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Login', { role: r.id })}
            style={styles.cardWrap}
          >
            <LinearGradient colors={r.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
              <View style={styles.iconCircle}>
                <Ionicons name={r.icon} size={36} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{r.title}</Text>
              <Text style={styles.cardDesc}>{r.desc}</Text>
              <View style={styles.arrow}>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.note}>
        By continuing you agree to our Terms & Privacy Policy
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
  title: { fontSize: 32, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 8 },
  body: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', gap: 20, paddingBottom: 60 },
  cardWrap: { ...shadows.lg, borderRadius: radius.xl },
  card: {
    borderRadius: radius.xl, padding: 26, minHeight: 170, justifyContent: 'center',
  },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 6 },
  cardDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 19 },
  arrow: {
    position: 'absolute', right: 22, top: 26,
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  note: { textAlign: 'center', color: colors.textMuted, fontSize: 12, paddingBottom: 20, paddingHorizontal: 32 },
});
