'use client';
import React from 'react';
import styles from './error.module.css';

const Error = ({error}) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <h1 className={styles.title}>{error.message}</h1>
        <p style={{ color: '#7f1d1d', fontSize: '0.95rem' }}>We encountered an unexpected error loading this page.</p>
        <button 
          onClick={() => window.location.href='/'} 
          className={styles.button}
        >
          Return to Home
        </button>
      </div>
    </div>  
  );
};

export default Error;