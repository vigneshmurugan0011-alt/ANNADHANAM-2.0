import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function NotificationsScreen() {
  const { notifications, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState('All'); // 'All' | 'Unread'

  const filtered = notifications.filter((n) => {
    if (filter === 'Unread') return n.unread;
    return true;
  });

  const getIconForType = (type) => {
    switch (type) {
      case 'food':
        return { icon: 'restaurant', color: colors.primary, bg: colors.primaryLight };
      case 'request':
        return { icon: 'clipboard', color: '#0288D1', bg: colors.metricBlue };
      case 'delivery':
        return { icon: 'bicycle', color: '#E65100', bg: colors.metricOrange };
      case 'wallet':
        return { icon: 'wallet', color: colors.success, bg: colors.successBg };
      case 'safety':
        return { icon: 'shield-checkmark', color: colors.success, bg: colors.successBg };
      default:
        return { icon: 'notifications', color: colors.primary, bg: colors.primaryLight };
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notification Center</Text>
          <Text style={styles.subtitle}>
            Real-time surplus food alerts, request approvals, and delivery milestones.
          </Text>
        </View>

        <TouchableOpacity style={styles.markReadBtn} onPress={markAllNotificationsRead}>
          <Ionicons name="checkmark-done" size={16} color={colors.primary} />
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, filter === 'All' && styles.tabBtnActive]}
          onPress={() => setFilter('All')}
        >
          <Text style={[styles.tabText, filter === 'All' && styles.tabTextActive]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, filter === 'Unread' && styles.tabBtnActive]}
          onPress={() => setFilter('Unread')}
        >
          <Text style={[styles.tabText, filter === 'Unread' && styles.tabTextActive]}>
            Unread ({notifications.filter((n) => n.unread).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <View style={styles.list}>
        {filtered.map((item) => {
          const styleConfig = getIconForType(item.type);

          return (
            <View
              key={item.id}
              style={[styles.card, item.unread && styles.cardUnread]}
            >
              <View style={[styles.iconWrap, { backgroundColor: styleConfig.bg }]}>
                <Ionicons name={styleConfig.icon} size={20} color={styleConfig.color} />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.cardBody}>{item.body}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: spacing.lg,
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
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardUnread: {
    backgroundColor: colors.primaryLightest,
    borderColor: colors.primaryLight,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  cardBody: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  cardTime: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
    fontWeight: '500',
  },
});
