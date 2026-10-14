import SideBar from '@/app/(components)/(sidebar)/SideBar';
import React from 'react';
import styles from './menuLayout.module.css';

const MenuLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MenuLayout;