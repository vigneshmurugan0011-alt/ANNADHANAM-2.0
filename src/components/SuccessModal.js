import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function SuccessModal() {
  const { isSuccessModalOpen, setIsSuccessModalOpen, successMessage, navigateTo } = useApp();

  return (
    <Modal
      visible={isSuccessModalOpen}
      animationType="fade"
      transparent
      onRequestClose={() => setIsSuccessModalOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={36} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Success! 🎉</Text>
          <Text style={styles.message}>
            {successMessage || 'Action completed successfully.'}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                setIsSuccessModalOpen(false);
                navigateTo('requests');
              }}
            >
              <Text style={styles.actionBtnText}>View My Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => {
                setIsSuccessModalOpen(false);
                navigateTo('home');
              }}
            >
              <Text style={styles.homeBtnText}>Back to Home</Text>
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
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    maxWidth: 420,
    width: '100%',
    ...shadows.lg,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  buttonRow: {
    width: '100%',
    gap: 10,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  homeBtn: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  homeBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
