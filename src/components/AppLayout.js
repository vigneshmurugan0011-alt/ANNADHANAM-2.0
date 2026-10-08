import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/theme';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import FoodDetailsModal from './FoodDetailsModal';
import SuccessModal from './SuccessModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useApp } from '../context/AppContext';

export default function AppLayout({ children }) {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <View style={styles.appContainer}>
      {/* Header */}
      <AppHeader />

      {/* Main Container: Sidebar + Content */}
      <View style={styles.bodyContainer}>
        {/* Desktop Left Sidebar */}
        <View style={styles.desktopSidebarWrap}>
          <AppSidebar />
        </View>

        {/* Mobile / Tablet Drawer Modal */}
        <Modal
          visible={sidebarOpen}
          animationType="slide"
          transparent
          onRequestClose={() => setSidebarOpen(false)}
        >
          <View style={styles.drawerOverlay}>
            <TouchableOpacity
              style={styles.drawerBackdrop}
              onPress={() => setSidebarOpen(false)}
            />
            <View style={styles.drawerContent}>
              <AppSidebar />
            </View>
          </View>
        </Modal>

        {/* Page Content Scroll Area */}
        <View style={styles.mainContentWrap}>
          {children}
        </View>
      </View>

      {/* Global Modals */}
      <FoodDetailsModal />
      <SuccessModal />
      <ChangePasswordModal />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.bg,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
  },
  desktopSidebarWrap: {
    display: 'flex',
    height: '100%',
  },
  mainContentWrap: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.bg,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
  },
  drawerBackdrop: {
    flex: 1,
  },
  drawerContent: {
    width: 260,
    height: '100%',
    backgroundColor: colors.surface,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
});
