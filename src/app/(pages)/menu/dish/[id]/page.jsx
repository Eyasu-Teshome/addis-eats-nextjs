import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import styles from './dishDetail.module.css';

export async function generateStaticParams() {
  try {
    const res = await fetch("https://addis-eats-backend.onrender.com/menu/");
    if (!res.ok) return [];

    const { data: dishes } = await res.json();
    return dishes.map((dish) => ({
      id: dish.id,
    }));
  } catch (e) {
    return [];
  }
}

const SingleDishDetail = async ({ params }) => {
  const { id } = await params;

  let dishes = [];
  try {
    const res = await fetch("https://addis-eats-backend.onrender.com/menu/", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      dishes = json.data || [];
    }
  } catch (e) {
    console.error("Failed fetching dish details:", e);
  }

  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <div>
        <Link href="/menu" className={styles.backLink}>
          ← Back to Menu
        </Link>
      </div>

      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <span className={styles.categoryBadge}>{dish.category}</span>
          <h1 className={styles.titleEn}>{dish.nameEn}</h1>
          {dish.nameAm && <p className={styles.titleAm}>{dish.nameAm}</p>}
        </div>
        <div className={styles.priceBadge}>{dish.priceETB} ETB</div>
      </div>

      <p className={styles.description}>{dish.description}</p>

      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Spice Level</span>
          <span className={styles.metaValue}>{dish.spiceLevel || 'Standard'}</span>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Servings</span>
          <span className={styles.metaValue}>{dish.servings || 1} Person</span>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Fasting / Vegan</span>
          <span className={styles.metaValue}>{dish.isFasting ? "Yes (Tsom)" : "No"}</span>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Speciality</span>
          <span className={styles.metaValue}>{dish.isSpecial ? "Chef Special ⭐" : "Standard"}</span>
        </div>
      </div>

      {dish.ingredients && dish.ingredients.length > 0 && (
        <div className={styles.ingredientsSection}>
          <h3 className={styles.ingredientsTitle}>Key Ingredients</h3>
          <div className={styles.ingredientsList}>
            {dish.ingredients.map((item, idx) => (
              <span key={idx} className={styles.ingredientTag}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default SingleDishDetail;
