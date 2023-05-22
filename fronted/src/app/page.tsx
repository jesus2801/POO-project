"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSquareCheck as faSquareChecked,
} from "@fortawesome/free-solid-svg-icons";
import { BackendTask, Task } from "../../config/interfaces.config";
import { client } from "../../config/axios.config";
import { AxiosResponse } from "axios";
import TaskComponent from "../../components/Task.component";

const opt: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export default function Home() {
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const response: AxiosResponse<BackendTask[]> = await client.get(
      "/tasks/eedd9a84-1578-43a1-919a-14848de1ae35"
    );
    setTasks(
      response.data.map((task) => {
        return {
          ...task,
          done: task.done === "true",
          date: new Date(task.date),
        };
      })
    );
  };

  useEffect(() => {
    getTasks();
    const today = new Date().toLocaleDateString("es-ES", opt);
    setDate(today);
  }, []);

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

            {tasks.map((task) => (
              <div key={task.id} className={styles.item}>
                <TaskComponent task={task} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}></div>
        <div className={styles.container}></div>
      </main>
    </>
  );
}
