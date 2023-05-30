"use client";

import AppLayout from "@/components/AppLayout";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { randomMessage } from "@/utils/functions.utils";
import { loading, obtainInfo } from "@/utils/alerts";
import { client } from "@/config/axios.config";
import { Habit } from "@/config/interfaces.config";
import HabitComponent from "@/components/Habit/Habit.component";
import Image from "next/image";
import Return from "@/components/Return/Return";

const opt: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const Habits = () => {
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);

  const getHabits = async () => {
    loading(true);
    const response = await client.get("/habits");
    loading(false);

    setHabits(response.data);
  };

  const addHabit = async () => {
    try {
      const info = await obtainInfo(
        [
          {
            label: "nombre del hábito",
            name: "name",
            type: "text",
          },
        ],
        "Agregar Hábito",
        "Agregar"
      );

      loading(true);
      const response = await client.post("/habits", info);
      loading(false);

      setHabits([...habits, response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHabits();
    const today = new Date().toLocaleDateString("es-ES", opt);
    setDate(today);
    setQuote(randomMessage());
  }, []);

  return (
    <AppLayout>
      <Return />
      <div className={styles.main}>
        <div className={styles.container}>
          <Image
            width={50}
            height={50}
            onClick={addHabit}
            src="/habits/add.svg"
            alt="Agregar"
          />
          <div className={styles.header}>
            <p>Registro de Hábitos Mensuales</p>
          </div>
          <div className={styles.habits}>
            {habits.map((habit) => (
              <HabitComponent
                habits={habits}
                setHabits={setHabits}
                habit={habit}
                key={habit.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <p>{date}</p>
          <p>{quote}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Habits;
