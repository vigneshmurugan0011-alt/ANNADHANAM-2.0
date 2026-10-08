import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

export default function SignupScreen({ navigation, route }) {
  const role = route.params?.role || 'donor';
  const isDonor = role === 'donor';
  const { login } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSignup = () => {
    login({
      name: name || (isDonor ? 'New Donor' : 'New Recipient'),
      phone, address, role, verified: true,
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

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join as a {isDonor ? 'Food Donor' : 'Recipient Organisation'}
          </Text>

          <View style={{ marginTop: 28 }}>
            <Input label="Full Name / Org Name" placeholder="Enter name" icon="person-outline" value={name} onChangeText={setName} />
            <Input label="Phone" placeholder="+91 98765 43210" keyboardType="phone-pad" icon="call-outline" value={phone} onChangeText={setPhone} />
            <Input label="Address" placeholder="Enter address" icon="location-outline" value={address} onChangeText={setAddress} />
            <Input label="Password" placeholder="Create password" secureTextEntry icon="lock-closed-outline" />
            {!isDonor && (
              <TouchableOpacity style={styles.uploadBox}>
                <Ionicons name="cloud-upload-outline" size={24} color={colors.primary} />
                <Text style={styles.uploadText}>Upload NGO Registration Certificate</Text>
              </TouchableOpacity>
            )}
          </View>

          <PrimaryButton title="Create Account" icon="checkmark-circle-outline" onPress={handleSignup} style={{ marginTop: 12 }} />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signupLink}>Login</Text>
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
  title: { fontSize: 30, fontWeight: '800', color: colors.textPrimary, marginTop: 24, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 8 },
  uploadBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed',
    borderRadius: radius.md, padding: 16, backgroundColor: colors.primaryLight + '60',
    marginBottom: 12, justifyContent: 'center',
  },
  uploadText: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  signupText: { color: colors.textSecondary, fontSize: 14 },
  signupLink: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
