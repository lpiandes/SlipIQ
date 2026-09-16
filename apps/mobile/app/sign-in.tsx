import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { AuthTextInput } from '../components/AuthTextInput';
import { colors, spacing } from '../lib/theme';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  validateSignInForm,
  hasValidationErrors,
  mapAuthError,
  type FieldErrors,
} from '../lib/validation';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSignIn() {
    const errors = validateSignInForm({ email, password });
    setFieldErrors(errors);
    if (hasValidationErrors(errors)) return;

    if (!isSupabaseConfigured) {
      setFieldErrors({
        form: 'Supabase is not configured. Add your project URL and anon key to app.json extra.',
      });
      return;
    }

    setSubmitting(true);
    setFieldErrors({});

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setSubmitting(false);

    if (error) {
      setFieldErrors({ form: mapAuthError(error.message) });
      return;
    }

    if (data.session) {
      router.replace('/welcome');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign in to SlipIQ</Text>
        <Text style={styles.subtitle}>
          Sign in to access bet intelligence, scores, and analysis.
        </Text>

        {fieldErrors.form ? (
          <View style={styles.bannerError}>
            <Text style={styles.bannerErrorText}>{fieldErrors.form}</Text>
          </View>
        ) : null}

        <AuthTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={fieldErrors.email}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          placeholder="you@example.com"
        />

        <AuthTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={fieldErrors.password}
          secureTextEntry
          textContentType="password"
          autoComplete="password"
          placeholder="Enter your password"
        />

        <Pressable
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={colors.textPrimary} />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </Pressable>

        <Pressable style={styles.switchAuth} onPress={() => router.push('/sign-up')}>
          <Text style={styles.hint}>
            Don&apos;t have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  bannerError: {
    backgroundColor: '#3f1515',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  bannerErrorText: { color: '#fecaca', fontSize: 14 },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  switchAuth: {
    marginTop: spacing.md,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  link: {
    color: colors.accent,
    fontWeight: '700',
  },
});
