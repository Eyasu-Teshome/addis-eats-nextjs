import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "./(components)/(header)/header";
import Footer from "./(components)/(footer)/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({  
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Cuisine",
  description: "Experience authentic Ethiopian food delivered fresh to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={styles.layoutBody}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

