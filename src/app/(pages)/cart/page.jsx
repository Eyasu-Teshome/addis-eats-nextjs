'use client';
import React from 'react';
import styles from './cart.module.css';

const CartPage = () => {
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartCard}>
                <h1 className={styles.title}>🛒 Your Shopping Cart</h1>
                <p className={styles.message}>Your cart is currently empty. Add some delicious dishes from our menu!</p>
            </div>
        </div>
    );
};

export default CartPage;
