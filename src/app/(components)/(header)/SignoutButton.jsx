'use client'
import React from 'react'
import { destroySessionCookie } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from './Header.module.css';

const SignoutButton = () => {
    const handleSignOut = async () => {
        await destroySessionCookie();
        redirect("/");
    };
    return (
        <li className={styles.navItem}>
            <button onClick={handleSignOut} className={`${styles.navLink} ${styles.authLink}`}>Sign Out</button>
        </li>
    )
}

export default SignoutButton