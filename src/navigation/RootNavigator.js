import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';
import AppLayout from '../components/AppLayout';

import AuthScreen from '../screens/auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import FindFoodScreen from '../screens/FindFoodScreen';
import DonateFoodScreen from '../screens/DonateFoodScreen';
import RequestsScreen from '../screens/RequestsScreen';
import DonationsScreen from '../screens/DonationsScreen';
import TrackingScreen from '../screens/TrackingScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

export default function RootNavigator() {
  const { user, activeTab } = useApp();

  // If user is not authenticated or explicitly navigated to auth screen
  if (!user || activeTab === 'auth') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AuthScreen />
      </SafeAreaView>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'admin-dashboard':
        return <AdminDashboardScreen />;
      case 'donate':
        return <DonateFoodScreen />;
      case 'requests':
        return <RequestsScreen />;
      case 'donations':
        return <DonationsScreen />;
      case 'tracking':
        return <TrackingScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'help':
        return <HelpScreen />;
      default:
        return user?.roleType === 'admin' ? <AdminDashboardScreen /> : <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppLayout>
        {renderActiveScreen()}
      </AppLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
