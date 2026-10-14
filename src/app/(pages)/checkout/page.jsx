import { cookies } from "next/headers";
import styles from "./checkout.module.css";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Complete Your Order</h1>
                <div>
                    <span className={`${styles.statusBadge} ${sessionToken ? styles.auth : styles.guest}`}>
                        {sessionToken ? "🔒 Authenticated Checkout" : "👤 Guest Checkout"}
                    </span>
                </div>
            </div>
        </div>
    );
}
