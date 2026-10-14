import MenuWrapper from '@/app/(components)/(menu-wrapper)/MenuWrapper';
import Loading from '@/app/loading';
import React, { Suspense } from 'react';
import SearchBox from './SearchBox';
import styles from './menuPage.module.css';

export const revalidate = 3600;

const MenuPage = async () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerSection}>
                <h1 className={styles.title}>Our Delicious Menu</h1>
                <p className={styles.subtitle}>Explore authentic Ethiopian specialties freshly prepared for you.</p>
            </div>
            
            <SearchBox />

            <Suspense fallback={<Loading />}>
                <MenuWrapper />
            </Suspense>
        </div>
    );
};

export default MenuPage;
