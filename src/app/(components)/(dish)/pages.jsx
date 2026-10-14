import React from 'react';
import styles from './DishCard.module.css';

const DishCard = ({ dish }) => {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.badgeGroup}>
          <span className={styles.categoryBadge}>{dish.category || 'Special'}</span>
          <span className={styles.priceTag}>{new Intl.NumberFormat('en-US',{style:'currency',currency:'EUR'}).format(dish.priceETB)}</span>
        </div>
        <h2 className={styles.title}>{dish.nameEn || dish.name}</h2>
        <p className={styles.description}>{dish.description}</p>
      </div>
      
      <div className={styles.cardFooter}>
        <span className={styles.viewDetails}>
          View Dish <span>→</span>
        </span>
      </div>
    </div>
  );
};

export default DishCard;