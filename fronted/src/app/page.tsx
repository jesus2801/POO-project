"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSquareCheck as faSquareChecked,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const opt: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export default function Home() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("es-ES", opt);
    setDate(today);
  });

  return (
    <>
      <div className={styles.header}>
        <p>{date}</p>
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <Image
              src="/profile.png"
              width={250}
              height={250}
              alt="Profile picture"
            />
            <p>@user.login</p>
          </div>
          <p>Total de tareas completadas: 1234</p>
          <div className={styles.tasks}>
            <p className={styles.title}>
              Tareas Pendientes
              <FontAwesomeIcon icon={faPlus} />
            </p>

            <div className={styles.item}>
              <p>Informe de estructura</p>
              <FontAwesomeIcon icon={faSquareCheck} />
            </div>
          </div>
        </div>
        <div className={styles.container}></div>
        <div className={styles.container}></div>
      </main>
    </>
  );
}
