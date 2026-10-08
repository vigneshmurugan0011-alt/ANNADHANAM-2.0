import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const { user, setIsChangePasswordModalOpen, logout } = useApp();
  const [pushNotif, setPushNotif] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [autoMatch, setAutoMatch] = useState(true);
  const [distanceRadius, setDistanceRadius] = useState('10 km');
  const [selectedLang, setSelectedLang] = useState('English');

  const languages = ['English', 'Tamil (தமிழ்)', 'Hindi (हिन्दी)', 'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)'];
  const distances = ['3 km', '5 km', '10 km', '25 km'];

  const isDonor = user?.roleType === 'donor';

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Platform Settings</Text>
          <Text style={styles.subtitle}>
            Customize notification channels, search radius, language preferences, and privacy controls.
          </Text>
        </View>

        {/* 1. Account & Password Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Account Security & Authentication</Text>
          </View>

          <View style={styles.authInfoBox}>
            <View style={styles.authInfoRow}>
              <Ionicons
                name={isDonor ? 'call' : 'mail'}
                size={18}
                color={colors.primary}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.authInfoTitle}>
                  {isDonor ? 'Food Donor Phone Authentication' : 'Email & Password Login'}
                </Text>
                <Text style={styles.authInfoSub}>
                  {isDonor
                    ? `Logged in via OTP to ${user?.phone || '+91 98765 43210'}`
                    : `Active user: ${user?.email || 'vignesh.m@annadhanam.org'}`}
                </Text>
              </View>
            </View>

            {!isDonor && (
              <TouchableOpacity
                style={styles.changePwdBtn}
                onPress={() => setIsChangePasswordModalOpen(true)}
              >
                <Ionicons name="key-outline" size={16} color={colors.primary} />
                <Text style={styles.changePwdBtnText}>Change Password</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 2. Notifications Preferences */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="notifications-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Notification Channels</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Surplus Food Push Notifications</Text>
              <Text style={styles.settingDesc}>Receive instant alerts when surplus food is posted in your vicinity.</Text>
            </View>
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Emergency Rescue Helpline Alerts</Text>
              <Text style={styles.settingDesc}>High priority notifications for bulk event/wedding food surplus expiring soon.</Text>
            </View>
            <Switch
              value={emergencyAlerts}
              onValueChange={setEmergencyAlerts}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>SMS Updates & OTPs</Text>
              <Text style={styles.settingDesc}>Receive SMS notifications for rider pickup and delivery OTP confirmations.</Text>
            </View>
            <Switch
              value={smsUpdates}
              onValueChange={setSmsUpdates}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        {/* 3. Location & Search Radius */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Location & Food Rescue Radius</Text>
          </View>

          <Text style={styles.settingDesc}>
            Set default distance threshold for food discovery and volunteer match recommendations:
          </Text>

          <View style={styles.optionsRow}>
            {distances.map((dist) => (
              <TouchableOpacity
                key={dist}
                style={[styles.optBtn, distanceRadius === dist && styles.optBtnActive]}
                onPress={() => setDistanceRadius(dist)}
              >
                <Text style={[styles.optText, distanceRadius === dist && styles.optTextActive]}>
                  {dist}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4. Language Selection */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="globe-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>App Language</Text>
          </View>

          <View style={styles.langList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langItem, selectedLang === lang && styles.langItemActive]}
                onPress={() => setSelectedLang(lang)}
              >
                <Text style={[styles.langText, selectedLang === lang && styles.langTextActive]}>
                  {lang}
                </Text>
                {selectedLang === lang && (
                  <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. Security & Transparency */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Security & Transparency</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>AI Smart Matching Algorithm</Text>
              <Text style={styles.settingDesc}>Allow automatic match-scoring based on shelter food preferences and dietary requirements.</Text>
            </View>
            <Switch
              value={autoMatch}
              onValueChange={setAutoMatch}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={styles.logoutBtnText}>Sign Out from Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 80,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: 800,
    gap: spacing.xl,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  authInfoBox: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  authInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authInfoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  authInfoSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  changePwdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingVertical: 9,
    borderRadius: radius.md,
  },
  changePwdBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 4,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  optBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  optBtnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  optTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  langList: {
    gap: 8,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLightest,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  langTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.dangerBg,
    paddingVertical: 12,
    borderRadius: radius.md,
    marginTop: 8,
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.danger,
  },
});
