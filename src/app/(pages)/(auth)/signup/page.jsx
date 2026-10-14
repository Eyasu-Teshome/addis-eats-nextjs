'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (feedback) setFeedback(null);
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: 'None', text: '' };

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', text: 'Add uppercase letters, numbers & symbols' };
    if (score <= 3) return { score: 2, label: 'Medium', text: 'Good! Add special characters for maximum strength' };
    return { score: 3, label: 'Strong', text: 'Excellent and secure password' };
  }, [formData.password]);

  const fillDemoData = () => {
    setFormData({
      fullName: 'Abebe Kebede',
      email: 'abebe.kebede@addiseats.com',
      phone: '+251 91 123 4567',
      password: 'AddisTibs2026!#',
      confirmPassword: 'AddisTibs2026!#',
      agreeTerms: true,
    });
    setFeedback({
      type: 'success',
      message: 'Sample registration data filled! Click "Create Account" below.',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // Validations
    if (!formData.fullName.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your full name.' });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFeedback({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setFeedback({
        type: 'error',
        message: 'Password must be at least 8 characters long.',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Passwords do not match. Please verify both fields.',
      });
      return;
    }

    if (!formData.agreeTerms) {
      setFeedback({
        type: 'error',
        message: 'You must agree to the Terms of Service to create an account.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({
          type: 'success',
          message:
            '🎉 Account created successfully! 15% welcome discount applied. Redirecting to menu...',
        });
        setTimeout(() => {
          router.push('/menu');
        }, 1400);
      } else {
        setFeedback({
          type: 'error',
          message: data?.message || 'Failed to create account. Please try again.',
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Network error occurred while connecting. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <main className={styles.authCard}>
        {/* Card Header */}
        <header className={styles.cardHeader}>
          <span className={styles.brandBadge}>🇪🇹 Join Addis Eats</span>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Sign up to unlock 15% off your first order, save your favorite Ethiopian dishes, and track deliveries.
          </p>
        </header>

        {/* Demo Data Autofill Box */}
        <aside className={styles.demoFillBox} aria-label="Demo form assistant">
          <span className={styles.demoFillText}>⚡ Want to test quickly? Auto-fill fields</span>
          <button
            type="button"
            id="signup-demo-btn"
            className={styles.demoFillBtn}
            onClick={fillDemoData}
          >
            Fill Sample Data
          </button>
        </aside>

        {/* Social Authentication */}
        <div className={styles.socialSection}>
          <button
            type="button"
            id="signup-google-btn"
            className={styles.socialBtn}
            onClick={() => {
              setFeedback({
                type: 'success',
                message: 'Google Sign-Up simulated! Welcome to the Addis Eats family.',
              });
              setTimeout(() => router.push('/menu'), 1000);
            }}
          >
            <svg
              className={styles.socialIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerText}>or register with details</span>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="signup-feedback-banner"
            className={`${styles.alertBanner} ${
              feedback.type === 'success' ? styles.alertSuccess : styles.alertError
            }`}
            role="alert"
          >
            <span className={styles.alertIcon}>
              {feedback.type === 'success' ? '✓' : '⚠️'}
            </span>
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Registration Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className={styles.inputGroup}>
            <label htmlFor="signup-name" className={styles.label}>
              Full Name
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                id="signup-name"
                name="fullName"
                className={styles.input}
                placeholder="e.g. Abebech Gobena"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className={styles.inputGroup}>
            <label htmlFor="signup-email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                id="signup-email"
                name="email"
                className={styles.input}
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className={styles.inputGroup}>
            <label htmlFor="signup-phone" className={styles.label}>
              Phone Number <span style={{ color: 'var(--text-light)', fontWeight: 'normal' }}>(for delivery updates)</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input
                type="tel"
                id="signup-phone"
                name="phone"
                className={styles.input}
                placeholder="+251 91 123 4567"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="signup-password" className={styles.label}>
              Create Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-password"
                name="password"
                className={styles.input}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                id="signup-toggle-password"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className={styles.strengthMeter}>
                <div className={styles.strengthBarContainer}>
                  <div
                    className={`${styles.strengthSegment} ${
                      passwordStrength.score >= 1
                        ? passwordStrength.score === 1
                          ? styles.strengthSegmentActiveWeak
                          : passwordStrength.score === 2
                          ? styles.strengthSegmentActiveMedium
                          : styles.strengthSegmentActiveStrong
                        : ''
                    }`}
                  />
                  <div
                    className={`${styles.strengthSegment} ${
                      passwordStrength.score >= 2
                        ? passwordStrength.score === 2
                          ? styles.strengthSegmentActiveMedium
                          : styles.strengthSegmentActiveStrong
                        : ''
                    }`}
                  />
                  <div
                    className={`${styles.strengthSegment} ${
                      passwordStrength.score >= 3
                        ? styles.strengthSegmentActiveStrong
                        : ''
                    }`}
                  />
                </div>
                <div className={styles.strengthLabel}>
                  <span>Strength: {passwordStrength.label}</span>
                  <span>{passwordStrength.text}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="signup-confirm-password" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="signup-confirm-password"
                name="confirmPassword"
                className={`${styles.input} ${
                  formData.confirmPassword &&
                  formData.confirmPassword !== formData.password
                    ? styles.inputError
                    : ''
                }`}
                placeholder="Re-type password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                id="signup-toggle-confirm-password"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
              >
                {showConfirmPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.confirmPassword !== formData.password && (
                <span className={styles.errorText}>Passwords do not match</span>
              )}
          </div>

          {/* Terms Agreement Checkbox */}
          <div className={styles.formOptions}>
            <label className={styles.checkboxContainer} htmlFor="signup-terms">
              <input
                type="checkbox"
                id="signup-terms"
                name="agreeTerms"
                className={styles.checkboxInput}
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className={styles.checkboxText}>
                I agree to the <Link href="#terms" className={styles.forgotLink}>Terms of Service</Link> and{' '}
                <Link href="#privacy" className={styles.forgotLink}>Privacy Policy</Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="signup-submit-btn"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                <span>Creating your account...</span>
              </>
            ) : (
              <span>Create Addis Eats Account →</span>
            )}
          </button>
        </form>

        {/* Member Perks */}
        <section className={styles.perksGrid} aria-label="Member perks">
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>🎁</span>
            <span className={styles.perkText}>15% Off 1st Order</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>🛵</span>
            <span className={styles.perkText}>Free Delivery &gt; 500 ETB</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>🌿</span>
            <span className={styles.perkText}>Beyaynetu Specials</span>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.cardFooter}>
          <p>
            Already have an account?
            <Link href="/signin" className={styles.switchLink} id="signup-to-signin-link">
              Sign In
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}





