import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../theme/theme';
import { mockNotifications } from '../../data/mockData';

const typeConfig = {
  success: { icon: 'checkmark-circle', color: colors.success },
  info: { icon: 'information-circle', color: colors.info },
  warning: { icon: 'alert-circle', color: colors.warning },
};

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((n) => {
          const cfg = typeConfig[n.type] || typeConfig.info;
          return (
            <View key={n.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: cfg.color + '15' }]}>
                <Ionicons name={cfg.icon} size={22} color={cfg.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{n.title}</Text>
                <Text style={styles.cardBody}>{n.body}</Text>
                <Text style={styles.cardTime}>{n.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg,
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  markAll: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  card: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  cardBody: { fontSize: 12, color: colors.textSecondary, marginTop: 3, lineHeight: 18 },
  cardTime: { fontSize: 11, color: colors.textMuted, marginTop: 6, fontWeight: '500' },
});
