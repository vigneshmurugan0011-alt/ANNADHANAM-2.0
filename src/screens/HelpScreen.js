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

export default function HelpScreen() {
  const [feedback, setFeedback] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      q: 'How does ANNADHANAM 2.0 ensure food safety and quality?',
      a: 'All food donors undergo mandatory food safety verification checklists adhering to FSSAI guidelines. Meals must be listed within 2 hours of cooking, packed in food-grade containers, and dispatched via temperature-conscious delivery riders.',
    },
    {
      q: 'Who pays for the courier and delivery charges?',
      a: 'Delivery charges via Rapido, Porter, or Zomato Feeding network are subsidized by our community impact wallet and sponsored by corporate partners so that orphanages and shelters receive food completely free.',
    },
    {
      q: 'How do I claim surplus food as an NGO or community shelter?',
      a: 'Simply browse the active donor meals on the Home dashboard, select any available meal donation, review the nutrition and safety checklist, and tap "Request Food". The donor will be alerted immediately.',
    },
    {
      q: 'What is the purpose of the 4-digit Delivery OTP?',
      a: 'The delivery OTP ensures secure handover between the volunteer courier and the authorized shelter manager, preventing food diversion and guaranteeing real-time delivery confirmation.',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support Center</Text>
          <Text style={styles.subtitle}>
            24/7 Food rescue assistance, FAQs, emergency helplines, and volunteer coordination.
          </Text>
        </View>

        {/* Emergency Food Rescue Banner */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyIconWrap}>
            <Ionicons name="call" size={26} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>24/7 Emergency Food Rescue Hotline</Text>
            <Text style={styles.emergencySub}>
              Have urgent bulk banquet/wedding surplus food expiring in less than 2 hours? Call our rapid response dispatch team.
            </Text>
            <Text style={styles.hotlineNumber}>📞 1800-425-ANNAM (1800-425-2662)</Text>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.faqItem}
                  onPress={() => setExpandedFaq(isExpanded ? null : idx)}
                  activeOpacity={0.8}
                >
                  <View style={styles.faqQuestionRow}>
                    <Text style={styles.faqQText}>{faq.q}</Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  {isExpanded && (
                    <Text style={styles.faqAText}>{faq.a}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Contact / Feedback Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Send Us a Message / Report an Issue</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your query, suggestion, or volunteer registration request..."
            placeholderTextColor={colors.textMuted}
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              if (typeof window !== 'undefined') {
                window.alert('Thank you! Our support team will get back to you shortly.');
                setFeedback('');
              }
            }}
          >
            <Ionicons name="paper-plane" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.submitBtnText}>Submit Message</Text>
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
    marginBottom: spacing.xs,
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
  emergencyCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...shadows.md,
  },
  emergencyIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  emergencySub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    lineHeight: 16,
  },
  hotlineNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#F9C74F',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 10,
  },
  faqAText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 10,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
  },
  textArea: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    height: 100,
    fontSize: 13,
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
