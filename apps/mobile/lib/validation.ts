export interface SignUpFields {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required.';
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address.';
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[a-zA-Z]/.test(password)) return 'Password must include letters.';
  if (!/[0-9]/.test(password)) return 'Password must include numbers.';
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Password must include a symbol.';
  return undefined;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return undefined;
}

export function validateSignUpForm(fields: SignUpFields): FieldErrors {
  const errors: FieldErrors = {};

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(fields.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(fields.password, fields.confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  if (!fields.email.trim() || !fields.password || !fields.confirmPassword) {
    errors.form = 'Please complete all fields before signing up.';
  }

  return errors;
}

export function hasValidationErrors(errors: FieldErrors): boolean {
  return Boolean(errors.email || errors.password || errors.confirmPassword || errors.form);
}

/** Map Supabase auth errors to user-friendly messages */
export function mapAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('already registered') || lower.includes('already been registered')) {
    return 'This email is already registered. Try signing in instead.';
  }
  if (lower.includes('invalid email')) {
    return 'Enter a valid email address.';
  }
  if (lower.includes('password')) {
    return 'Password does not meet security requirements.';
  }
  return message;
}
