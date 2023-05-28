"use client"

import Decks from "@/components/Decks/Decks";
import styles from "./page.module.css";

const ActiveRecall = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Decks />
      </div>
    </main>
  );
};

export default ActiveRecall;
