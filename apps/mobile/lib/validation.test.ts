import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateSignUpForm,
  validateSignInForm,
  mapAuthError,
} from './validation';

describe('validateEmail', () => {
  it('rejects empty email', () => {
    assert.equal(validateEmail(''), 'Email is required.');
  });

  it('rejects invalid format', () => {
    assert.equal(validateEmail('not-an-email'), 'Enter a valid email address.');
  });

  it('accepts valid email', () => {
    assert.equal(validateEmail('user@example.com'), undefined);
  });
});

describe('validatePassword', () => {
  it('rejects short passwords', () => {
    assert.equal(validatePassword('Ab1!'), 'Password must be at least 8 characters.');
  });

  it('requires letters, numbers, and symbols', () => {
    assert.equal(validatePassword('12345678!'), 'Password must include letters.');
    assert.equal(validatePassword('abcdefgh!'), 'Password must include numbers.');
    assert.equal(validatePassword('Abcdefg1'), 'Password must include a symbol.');
  });

  it('accepts strong password', () => {
    assert.equal(validatePassword('Secure1!'), undefined);
  });
});

describe('validateConfirmPassword', () => {
  it('rejects mismatch', () => {
    assert.equal(validateConfirmPassword('Secure1!', 'Secure2!'), 'Passwords do not match.');
  });
});

describe('validateSignUpForm', () => {
  it('flags incomplete form', () => {
    const errors = validateSignUpForm({ email: '', password: '', confirmPassword: '' });
    assert.ok(errors.form);
    assert.ok(errors.email);
  });
});

describe('validateSignInForm', () => {
  it('flags incomplete form', () => {
    const errors = validateSignInForm({ email: '', password: '' });
    assert.ok(errors.form);
    assert.ok(errors.email);
    assert.ok(errors.password);
  });

  it('accepts email and password without signup strength rules', () => {
    const errors = validateSignInForm({ email: 'user@example.com', password: 'short' });
    assert.equal(errors.form, undefined);
    assert.equal(errors.email, undefined);
    assert.equal(errors.password, undefined);
  });
});

describe('mapAuthError', () => {
  it('maps duplicate email', () => {
    assert.match(mapAuthError('User already registered'), /already registered/i);
  });

  it('maps invalid login credentials', () => {
    assert.equal(mapAuthError('Invalid login credentials'), 'Email or password is incorrect.');
  });
});
