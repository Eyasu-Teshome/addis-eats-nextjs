import React from 'react';
import styles from './SideBar.module.css';
// import useSWR from 'swr';


const fetcher = (url) => fetch(url).then((res) => res.json());

const SideBar = () => {

//      const { data, error, isLoading } = useSWR("/api/time", fetcher,{
//     // refreshInterval: 1000,
//     revalidateOnFocus: true,
//     dedupingInterval: 10000
//   });

  return (
    <aside className={styles.sidebar}> 
      <h3 className={styles.title}>
        <span>🍽️</span> Categories
      </h3>
      <ul className={styles.categoryList}>
        <li className={`${styles.categoryItem} ${styles.active}`}>All</li>
        <li className={styles.categoryItem}>Starter</li>
        <li className={styles.categoryItem}>Main Course</li>
        <li className={styles.categoryItem}>Dessert</li>
        <li className={styles.categoryItem}>Beverage</li>
      </ul>
      {/* <p>{data?.counter}</p> */}
    </aside>
  );
};

export default SideBar;