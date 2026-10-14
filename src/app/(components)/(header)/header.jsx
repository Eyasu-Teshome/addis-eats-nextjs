import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🇪🇹</span>
                    <span>Addis Eats</span>
                </Link>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/menu" className={styles.navLink}>Menu</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/cart" className={styles.navLink}>Cart</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/checkout" className={styles.navLink}>Checkout</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/orders" className={styles.navLink}>Orders</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/signin" className={styles.navLink}>Sign In</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/signup" className={`${styles.navLink} ${styles.authLink}`}>Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;






// Authentication -- Who is the user?
// Authorization -- What the user can access?


// HTTP -- Stateless