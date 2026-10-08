import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
  const { user, setUser, setIsChangePasswordModalOpen, logout } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      location,
    }));
    setIsEditing(false);
  };

  const isDonor = user?.roleType === 'donor';

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.profileWrapper}>
        {/* Top Hero Profile Banner */}
        <View style={styles.profileHeroCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={44} color="#FFFFFF" />
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.heroDetails}>
            <Text style={styles.heroName}>{user?.name}</Text>
            <Text style={styles.heroRole}>{user?.role}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.verifiedTag}>
                <Ionicons name="shield-checkmark" size={12} color={colors.success} />
                <Text style={styles.verifiedTagText}>
                  {user?.roleType === 'donor'
                    ? 'Verified Food Donor (OTP Auth)'
                    : user?.roleType === 'admin'
                    ? 'Platform Administrator'
                    : 'Verified Recipient Shelter'}
                </Text>
              </View>
              <View style={styles.locationTag}>
                <Ionicons name="location-outline" size={12} color="#FFFFFF" />
                <Text style={styles.locationTagText}>{user?.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons name={isEditing ? 'close' : 'create-outline'} size={16} color="#FFFFFF" />
              <Text style={styles.editBtnText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
            </TouchableOpacity>

            {!isDonor && (
              <TouchableOpacity
                style={styles.pwdBtn}
                onPress={() => setIsChangePasswordModalOpen(true)}
              >
                <Ionicons name="key-outline" size={16} color="#FFFFFF" />
                <Text style={styles.pwdBtnText}>Change Password</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Impact Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12.4 tons</Text>
            <Text style={styles.statLabel}>Total Food Rescued</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8,732</Text>
            <Text style={styles.statLabel}>Meals Served</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>432</Text>
            <Text style={styles.statLabel}>Safe Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.9 ★</Text>
            <Text style={styles.statLabel}>Community Rating</Text>
          </View>
        </View>

        {/* Profile Information / Edit Form */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeading}>Account Information</Text>
            <View style={styles.loginTypeTag}>
              <Ionicons
                name={isDonor ? 'call' : 'lock-closed'}
                size={12}
                color={colors.primary}
              />
              <Text style={styles.loginTypeTagText}>
                {isDonor ? 'Phone & OTP Authentication' : 'Email & Password Authentication'}
              </Text>
            </View>
          </View>

          <View style={styles.formGrid}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Full Name / Organization</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.name}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={email}
                  onChangeText={setEmail}
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.email || '—'}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={phone}
                  onChangeText={setPhone}
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.phone || '—'}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Registered City / Location</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={location}
                  onChangeText={setLocation}
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.location}</Text>
              )}
            </View>
          </View>

          {isEditing ? (
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Profile Changes</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.bottomActionRow}>
              {!isDonor && (
                <TouchableOpacity
                  style={styles.changePasswordInlineBtn}
                  onPress={() => setIsChangePasswordModalOpen(true)}
                >
                  <Ionicons name="key" size={16} color={colors.primary} />
                  <Text style={styles.changePasswordInlineText}>Change Account Password</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.logoutInlineBtn} onPress={logout}>
                <Ionicons name="log-out-outline" size={16} color={colors.danger} />
                <Text style={styles.logoutInlineText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}
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
  profileWrapper: {
    width: '100%',
    maxWidth: 800,
    gap: spacing.xl,
  },
  profileHeroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.lg,
    position: 'relative',
    ...shadows.md,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroDetails: {
    flex: 1,
    minWidth: 220,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  heroRole: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  locationTagText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  heroActions: {
    gap: 8,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pwdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  pwdBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.sm,
    marginBottom: spacing.lg,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  loginTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loginTypeTagText: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  formGrid: {
    gap: spacing.md,
  },
  formField: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingVertical: 4,
  },
  fieldInput: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  bottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  changePasswordInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  changePasswordInlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  logoutInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.dangerBg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  logoutInlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.danger,
  },
});
