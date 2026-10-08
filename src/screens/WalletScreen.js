import React from 'react';
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

export default function WalletScreen() {
  const { wallet, setIsAddMoneyModalOpen } = useApp();

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Annadhanam Impact Wallet</Text>
        <Text style={styles.subtitle}>
          Sponsor delivery rides for volunteers, earn rescue cashback, and view transparent logistics transactions.
        </Text>
      </View>

      <View style={styles.grid}>
        {/* Left: Balance Card & Impact Highlights */}
        <View style={styles.leftCol}>
          {/* Main Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceTopRow}>
              <View>
                <Text style={styles.balanceLabel}>AVAILABLE WALLET BALANCE</Text>
                <Text style={styles.balanceValue}>₹{wallet.balance.toLocaleString()}</Text>
              </View>
              <View style={styles.walletIconWrap}>
                <Ionicons name="wallet" size={28} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.balanceActionRow}>
              <TouchableOpacity
                style={styles.addMoneyBtn}
                onPress={() => setIsAddMoneyModalOpen(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="add-circle" size={18} color={colors.primary} />
                <Text style={styles.addMoneyBtnText}>Add Money</Text>
              </TouchableOpacity>

              <View style={styles.walletTag}>
                <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
                <Text style={styles.walletTagText}>100% Tax Deductible</Text>
              </View>
            </View>
          </View>

          {/* Quick Impact Metrics */}
          <View style={styles.impactMetricsRow}>
            <View style={styles.impactMetricCard}>
              <View style={[styles.impactIconWrap, { backgroundColor: colors.metricGreen }]}>
                <Ionicons name="leaf" size={20} color="#2E7D32" />
              </View>
              <Text style={styles.impactVal}>{wallet.savedMeals || 68}</Text>
              <Text style={styles.impactLabel}>Meals Sponsored</Text>
            </View>

            <View style={styles.impactMetricCard}>
              <View style={[styles.impactIconWrap, { backgroundColor: colors.metricOrange }]}>
                <Ionicons name="gift" size={20} color="#E65100" />
              </View>
              <Text style={styles.impactVal}>₹{wallet.subsidiesEarned || 450}</Text>
              <Text style={styles.impactLabel}>Subsidies Earned</Text>
            </View>
          </View>
        </View>

        {/* Right: Transaction History */}
        <View style={styles.rightCol}>
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Transaction History</Text>
              <Text style={styles.historyCount}>{wallet.transactions.length} transactions</Text>
            </View>

            <View style={styles.transactionsList}>
              {wallet.transactions.map((tx) => (
                <View key={tx.id} style={styles.txRow}>
                  <View
                    style={[
                      styles.txIconWrap,
                      { backgroundColor: tx.isCredit ? colors.successBg : colors.dangerBg },
                    ]}
                  >
                    <Ionicons
                      name={tx.isCredit ? 'arrow-down-circle' : 'arrow-up-circle'}
                      size={20}
                      color={tx.isCredit ? colors.success : colors.danger}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txDate}>{tx.date} • {tx.category}</Text>
                  </View>

                  <Text
                    style={[
                      styles.txAmount,
                      { color: tx.isCredit ? colors.success : colors.danger },
                    ]}
                  >
                    {tx.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
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
    marginBottom: spacing.xl,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  leftCol: {
    flex: 1.2,
    minWidth: 300,
    gap: spacing.lg,
  },
  rightCol: {
    flex: 1.8,
    minWidth: 320,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.md,
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.2,
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  walletIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addMoneyBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
  },
  addMoneyBtnText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  walletTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  walletTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  impactMetricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  impactMetricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.sm,
  },
  impactIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  impactVal: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  impactLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  historyCount: {
    fontSize: 11,
    color: colors.textMuted,
  },
  transactionsList: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  txIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  txDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '800',
  },
});
