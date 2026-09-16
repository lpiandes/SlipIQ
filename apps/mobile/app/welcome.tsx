import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { colors, spacing } from '../lib/theme';

export default function WelcomeScreen() {
  const { user, session, loading } = useAuth();

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/sign-in');
  }

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Signed in</Text>
      </View>
      <Text style={styles.title}>Welcome to SlipIQ</Text>
      <Text style={styles.subtitle}>
        {user?.email
          ? `You're signed in as ${user.email}. Your dashboard and bet tools will appear here as we ship each story.`
          : 'Your account was created. Check your email if verification is required, then return to sign in.'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dashboard</Text>
        <Text style={styles.cardBody}>
          Home board, Bet Cards, and slip analysis are coming in future stories. You're all set for
          now.
        </Text>
      </View>

      <Pressable style={styles.signOut} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  centered: { alignItems: 'center', justifyContent: 'center' },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#14532d',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardBody: { color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
  signOut: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
  },
  signOutText: { color: colors.accent, fontSize: 15, fontWeight: '600' },
});
