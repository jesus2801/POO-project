"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const opt: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
};

export default function Home() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("es-ES", opt);
    setDate(today);
  });

  return (
    <>
      <div>
        <p>{date}</p>
      </div>
    </>
  );
}
