import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

export default function LoginScreen({ navigation, route }) {
  const role = route.params?.role || 'donor';
  const isDonor = role === 'donor';
  const { login } = useApp();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({
      name: name || (isDonor ? 'Sunrise Hotel' : 'Hope Foundation'),
      phone: phone || '+91 98765 43210',
      role,
      verified: true,
    });
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={[styles.badge, { backgroundColor: isDonor ? colors.primaryLight : colors.secondaryLight }]}>
            <Ionicons name={isDonor ? 'gift-outline' : 'heart-outline'} size={14} color={isDonor ? colors.primary : colors.secondary} />
            <Text style={[styles.badgeText, { color: isDonor ? colors.primary : colors.secondary }]}>
              {isDonor ? 'DONOR' : 'RECIPIENT'}
            </Text>
          </View>

          <Text style={styles.title}>Welcome back 👋</Text>
          <Text style={styles.subtitle}>
            {isDonor ? 'Login to donate food and make a difference' : 'Login to discover food donations near you'}
          </Text>

          <View style={{ marginTop: 32 }}>
            <Input
              label={isDonor ? 'Organisation Name' : 'NGO / Shelter Name'}
              placeholder={isDonor ? 'e.g. Grand Palace Hotel' : 'e.g. Hope Foundation'}
              icon="business-outline"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="Phone Number"
              placeholder="+91 98765 43210"
              keyboardType="phone-pad"
              icon="call-outline"
              value={phone}
              onChangeText={setPhone}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton title="Login" icon="log-in-outline" onPress={handleLogin} style={{ marginTop: 8 }} />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <PrimaryButton title="Continue as Guest" variant="outline" icon="person-outline" onPress={handleLogin} />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup', { role })}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  back: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  badge: {
    flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, marginTop: 24, marginBottom: 16,
  },
  badgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { fontSize: 30, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 8, lineHeight: 22 },
  forgot: { alignSelf: 'flex-end', marginBottom: 20, marginTop: -4 },
  forgotText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 22, gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  signupText: { color: colors.textSecondary, fontSize: 14 },
  signupLink: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
