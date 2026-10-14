"use client";

import useSWR from "swr";
import Loading from "./loading";
import Link from "next/link";
import styles from "./page.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {


  const { data, error, isLoading, mutate } = useSWR("/api/time", fetcher,{
    // refreshInterval: 1000,
    revalidateOnFocus: true,
    dedupingInterval: 10000
  });

  if (isLoading) return <div className={styles.homeContainer}><Loading /></div>;
  if (error)
    return (
      <div className={styles.homeContainer}>
        <p style={{ color: "#ef4444", fontSize: "1.2rem", fontWeight: "600" }}>Failed to load API data.</p>
      </div>
    );

  return (
    <main className={styles.homeContainer}>
      <div className={styles.heroCard}>
        <span className={styles.heroBadge}>Welcome to Addis Eats</span>
        <h1 className={styles.title}>
          Authentic <span className={styles.accentText}>Ethiopian</span> Culinary Experience
        </h1>
        <p className={styles.subtitle}>
          Discover rich flavors, spicy tibs, traditional fasting platters, and aromatic coffee delivered fresh.
        </p>

        <div className={styles.counterBox}>
          <span>Live API Request Count:</span>
          <span className={styles.counterValue}>{data?.counter ?? 0}</span>
        </div>
        <button onClick={()=>{
          mutate()
        }}>
          Refetch
        </button>

        <div className={styles.actionGroup}>
          <Link href="/menu" className={styles.primaryBtn}>
            Explore Full Menu →
          </Link>
        </div>
      </div>
    </main>
  );
}