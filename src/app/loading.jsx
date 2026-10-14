import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <p className={styles.text}>Preparing tasty details...</p>
    </div>
  );
};

export default Loading;