import React, { createContext, useContext, useState } from 'react';
import {
  mockDonations,
  mockRequests,
  mockStats,
  mockWallet,
  mockNotifications,
  mockPendingApprovals,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user state (default: Vignesh M - Food Donor / Recipient / Admin)
  const [user, setUser] = useState({
    id: 'u1',
    name: 'Vignesh M',
    role: 'NGO / Shelter Recipient',
    roleType: 'recipient', // 'donor' | 'recipient' | 'admin'
    email: 'vignesh.m@annadhanam.org',
    phone: '+91 98765 43210',
    location: 'Chennai, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true,
  });

  // Stored passwords for recipient & admin accounts
  const [recipientCredentials, setRecipientCredentials] = useState({
    email: 'vignesh.m@annadhanam.org',
    password: 'password123',
  });

  const [adminCredentials, setAdminCredentials] = useState({
    email: 'admin@annadhanam.org',
    password: 'admin123',
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('home');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');

  // Core Data State
  const [donations, setDonations] = useState(mockDonations);
  const [requests, setRequests] = useState(mockRequests);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [stats, setStats] = useState(mockStats);
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingApprovals);

  // Selected item states
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Responsive sidebar open on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Food Donor Login (Phone Number + OTP)
  const loginAsDonor = ({ phone, name, address, businessType }) => {
    const donorUser = {
      id: 'donor_' + Date.now(),
      name: name || 'Sri Sai Mess & Caterers',
      role: 'Food Donor',
      roleType: 'donor',
      phone: phone || '+91 98765 43210',
      email: `${(name || 'donor').toLowerCase().replace(/\s+/g, '')}@foodrescue.in`,
      location: address || 'Anna Nagar, Chennai',
      businessType: businessType || 'Restaurant / Mess',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80',
    };
    setUser(donorUser);
    setActiveTab('home');
    addNotification({
      title: 'Welcome Donor!',
      body: `Logged in as ${donorUser.name} via OTP verification. You can now post surplus food donations.`,
      type: 'food',
    });
    return donorUser;
  };

  // 2. Recipient Login (Email + Password)
  const loginAsRecipient = ({ email, password, name, orgType, address }) => {
    // If logging in with existing credentials or new registration
    const recipientUser = {
      id: 'recip_' + Date.now(),
      name: name || 'Hope & Care Children Shelter',
      role: 'NGO / Shelter Recipient',
      roleType: 'recipient',
      email: email || 'vignesh.m@annadhanam.org',
      phone: '+91 98765 43210',
      location: address || 'Chennai, Tamil Nadu',
      orgType: orgType || 'Orphanage / Children Home',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    if (password) {
      setRecipientCredentials((prev) => ({
        ...prev,
        email: email || prev.email,
        password: password || prev.password,
      }));
    }

    setUser(recipientUser);
    setActiveTab('home');
    addNotification({
      title: 'Welcome Recipient Partner!',
      body: `Logged in as ${recipientUser.name}. Discover and claim surplus food nearby.`,
      type: 'request',
    });
    return recipientUser;
  };

  // 3. Admin Login (Email + Password)
  const loginAsAdmin = ({ email, password }) => {
    const adminUser = {
      id: 'admin_root',
      name: 'Platform Administrator',
      role: 'Platform Administrator',
      roleType: 'admin',
      email: email || 'admin@annadhanam.org',
      phone: '+91 1800 425 2662',
      location: 'Central Control, Chennai HQ',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    };
    setUser(adminUser);
    setActiveTab('admin-dashboard');
    addNotification({
      title: 'Admin Session Activated',
      body: 'Welcome Admin. Full access to platform donations, shelter verifications, and logistics audit.',
      type: 'safety',
    });
    return adminUser;
  };

  // Change Password for Recipient & Admin
  const changePassword = (currentPassword, newPassword) => {
    if (user?.roleType === 'recipient') {
      if (currentPassword && currentPassword !== recipientCredentials.password) {
        return { success: false, error: 'Current password does not match.' };
      }
      setRecipientCredentials((prev) => ({ ...prev, password: newPassword }));
      addNotification({
        title: 'Password Updated',
        body: 'Your recipient account password has been changed successfully.',
        type: 'safety',
      });
      return { success: true };
    } else if (user?.roleType === 'admin') {
      if (currentPassword && currentPassword !== adminCredentials.password) {
        return { success: false, error: 'Current admin password does not match.' };
      }
      setAdminCredentials((prev) => ({ ...prev, password: newPassword }));
      addNotification({
        title: 'Admin Password Updated',
        body: 'Admin master password has been changed successfully.',
        type: 'safety',
      });
      return { success: true };
    }
    return { success: false, error: 'Donor accounts use Phone + OTP login.' };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setActiveTab('auth');
  };

  // Admin Approval actions
  const approveShelter = (id) => {
    setPendingApprovals((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Approved' } : app))
    );
    addNotification({
      title: 'Shelter Approved',
      body: `Shelter application #${id} has been verified and approved for real-time food claims.`,
      type: 'safety',
    });
  };

  const rejectShelter = (id) => {
    setPendingApprovals((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Rejected' } : app))
    );
  };

  // Switch active tab
  const navigateTo = (tab, payload = null) => {
    setActiveTab(tab);
    if (payload?.donation) {
      setSelectedDonation(payload.donation);
    }
    if (payload?.request) {
      setSelectedRequest(payload.request);
    }
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // View donation detail
  const openDonationDetails = (donation) => {
    setSelectedDonation(donation);
    setIsDetailModalOpen(true);
  };

  const closeDonationDetails = () => {
    setIsDetailModalOpen(false);
  };

  // Add new donation (from Donate page)
  const addDonation = (newDonationData) => {
    const newDonation = {
      ...newDonationData,
      id: 'd' + (donations.length + 1) + '_' + Date.now(),
      donorName: newDonationData.donorName || user?.name || 'Sri Sai Mess',
      donorType: user?.role || 'Food Donor',
      status: 'available',
      createdAt: new Date().toISOString(),
      distance: newDonationData.distance || '1.0 km',
      timeAgo: 'Just now',
      matchScore: 99,
      safetyStatus: 'Verified Safe',
      image: newDonationData.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    };

    setDonations((prev) => [newDonation, ...prev]);

    addNotification({
      title: 'Donation Posted Successfully!',
      body: `Your donation of ${newDonation.foodType} (${newDonation.quantity}) is live. Nearby NGOs and shelters have been alerted.`,
      type: 'food',
    });

    return newDonation;
  };

  // Request food donation
  const requestDonation = (donation, requestDetails = {}) => {
    const newReq = {
      id: 'r' + (requests.length + 1) + '_' + Date.now(),
      foodType: donation.foodType,
      category: donation.category || 'Cooked Meals',
      description: donation.notes || donation.foodType,
      isVeg: donation.isVeg,
      image: donation.image,
      location: requestDetails.deliveryAddress || user?.location || 'Chennai',
      pickupAddress: donation.pickupAddress,
      coordinates: donation.coordinates || { latitude: 13.0827, longitude: 80.2707 },
      landmark: donation.landmark || 'Marked Donor Point',
      requestedBy: (user?.name || 'Recipient') + ` (${user?.role || 'Shelter'})`,
      requesterPhone: user?.phone || '+91 98765 43210',
      donorName: donation.donorName,
      quantity: donation.quantity,
      servings: donation.servings,
      cookedTime: donation.cookedTime,
      status: 'Pending',
      time: 'Just now',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      deliveryPartner: 'Rapido / Partner Pending',
      donationId: donation.id,
      timeline: [
        { step: 'Request Submitted', time: 'Just now', done: true },
        { step: 'Donor Acceptance', time: 'Pending', done: false },
        { step: 'Delivery Partner Assigned', time: '—', done: false },
        { step: 'Out for Delivery', time: '—', done: false },
        { step: 'Delivered', time: '—', done: false },
      ],
    };

    setRequests((prev) => [newReq, ...prev]);

    setDonations((prev) =>
      prev.map((d) =>
        d.id === donation.id
          ? { ...d, status: 'claimed', claimedBy: user?.name || 'Recipient Shelter' }
          : d
      )
    );

    addNotification({
      title: 'Request Sent to ' + donation.donorName,
      body: `You requested ${donation.servings} servings of ${donation.foodType}. We will alert you once accepted.`,
      type: 'request',
    });

    setSuccessMessage(`Request for "${donation.foodType}" submitted successfully!`);
    setIsSuccessModalOpen(true);
    setIsDetailModalOpen(false);
  };

  // Update request status
  const updateRequestStatus = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const updatedTimeline = r.timeline.map((stepItem, idx) => {
            if (newStatus === 'Accepted' && idx <= 1) return { ...stepItem, done: true, time: 'Just now' };
            if (newStatus === 'In Transit' && idx <= 3) return { ...stepItem, done: true, time: 'Just now' };
            if (newStatus === 'Delivered') return { ...stepItem, done: true, time: 'Just now' };
            return stepItem;
          });
          return { ...r, status: newStatus, timeline: updatedTimeline };
        }
        return r;
      })
    );
  };

  // Notifications
  const addNotification = (notif) => {
    const n = {
      id: 'n_' + Date.now(),
      time: 'Just now',
      unread: true,
      ...notif,
    };
    setNotifications((prev) => [n, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        recipientCredentials,
        adminCredentials,
        loginAsDonor,
        loginAsRecipient,
        loginAsAdmin,
        changePassword,
        logout,
        pendingApprovals,
        approveShelter,
        rejectShelter,
        activeTab,
        setActiveTab,
        navigateTo,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        vegOnlyFilter,
        setVegOnlyFilter,
        locationQuery,
        setLocationQuery,
        donations,
        requests,
        notifications,
        stats,
        selectedDonation,
        setSelectedDonation,
        selectedRequest,
        setSelectedRequest,
        sidebarOpen,
        setSidebarOpen,
        isDetailModalOpen,
        setIsDetailModalOpen,
        isRequestModalOpen,
        setIsRequestModalOpen,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        isChangePasswordModalOpen,
        setIsChangePasswordModalOpen,
        successMessage,
        setSuccessMessage,
        openDonationDetails,
        closeDonationDetails,
        addDonation,
        requestDonation,
        updateRequestStatus,
        addNotification,
        markAllNotificationsRead,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
