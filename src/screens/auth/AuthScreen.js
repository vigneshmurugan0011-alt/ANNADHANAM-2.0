import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

export default function AuthScreen() {
  const { loginAsDonor, loginAsRecipient, loginAsAdmin } = useApp();

  // Active role tab: 'donor' | 'recipient' | 'admin'
  const [activeTab, setActiveTab] = useState('donor');

  // Food Donor State (Phone + OTP)
  const [donorPhone, setDonorPhone] = useState('9876543210');
  const [donorName, setDonorName] = useState('Sri Sai Mess & Catering');
  const [donorAddress, setDonorAddress] = useState('Anna Nagar, Chennai');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [donorError, setDonorError] = useState('');

  // Recipient State (Email + Password)
  const [recipientIsSignup, setRecipientIsSignup] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('vignesh.m@annadhanam.org');
  const [recipientPassword, setRecipientPassword] = useState('password123');
  const [recipientOrgName, setRecipientOrgName] = useState('Hope & Care Children Home');
  const [recipientAddress, setRecipientAddress] = useState('Guindy, Chennai');
  const [showRecipientPassword, setShowRecipientPassword] = useState(false);
  const [recipientError, setRecipientError] = useState('');

  // Admin State (Email + Password)
  const [adminEmail, setAdminEmail] = useState('admin@annadhanam.org');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Donor OTP handlers
  const handleSendDonorOtp = () => {
    if (!donorPhone || donorPhone.length < 10) {
      setDonorError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedOtp(generated);
    setOtpSent(true);
    setDonorError('');
    setOtpValue(generated); // Pre-filled for effortless testing
  };

  const handleVerifyDonorOtp = () => {
    if (!otpValue || otpValue.trim() === '') {
      setDonorError('Please enter the OTP received.');
      return;
    }
    loginAsDonor({
      phone: `+91 ${donorPhone}`,
      name: donorName,
      address: donorAddress,
    });
  };

  // Recipient Login / Signup handler
  const handleRecipientSubmit = () => {
    if (!recipientEmail || !recipientPassword) {
      setRecipientError('Please fill in both email and password.');
      return;
    }
    loginAsRecipient({
      email: recipientEmail,
      password: recipientPassword,
      name: recipientOrgName,
      address: recipientAddress,
    });
  };

  // Admin Login handler
  const handleAdminSubmit = () => {
    if (!adminEmail || !adminPassword) {
      setAdminError('Please fill in admin email and password.');
      return;
    }
    if (adminPassword !== 'admin123' && adminPassword !== 'admin') {
      setAdminError('Invalid admin password. (Demo password is: admin123)');
      return;
    }
    loginAsAdmin({
      email: adminEmail,
      password: adminPassword,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.authWrapper}>
        {/* Brand Header */}
        <View style={styles.logoHeader}>
          <View style={styles.bowlWrap}>
            <Ionicons name="leaf" size={14} color="#F9C74F" style={styles.leafIcon} />
            <Ionicons name="nutrition" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.logoTitle}>ANNADHANAM</Text>
            <Text style={styles.logoVersion}>2.0</Text>
          </View>
          <Text style={styles.tagline}>Save Food • Feed People • Build a Better Tomorrow</Text>
        </View>

        {/* 3-Role Tab Switcher */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.roleTab, activeTab === 'donor' && styles.roleTabActive]}
            onPress={() => setActiveTab('donor')}
            activeOpacity={0.85}
          >
            <Ionicons
              name="restaurant"
              size={18}
              color={activeTab === 'donor' ? '#FFFFFF' : colors.primary}
            />
            <Text style={[styles.roleTabText, activeTab === 'donor' && styles.roleTabTextActive]}>
              Food Donor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleTab, activeTab === 'recipient' && styles.roleTabActive]}
            onPress={() => setActiveTab('recipient')}
            activeOpacity={0.85}
          >
            <Ionicons
              name="heart"
              size={18}
              color={activeTab === 'recipient' ? '#FFFFFF' : colors.primary}
            />
            <Text style={[styles.roleTabText, activeTab === 'recipient' && styles.roleTabTextActive]}>
              Recipient (NGO)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleTab, activeTab === 'admin' && styles.roleTabActive]}
            onPress={() => setActiveTab('admin')}
            activeOpacity={0.85}
          >
            <Ionicons
              name="shield-checkmark"
              size={18}
              color={activeTab === 'admin' ? '#FFFFFF' : colors.primary}
            />
            <Text style={[styles.roleTabText, activeTab === 'admin' && styles.roleTabTextActive]}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAB 1: FOOD DONOR (PHONE + OTP LOGIN) */}
        {activeTab === 'donor' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.badgePill}>
                <Ionicons name="call" size={14} color={colors.primary} />
                <Text style={styles.badgePillText}>PHONE & OTP LOGIN</Text>
              </View>
              <Text style={styles.formTitle}>Food Donor Sign In</Text>
              <Text style={styles.formSub}>
                For restaurants, wedding halls, caterers, and food businesses. Fast passwordless login via mobile OTP.
              </Text>
            </View>

            {donorError ? <Text style={styles.errorText}>{donorError}</Text> : null}

            {!otpSent ? (
              <View style={styles.formFields}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Restaurant / Organization Name</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="business-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Sri Sai Mess & Caterers"
                      placeholderTextColor={colors.textMuted}
                      value={donorName}
                      onChangeText={setDonorName}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile Phone Number</Text>
                  <View style={styles.inputWrap}>
                    <Text style={styles.phonePrefix}>+91</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 10-digit phone number"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={donorPhone}
                      onChangeText={setDonorPhone}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>City / Pickup Address</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="location-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Anna Nagar, Chennai"
                      placeholderTextColor={colors.textMuted}
                      value={donorAddress}
                      onChangeText={setDonorAddress}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={handleSendDonorOtp}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Send OTP Code →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formFields}>
                {/* Simulated OTP Notification Banner */}
                <View style={styles.otpBanner}>
                  <Ionicons name="chatbox-ellipses" size={20} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.otpBannerTitle}>Simulated SMS Received</Text>
                    <Text style={styles.otpBannerCode}>
                      Your OTP is: <Text style={{ fontWeight: '900', color: colors.primary }}>{simulatedOtp || '1234'}</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Enter 4-Digit OTP sent to +91 {donorPhone}</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="key-outline" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                    <TextInput
                      style={[styles.input, { letterSpacing: 4, fontWeight: '800', fontSize: 16 }]}
                      placeholder="Enter OTP"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="numeric"
                      value={otpValue}
                      onChangeText={setOtpValue}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={handleVerifyDonorOtp}
                  activeOpacity={0.85}
                >
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryBtnText}>Verify OTP & Enter as Donor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.changePhoneBtn}
                  onPress={() => setOtpSent(false)}
                >
                  <Text style={styles.changePhoneText}>← Edit Phone Number</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* TAB 2: RECIPIENT (EMAIL + PASSWORD LOGIN) */}
        {activeTab === 'recipient' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.badgePill, { backgroundColor: colors.metricOrange }]}>
                <Ionicons name="mail" size={14} color="#E65100" />
                <Text style={[styles.badgePillText, { color: '#E65100' }]}>EMAIL & PASSWORD LOGIN</Text>
              </View>
              <Text style={styles.formTitle}>
                {recipientIsSignup ? 'Register New Recipient Shelter / NGO' : 'Recipient Shelter & NGO Sign In'}
              </Text>
              <Text style={styles.formSub}>
                For orphanages, elderly shelters, community centers, and registered charity trusts to request food.
              </Text>
            </View>

            {recipientError ? <Text style={styles.errorText}>{recipientError}</Text> : null}

            <View style={styles.formFields}>
              {recipientIsSignup && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Shelter / NGO Name</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="business-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Hope Foundation Child Care"
                      placeholderTextColor={colors.textMuted}
                      value={recipientOrgName}
                      onChangeText={setRecipientOrgName}
                    />
                  </View>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Registered Email Address</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. contact@shelter.org"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={recipientEmail}
                    onChangeText={setRecipientEmail}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showRecipientPassword}
                    value={recipientPassword}
                    onChangeText={setRecipientPassword}
                  />
                  <TouchableOpacity onPress={() => setShowRecipientPassword(!showRecipientPassword)}>
                    <Ionicons
                      name={showRecipientPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {recipientIsSignup && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Shelter Delivery Address & City</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="location-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Guindy, Chennai"
                      placeholderTextColor={colors.textMuted}
                      value={recipientAddress}
                      onChangeText={setRecipientAddress}
                    />
                  </View>
                </View>
              )}

              <View style={styles.hintBox}>
                <Ionicons name="information-circle" size={16} color={colors.primary} />
                <Text style={styles.hintText}>
                  Tip: You can change your recipient account password anytime later in Profile & Settings.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleRecipientSubmit}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>
                  {recipientIsSignup ? 'Register & Access Food Catalog →' : 'Sign In as Recipient →'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchAuthModeBtn}
                onPress={() => setRecipientIsSignup(!recipientIsSignup)}
              >
                <Text style={styles.switchAuthModeText}>
                  {recipientIsSignup
                    ? 'Already registered? Sign In with Email & Password'
                    : 'New Shelter / NGO? Register Your Organization Here'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 3: PLATFORM ADMIN (EMAIL + PASSWORD LOGIN) */}
        {activeTab === 'admin' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.badgePill, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
                <Text style={[styles.badgePillText, { color: colors.primary }]}>ADMIN MASTER ACCESS</Text>
              </View>
              <Text style={styles.formTitle}>Platform Administrator Sign In</Text>
              <Text style={styles.formSub}>
                Authorized access to live food rescue dispatch, shelter verifications, and logistics audits.
              </Text>
            </View>

            {adminError ? <Text style={styles.errorText}>{adminError}</Text> : null}

            <View style={styles.formFields}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Admin Master Email</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="admin@annadhanam.org"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="none"
                    value={adminEmail}
                    onChangeText={setAdminEmail}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Admin Password</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter admin password"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showAdminPassword}
                    value={adminPassword}
                    onChangeText={setAdminPassword}
                  />
                  <TouchableOpacity onPress={() => setShowAdminPassword(!showAdminPassword)}>
                    <Ionicons
                      name={showAdminPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.demoCredentialsBox}>
                <Ionicons name="key" size={16} color="#E65100" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.demoCredTitle}>Demo Admin Credentials:</Text>
                  <Text style={styles.demoCredText}>
                    Email: <Text style={{ fontWeight: '700' }}>admin@annadhanam.org</Text> | Password: <Text style={{ fontWeight: '700' }}>admin123</Text>
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleAdminSubmit}
                activeOpacity={0.85}
              >
                <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.primaryBtnText}>Sign In to Admin Portal →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: colors.bg,
    minHeight: '100%',
  },
  authWrapper: {
    width: '100%',
    maxWidth: 540,
    gap: spacing.lg,
  },
  logoHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bowlWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  leafIcon: {
    position: 'absolute',
    top: -4,
    right: -2,
    zIndex: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  logoVersion: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.accent,
  },
  tagline: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 6,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
    ...shadows.sm,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.lg,
  },
  roleTabActive: {
    backgroundColor: colors.primary,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  roleTabTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  cardHeader: {
    marginBottom: spacing.lg,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  formSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 17,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    backgroundColor: colors.dangerBg,
    padding: 8,
    borderRadius: radius.sm,
  },
  formFields: {
    gap: spacing.md,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  phonePrefix: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radius.md,
    marginTop: 8,
    ...shadows.sm,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  otpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primaryLightest,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  otpBannerTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  otpBannerCode: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  changePhoneBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  changePhoneText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryLightest,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hintText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '500',
    flex: 1,
    lineHeight: 15,
  },
  demoCredentialsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.metricOrange,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(230,81,0,0.15)',
  },
  demoCredTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E65100',
  },
  demoCredText: {
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: 2,
  },
  switchAuthModeBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchAuthModeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
