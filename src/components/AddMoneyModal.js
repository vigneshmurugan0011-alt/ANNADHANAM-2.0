import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function AddMoneyModal() {
  const { isAddMoneyModalOpen, setIsAddMoneyModalOpen, addMoney } = useApp();
  const [amount, setAmount] = useState('200');

  const presets = ['100', '200', '500', '1000'];

  const handleAdd = () => {
    addMoney(amount);
    setIsAddMoneyModalOpen(false);
  };

  return (
    <Modal
      visible={isAddMoneyModalOpen}
      animationType="fade"
      transparent
      onRequestClose={() => setIsAddMoneyModalOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <View style={styles.iconWrap}>
              <Ionicons name="wallet" size={24} color={colors.primary} />
            </View>
            <Text style={styles.title}>Top-up Annadhanam Wallet</Text>
            <Text style={styles.sub}>
              Wallet balance is used to sponsor delivery charges for volunteers and nearby shelters.
            </Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.inputLabel}>Enter Amount (₹)</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="200"
              />
            </View>

            <View style={styles.presetRow}>
              {presets.map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.presetBtn, amount === val && styles.presetBtnActive]}
                  onPress={() => setAmount(val)}
                >
                  <Text style={[styles.presetText, amount === val && styles.presetTextActive]}>
                    +₹{val}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.infoBanner}>
              <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
              <Text style={styles.infoBannerText}>100% of your contributions support direct food logistics.</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setIsAddMoneyModalOpen(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleAdd}>
              <Text style={styles.confirmText}>Add ₹{amount || 0} via UPI / Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    width: '100%',
    maxWidth: 440,
    padding: spacing.xl,
    ...shadows.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  sub: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 17,
  },
  body: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  presetBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  presetBtnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  presetTextActive: {
    color: colors.primary,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryLightest,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoBannerText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radius.md,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
