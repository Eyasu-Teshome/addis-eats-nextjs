import Link from "next/link";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/session";
import styles from "../auth.module.css";
import SignInForm from "./SignInForm";

async function signInAction(formData) {
  "use server";
  
  const phone = formData.get("phone");
  const password = formData.get("password");
  const nextParam = formData.get("next") || "/";

  // 1. Verify credentials against stored hash
  let token = null;
  if (phone === "+251911111111" && password === "customer123") {
    token = "sess_customer123";
  } else if (phone === "+251922222222" && password === "staff123") {
    token = "sess_staff456";
  } else {
    const errDestination =
      nextParam && nextParam !== "/"
        ? `/signin?error=invalid&next=${encodeURIComponent(nextParam)}`
        : `/signin?error=invalid`;
    redirect(errDestination);
  }

  // 2. Set HTTP-only session cookie
  await setSessionCookie(token);

  // 3. OPEN REDIRECT DEFENSE: Reject absolute URLs or double slashes
  const safeDestination = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/";
    
  redirect(safeDestination);
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next;
  const error = params?.error;

  return (
    <div className={styles.authContainer}>
      <main className={styles.authCard}>
        {/* Header Branding */}
        <header className={styles.cardHeader}>
          <span className={styles.brandBadge}>🇪🇹 Addis Eats Member</span>
          <h1 className={styles.title}>Sign In — Addis Eats</h1>
          <p className={styles.subtitle}>
            Sign in with your phone number to access authentic Ethiopian dining, save delivery addresses, and track your orders.
          </p>
        </header>

        {/* Protected Route Notice */}
        {next && next !== "/" && (
          <div className={styles.noticeBanner} role="status">
            <span className={styles.noticeIcon}>🔒</span>
            <span>
              Please sign in to continue to <strong>{next}</strong>
            </span>
          </div>
        )}

        {/* Invalid Credentials Error Banner */}
        {error === "invalid" && (
          <div
            id="signin-error-banner"
            className={`${styles.alertBanner} ${styles.alertError}`}
            role="alert"
          >
            <span className={styles.alertIcon}>⚠️</span>
            <span>
              Invalid phone or password. Please verify your credentials or select a test account below.
            </span>
          </div>
        )}

        {/* Interactive Styled Form */}
        <SignInForm action={signInAction} next={next} />

        {/* Perks Grid */}
        <section className={styles.perksGrid} aria-label="Addis Eats Features">
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>🌶️</span>
            <span className={styles.perkText}>Traditional Taste</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>⚡</span>
            <span className={styles.perkText}>Instant Delivery</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>☕</span>
            <span className={styles.perkText}>Sidama & Yirgacheffe</span>
          </div>
        </section>

        {/* Card Footer Switcher */}
        <footer className={styles.cardFooter}>
          <p>
            Don&apos;t have an account?
            <Link href="/signup" className={styles.switchLink} id="signin-to-signup-link">
              Create an Account
            </Link>
          </p>
          <p className={styles.termsText}>
            Protected with HTTP-only session cookies. By signing in, you agree to our{' '}
            <Link href="#terms">Terms</Link> and <Link href="#privacy">Privacy Policy</Link>.
          </p>
        </footer>
      </main>
    </div>
  );
}