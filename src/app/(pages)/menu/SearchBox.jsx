"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [term]);

  const { data: dishes, isLoading } = useSWR(
    debouncedTerm ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}` : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputGroup}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search menu (e.g., Tibs, Shiro)..."
          className={styles.searchInput}
        />
      </div>

      {isLoading && (
        <p className={styles.loadingText}>Searching menu items...</p>
      )}

      {dishes && dishes.length > 0 && (
        <ul className={styles.dropdownList}>
          {dishes.map((dish) => (
            <li 
              key={dish.id || dish.name} 
              className={styles.dropdownItem}
            >
              <span>{dish.name}</span>
              <span className={styles.price}>${dish.price}</span>
            </li>
          ))}
        </ul>
      )}

      {debouncedTerm && dishes && dishes.length === 0 && !isLoading && (
        <p className={styles.emptyText}>
          No dishes found matching &quot;{debouncedTerm}&quot;.
        </p>
      )}
    </div>
  );
}
