export const colors = {
  // Forest Green Theme (Matching the Reference UI)
  primary: '#0F4C3A',         // Deep forest food-rescue green
  primaryHover: '#165B47',
  primaryDark: '#0A382B',
  primaryLight: '#E8F5E9',     // Soft pastel green
  primaryLightest: '#F2FAF4',

  // Secondary & Accents
  secondary: '#2D6A4F',
  accent: '#E76F51',          // Warm terracotta / orange
  accentWarm: '#F4A261',      // Soft golden orange
  accentYellow: '#F9C74F',

  // Backgrounds & Surfaces
  bg: '#F7F5F0',              // Warm cream/off-white background
  bgLight: '#FAF9F5',
  surface: '#FFFFFF',         // Crisp clean white card surface
  surfaceHover: '#FDFCF9',
  border: '#E8E2D6',          // Soft warm border
  borderLight: '#F0ECE4',

  // Text
  textPrimary: '#142820',     // Dark forest slate
  textSecondary: '#4A5B53',   // Medium sage slate
  textMuted: '#87978F',       // Soft muted gray
  textLight: '#FFFFFF',

  // Status & Tags
  success: '#10B981',
  successBg: '#E8F5E9',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  info: '#3B82F6',
  infoBg: '#E0F2FE',

  // Food Tags
  veg: '#2E7D32',
  vegBg: '#E8F5E9',
  nonVeg: '#D97706',
  nonVegBg: '#FEF3C7',

  // Metric Card Pastel Backgrounds
  metricGreen: '#E8F5E9',
  metricOrange: '#FFF3E0',
  metricBlue: '#E1F5FE',
  metricPurple: '#F3E5F5',
  
  shadow: '#1A2E26',
  overlay: 'rgba(10, 35, 25, 0.5)',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5, color: colors.textPrimary },
  h2: { fontSize: 24, fontWeight: '700', letterSpacing: -0.3, color: colors.textPrimary },
  h3: { fontSize: 19, fontWeight: '700', color: colors.textPrimary },
  h4: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400', color: colors.textSecondary },
  bodySmall: { fontSize: 12, fontWeight: '400', color: colors.textSecondary },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.2, color: colors.textPrimary },
  caption: { fontSize: 11, fontWeight: '500', color: colors.textMuted },
};
