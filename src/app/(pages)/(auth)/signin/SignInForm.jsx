'use client';

import React, { useState, useTransition } from 'react';
import styles from '../auth.module.css';

export default function SignInForm({ action, next }) {
  const [phone, setPhone] = useState('+251911111111');
  const [password, setPassword] = useState('customer123');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSelectDemo = (selectedPhone, selectedPassword) => {
    setPhone(selectedPhone);
    setPassword(selectedPassword);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Demo Credentials Quick-Select */}
      <div className={styles.demoAccountsContainer}>
        <div className={styles.demoAccountsHeader}>
          <span>⚡ Quick Test Accounts</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Click to auto-fill
          </span>
        </div>
        <div className={styles.demoAccountsGrid}>
          <button
            type="button"
            className={styles.demoAccountCard}
            onClick={() => handleSelectDemo('+251911111111', 'customer123')}
          >
            <span className={styles.demoAccountRole}>👤 Customer (Almaz)</span>
            <span className={styles.demoAccountInfo}>+251911111111</span>
          </button>

          <button
            type="button"
            className={styles.demoAccountCard}
            onClick={() => handleSelectDemo('+251922222222', 'staff123')}
          >
            <span className={styles.demoAccountRole}>👨‍🍳 Staff (Abebe)</span>
            <span className={styles.demoAccountInfo}>+251922222222</span>
          </button>
        </div>
      </div>

      {/* Form submitting to Next.js Server Action */}
      <form
        action={(formData) => {
          startTransition(() => {
            action(formData);
          });
        }}
        className={styles.form}
      >
        <input type="hidden" name="next" value={next || '/'} />

        {/* Phone Number Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="signin-phone" className={styles.label}>
            Phone Number
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon} aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <input
              id="signin-phone"
              name="phone"
              type="text"
              required
              placeholder="+251911111111"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="signin-password" className={styles.label}>
              Password
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              (e.g. customer123)
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon} aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="signin-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              autoComplete="current-password"
            />
            <button
              type="button"
              id="signin-toggle-password"
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="signin-submit-btn"
          className={styles.submitBtn}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Verifying & Signing In...</span>
            </>
          ) : (
            <span>Sign In to Addis Eats →</span>
          )}
        </button>
      </form>
    </div>
  );
}
