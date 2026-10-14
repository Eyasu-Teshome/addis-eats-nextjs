import styles from "./orderDetail.module.css";

async function getOrder(id) {
  try {
    const res = await fetch(`https://api.addiseats.com/orders/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function OrderPage({ params }) {
  const { id } = await params;
  const initialOrder = await getOrder(id);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Order #{id}</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Status: {initialOrder?.status || "Processing"}
        </p>
      </div>
    </main>
  );
}
