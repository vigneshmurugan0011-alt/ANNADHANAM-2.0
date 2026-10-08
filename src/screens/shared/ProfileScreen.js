import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile' },
  { icon: 'location-outline', label: 'Manage Addresses' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'notifications-outline', label: 'Notification Settings' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & Security' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout, donations } = useApp();
  const isDonor = user?.role === 'donor';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.replace('Splash');
        },
      },
    ]);
  };

  const claimedCount = donations.filter((d) => d.status === 'claimed').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={isDonor ? [colors.primary, colors.primaryDark] : [colors.secondary, '#1B4332']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.avatarWrap}>
            <Ionicons name={isDonor ? 'business' : 'heart'} size={38} color={colors.primary} />
          </View>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.role}>{isDonor ? 'Food Donor' : 'Recipient Organisation'}</Text>
          <View style={styles.verified}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={styles.verifiedText}>Verified Account</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{isDonor ? donations.length : claimedCount}</Text>
            <Text style={styles.statLabel}>{isDonor ? 'Donations' : 'Claims'}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{donations.reduce((s, d) => s + (d.servings || 0), 0)}</Text>
            <Text style={styles.statLabel}>Meals Served</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{isDonor ? '4.9' : '4.7'}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((m, i) => (
            <TouchableOpacity key={m.label} style={[styles.menuItem, i < menuItems.length - 1 && styles.menuBorder]}>
              <View style={styles.menuIcon}>
                <Ionicons name={m.icon} size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>{m.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Annadhanam 2.0 • v2.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { paddingTop: 40, paddingBottom: 36, alignItems: 'center' },
  avatarWrap: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.35)',
  },
  name: { fontSize: 22, fontWeight: '800', color: '#fff' },
  role: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  verified: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: radius.pill, marginTop: 12,
  },
  verifiedText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', backgroundColor: colors.surface, marginHorizontal: spacing.lg,
    marginTop: -22, borderRadius: radius.lg, paddingVertical: 18,
    borderWidth: 1, borderColor: colors.border, ...shadows.md,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 4, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: colors.border },
  menu: {
    backgroundColor: colors.surface, marginHorizontal: spacing.lg, marginTop: spacing.xxl,
    borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: spacing.lg, marginTop: spacing.xxl, paddingVertical: 15,
    borderRadius: radius.lg, backgroundColor: colors.danger + '10',
    borderWidth: 1, borderColor: colors.danger + '30',
  },
  logoutText: { color: colors.danger, fontSize: 15, fontWeight: '700' },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: 11, marginTop: 24, fontWeight: '500' },
});
