import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'SlipIQ',
  slug: 'slipiq',
  scheme: 'slipiq',
  userInterfaceStyle: 'dark',
  ios: {
    ...config.ios,
    supportsTablet: false,
    bundleIdentifier: 'com.slipiq.app',
  },
  android: {
    ...config.android,
    package: 'com.slipiq.app',
  },
  plugins: ['expo-router'],
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
});
