import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          © 2026 <span className={styles.brand}>Addis Eats</span>. All rights reserved. Bringing Ethiopian Delights to Your Table.
        </p>
      </div>
    </footer>
  );
};

export default Footer;