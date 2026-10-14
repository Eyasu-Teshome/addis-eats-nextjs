import Link from 'next/link';
import React from 'react';
import DishCard from '../(dish)/pages';
import styles from './MenuWrapper.module.css';

const MenuWrapper = async () => {
    let data = { data: [] };
    try {
        const response = await fetch("https://addis-eats-backend.onrender.com/menu/", {
            next: { revalidate: 3600 }
        });
        if (response.ok) {
            data = await response.json();
        }
    } catch (e) {
        console.error("Failed fetching menu:", e);
    }

    return (
        <div className={styles.grid}>
            {data?.data?.map(item => (
                <Link href={`/menu/dish/${item.id}`} key={item.id} className={styles.dishLink}>
                    <DishCard dish={item} />
                </Link>
            ))}
        </div>
    );
};

export default MenuWrapper;