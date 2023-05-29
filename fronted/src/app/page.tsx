"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BackendTask, Session, Task } from "../config/interfaces.config";
import { client } from "../config/axios.config";
import { AxiosResponse } from "axios";
import TaskComponent from "../components/Task.component";
import { loading, obtainInfo } from "../utils/alerts";
import {
  dueDate,
  parseSessionsStatistics,
  randomMessage,
} from "../utils/functions.utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { NextPage } from "next";
import AppLayout from "@/components/AppLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const opt: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const Home: NextPage = () => {
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [reminders, setReminders] = useState<Task[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    try {
      const response: AxiosResponse<BackendTask[]> = await client.get("/tasks");
      setTasks(
        response.data.map((task) => {
          return {
            ...task,
            done: task.done === "true",
            date: new Date(task.date),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async () => {
    try {
      const task: any = await obtainInfo(
        [
          { label: "Tarea", type: "text", name: "content" },
          { label: "Categoría", type: "text", name: "category" },
          { label: "Fecha:", type: "date", name: "date" },
        ],
        "Ingresa la tarea: ",
        "Agregar"
      );

      loading(true);
      const response = await client.post("/tasks", task);
      loading(false);

      setTasks([
        ...tasks,
        {
          ...response.data,
          done: response.data.done === "true",
          date: new Date(response.data.date),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const getStatistics = async () => {
    const response = await client.get(`/sessions`);
    const sessions = response.data.map((s: Session) => {
      return {
        ...s,
        initDate: new Date(s.initDate),
        endDate: new Date(s.endDate),
      };
    });

    if (sessions.length > 0) {
      const [l, d, t] = parseSessionsStatistics(sessions);
      setLabels(l);
      setData(d);
      setTitle(t.toLocaleDateString("es-ES", opt));
    }
  };

  useEffect(() => {
    getTasks();
    getStatistics();
    const today = new Date().toLocaleDateString("es-ES", opt);
    setDate(today);
    setQuote(randomMessage());
  }, []);

  useEffect(() => {
    let s = 0;
    for (let i = 0, n = tasks.length; i < n; i++) s += tasks[i].done ? 1 : 0;

    const r = tasks.filter((reminder) => !reminder.done);
    r.sort((a, b) => {
      if (a.date < b.date) return -1;
      else if (a.date > b.date) return 1;
      return 0;
    });
    if (r.length > 3) {
      setReminders(r.slice(0, 3));
    } else setReminders(r);

    setCompletedTasks(s);
  }, [tasks]);

  return (
    <AppLayout>
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
          <p>Total de tareas completadas: {completedTasks}</p>
          <div className={styles.tasks}>
            <p className={styles.title}>
              Tareas Pendientes
              <FontAwesomeIcon icon={faPlus} onClick={addTask} />
            </p>

            {tasks.map((task) => (
              <div key={task.id} className={styles.item}>
                <TaskComponent task={task} setTasks={setTasks} tasks={tasks} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.container}>
          <p className={styles.quote}>{quote}</p>
          <div className={styles.divider}></div>
          <div className={styles.reminders}>
            {reminders.map((reminder) => (
              <div key={reminder.id} className={styles.reminder}>
                <div>
                  <Image src="/bell.svg" width={30} height={30} alt="campana" />
                  <p>{dueDate(reminder.date)}</p>
                </div>
                <p className={styles.reminder_text}>{reminder.content}</p>
                <p className={styles.reminder_category}>{reminder.category}</p>
              </div>
            ))}
          </div>
          <div className={styles.statistics}>
            <Bar
              data={{
                labels: labels,
                datasets: [
                  {
                    label: title,
                    data: data,
                    backgroundColor: "#F9AEAE",
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.menu}>
            <div className={styles.menu_item}>
              <Link href="/habits">
                <div>
                  <Image
                    src="/calendar.svg"
                    width={52}
                    height={52}
                    alt="calendario"
                  />
                </div>
              </Link>
              <p>Hábitos Mensuales</p>
            </div>

            <div className={styles.menu_item}>
              <Link href="/flashcards">
                <div>
                  <Image src="/cards.svg" width={52} height={52} alt="cards" />
                </div>
              </Link>
              <p>Flash Cards</p>
            </div>

            <div className={styles.menu_item}>
              <Link href="/recall">
                <div>
                  <Image
                    src="/recall.svg"
                    width={52}
                    height={52}
                    alt="active recall"
                  />
                </div>
              </Link>
              <p>Active Recall</p>
            </div>

            <div className={styles.menu_item}>
              <Link href="/flowtime">
                <div>
                  <Image
                    src="/flow.svg"
                    width={52}
                    height={52}
                    alt="flowtime"
                  />
                </div>
              </Link>
              <p>Flowtime</p>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Home;
