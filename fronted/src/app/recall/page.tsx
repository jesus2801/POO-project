"use client";

import Decks from "@/components/Decks/Decks";
import styles from "./page.module.css";
import AppLayout from "@/components/AppLayout";

const ActiveRecall = () => {
  return (
    <AppLayout>
      <main className={styles.main}>
        <div className={styles.container}>
          <Decks />
        </div>
      </main>
    </AppLayout>
  );
};

export default ActiveRecall;
