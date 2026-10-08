import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function AppHeader() {
  const {
    user,
    activeTab,
    navigateTo,
    searchQuery,
    setSearchQuery,
    unreadCount,
    sidebarOpen,
    setSidebarOpen,
    loginAsDonor,
    loginAsRecipient,
    loginAsAdmin,
    setIsChangePasswordModalOpen,
    logout,
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const getRoleBadgeStyle = (roleType) => {
    switch (roleType) {
      case 'admin':
        return { bg: colors.primary, text: '#FFFFFF', icon: 'shield-checkmark' };
      case 'donor':
        return { bg: colors.metricGreen, text: '#2E7D32', icon: 'restaurant' };
      case 'recipient':
      default:
        return { bg: colors.metricOrange, text: '#E65100', icon: 'heart' };
    }
  };

  const roleStyle = getRoleBadgeStyle(user?.roleType);

  return (
    <View style={styles.headerContainer}>
      {/* Left: Mobile Menu Toggle & Logo + Tagline */}
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.mobileMenuBtn}
          onPress={() => setSidebarOpen(!sidebarOpen)}
          accessibilityLabel="Toggle Menu"
        >
          <Ionicons name={sidebarOpen ? 'close' : 'menu'} size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoRow}
          onPress={() => navigateTo('home')}
          activeOpacity={0.8}
        >
          {/* Green Leaf Bowl Logo */}
          <View style={styles.logoIconWrap}>
            <Ionicons name="leaf" size={14} color="#F9C74F" style={styles.leafIcon} />
            <View style={styles.bowlWrap}>
              <Ionicons name="nutrition" size={20} color="#FFFFFF" />
            </View>
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.logoTitle}>ANNADHANAM</Text>
              <Text style={styles.logoVersion}>2.0</Text>
            </View>
            <Text style={styles.logoTagline}>Save Food • Feed People • Build a Better Tomorrow</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Center: Search Bar */}
      <View style={styles.centerSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, location or donor..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Right: Notifications & User Profile */}
      <View style={styles.rightSection}>
        {/* Notification Bell with Badge */}
        <TouchableOpacity
          style={[styles.iconButton, activeTab === 'notifications' && styles.iconButtonActive]}
          onPress={() => navigateTo('notifications')}
        >
          <Ionicons
            name={activeTab === 'notifications' ? 'notifications' : 'notifications-outline'}
            size={22}
            color={colors.primary}
          />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* User Profile Card / Dropdown */}
        {user ? (
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => setShowProfileMenu(!showProfileMenu)}
            activeOpacity={0.8}
          >
            <View style={[styles.avatarWrap, { backgroundColor: colors.primary }]}>
              <Ionicons name={roleStyle.icon} size={16} color="#FFFFFF" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={[styles.userRole, { color: roleStyle.text }]}>{user.role}</Text>
            </View>
            <Ionicons
              name={showProfileMenu ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigateTo('auth')}
          >
            <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
            <Text style={styles.loginBtnText}>Sign In / Login</Text>
          </TouchableOpacity>
        )}

        {/* Profile Dropdown Menu */}
        {showProfileMenu && user && (
          <View style={styles.dropdownMenu}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderName}>{user.name}</Text>
              <Text style={styles.dropdownHeaderEmail}>{user.email || user.phone}</Text>
              <View style={[styles.roleBadgeHeader, { backgroundColor: roleStyle.bg }]}>
                <Text style={[styles.roleBadgeHeaderText, { color: roleStyle.text }]}>
                  {user.role} ({user.roleType === 'donor' ? 'Phone + OTP' : 'Email + Pass'})
                </Text>
              </View>
            </View>

            <View style={styles.dropdownDivider} />

            <Text style={styles.dropdownSectionLabel}>SWITCH LOGIN ROLE</Text>

            {/* Donor */}
            <TouchableOpacity
              style={[styles.dropdownItem, user.roleType === 'donor' && styles.dropdownItemActive]}
              onPress={() => {
                loginAsDonor({ phone: '+91 98765 43210', name: 'Sri Sai Mess & Caterers' });
                setShowProfileMenu(false);
              }}
            >
              <Ionicons name="restaurant-outline" size={16} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.dropdownItemText}>Food Donor</Text>
                <Text style={styles.dropdownItemSub}>Phone Number + OTP</Text>
              </View>
            </TouchableOpacity>

            {/* Recipient */}
            <TouchableOpacity
              style={[styles.dropdownItem, user.roleType === 'recipient' && styles.dropdownItemActive]}
              onPress={() => {
                loginAsRecipient({ email: 'vignesh.m@annadhanam.org', name: 'Hope Children Shelter' });
                setShowProfileMenu(false);
              }}
            >
              <Ionicons name="heart-outline" size={16} color="#E65100" />
              <View style={{ flex: 1 }}>
                <Text style={styles.dropdownItemText}>NGO / Recipient</Text>
                <Text style={styles.dropdownItemSub}>Email + Password</Text>
              </View>
            </TouchableOpacity>

            {/* Admin */}
            <TouchableOpacity
              style={[styles.dropdownItem, user.roleType === 'admin' && styles.dropdownItemActive]}
              onPress={() => {
                loginAsAdmin({ email: 'admin@annadhanam.org' });
                setShowProfileMenu(false);
              }}
            >
              <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.dropdownItemText}>Platform Admin</Text>
                <Text style={styles.dropdownItemSub}>Admin Portal Access</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            {/* Change Password option for Recipient & Admin */}
            {user.roleType !== 'donor' && (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  setIsChangePasswordModalOpen(true);
                }}
              >
                <Ionicons name="key-outline" size={16} color={colors.primary} />
                <Text style={styles.dropdownItemText}>Change Password</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowProfileMenu(false);
                navigateTo(user.roleType === 'admin' ? 'admin-dashboard' : 'profile');
              }}
            >
              <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.dropdownItemText}>
                {user.roleType === 'admin' ? 'Admin Dashboard' : 'My Profile'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowProfileMenu(false);
                navigateTo('settings');
              }}
            >
              <Ionicons name="settings-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.dropdownItemText}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            {/* Logout */}
            <TouchableOpacity
              style={[styles.dropdownItem, { backgroundColor: colors.dangerBg }]}
              onPress={() => {
                setShowProfileMenu(false);
                logout();
              }}
            >
              <Ionicons name="log-out-outline" size={16} color={colors.danger} />
              <Text style={[styles.dropdownItemText, { color: colors.danger }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 100,
    ...shadows.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mobileMenuBtn: {
    display: Platform.OS === 'web' && typeof window !== 'undefined' && window.innerWidth > 992 ? 'none' : 'flex',
    padding: 6,
    borderRadius: radius.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIconWrap: {
    position: 'relative',
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bowlWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafIcon: {
    position: 'absolute',
    top: -3,
    right: -2,
    zIndex: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  logoVersion: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.accent,
  },
  logoTagline: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  centerSection: {
    flex: 1,
    maxWidth: 520,
    marginHorizontal: spacing.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    outlineStyle: 'none',
    paddingVertical: 0,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    position: 'relative',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconButtonActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.danger,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.lg,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginRight: 4,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  userRole: {
    fontSize: 10,
    fontWeight: '700',
  },
  loginBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 270,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    zIndex: 200,
    ...shadows.lg,
  },
  dropdownHeader: {
    padding: spacing.sm,
  },
  dropdownHeaderName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  dropdownHeaderEmail: {
    fontSize: 11,
    color: colors.textMuted,
  },
  roleBadgeHeader: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  roleBadgeHeaderText: {
    fontSize: 10,
    fontWeight: '800',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 6,
  },
  dropdownSectionLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    paddingHorizontal: spacing.sm,
    marginVertical: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  dropdownItemActive: {
    backgroundColor: colors.primaryLightest,
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dropdownItemSub: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
