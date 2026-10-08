import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function AppSidebar() {
  const { activeTab, navigateTo, unreadCount, user, pendingApprovals } = useApp();

  const pendingApprovalsCount = pendingApprovals.filter((a) => a.status === 'Pending').length;

  const isAdmin = user?.roleType === 'admin';
  const isDonor = user?.roleType === 'donor';

  // Role-specific navigation menus
  const navItems = isAdmin
    ? [
        { id: 'admin-dashboard', label: 'Admin Dashboard', icon: 'shield-checkmark', iconOutline: 'shield-checkmark-outline', badge: pendingApprovalsCount },
        { id: 'home', label: 'Platform Home', icon: 'home', iconOutline: 'home-outline' },
        { id: 'donations', label: 'All Donations', icon: 'gift', iconOutline: 'gift-outline' },
        { id: 'requests', label: 'All Requests', icon: 'clipboard', iconOutline: 'clipboard-outline' },
        { id: 'tracking', label: 'Live Courier Dispatch', icon: 'bicycle', iconOutline: 'bicycle-outline' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications', iconOutline: 'notifications-outline', badge: unreadCount },
        { id: 'settings', label: 'System Settings', icon: 'settings', iconOutline: 'settings-outline' },
        { id: 'help', label: 'Help & FAQs', icon: 'help-buoy', iconOutline: 'help-buoy-outline' },
      ]
    : isDonor
    ? [
        { id: 'home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
        { id: 'donate', label: 'Donate Food', icon: 'restaurant', iconOutline: 'restaurant-outline' },
        { id: 'donations', label: 'My Donations', icon: 'gift', iconOutline: 'gift-outline' },
        { id: 'tracking', label: 'Delivery Tracking', icon: 'bicycle', iconOutline: 'bicycle-outline' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications', iconOutline: 'notifications-outline', badge: unreadCount },
        { id: 'profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
        { id: 'settings', label: 'Settings', icon: 'settings', iconOutline: 'settings-outline' },
        { id: 'help', label: 'Help & Support', icon: 'help-buoy', iconOutline: 'help-buoy-outline' },
      ]
    : [
        { id: 'home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
        { id: 'requests', label: 'My Requests', icon: 'clipboard', iconOutline: 'clipboard-outline' },
        { id: 'tracking', label: 'Delivery Tracking', icon: 'bicycle', iconOutline: 'bicycle-outline' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications', iconOutline: 'notifications-outline', badge: unreadCount },
        { id: 'profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
        { id: 'settings', label: 'Settings', icon: 'settings', iconOutline: 'settings-outline' },
        { id: 'help', label: 'Help & Support', icon: 'help-buoy', iconOutline: 'help-buoy-outline' },
      ];

  return (
    <View style={styles.sidebarContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Role indicator banner */}
        <View style={styles.roleBanner}>
          <Ionicons
            name={isAdmin ? 'shield-checkmark' : isDonor ? 'restaurant' : 'heart'}
            size={16}
            color={colors.primary}
          />
          <Text style={styles.roleBannerText}>
            {isAdmin ? 'ADMIN PORTAL' : isDonor ? 'DONOR ACCOUNT' : 'RECIPIENT SHELTER'}
          </Text>
        </View>

        {/* Navigation List */}
        <View style={styles.menuList}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => navigateTo(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.navItemContent}>
                  <Ionicons
                    name={isActive ? item.icon : item.iconOutline}
                    size={20}
                    color={isActive ? '#FFFFFF' : colors.textSecondary}
                  />
                  <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                    {item.label}
                  </Text>
                </View>

                {item.badge > 0 && (
                  <View style={[styles.badge, isActive && styles.badgeActive]}>
                    <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Decorative Quote / Leaf Art at the bottom */}
        <View style={styles.bottomBrandWrap}>
          <View style={styles.leafIconRow}>
            <Ionicons name="leaf" size={28} color="#2D6A4F" style={{ opacity: 0.7, transform: [{ rotate: '-25deg' }] }} />
            <Ionicons name="heart" size={16} color={colors.accent} style={{ marginTop: 8 }} />
          </View>
          <Text style={styles.brandQuote}>Good Food</Text>
          <Text style={styles.brandQuoteSub}>Never Goes to Waste</Text>
          <View style={styles.leafDecorBottom}>
            <Ionicons name="leaf-outline" size={36} color="#81C784" style={{ opacity: 0.4 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 240,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    height: '100%',
  },
  scrollContent: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  roleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleBannerText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  menuList: {
    gap: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  navLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeActive: {
    backgroundColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextActive: {
    color: colors.primary,
  },
  bottomBrandWrap: {
    marginTop: 40,
    padding: spacing.md,
    backgroundColor: colors.primaryLightest,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  leafIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  brandQuote: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: 22,
  },
  brandQuoteSub: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 2,
  },
  leafDecorBottom: {
    position: 'absolute',
    bottom: -8,
    right: -6,
    zIndex: 0,
  },
});
