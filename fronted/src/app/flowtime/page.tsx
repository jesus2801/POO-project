"use client";

import AppLayout from "@/components/AppLayout";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";
import { client } from "@/config/axios.config";
import { loading, showMessage } from "@/utils/alerts";
import Return from "@/components/Return/Return";

const Flowtime = () => {
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [interval, sInterval] = useState<any>();

  const changePlay = () => {
    if (play) {
      setPlay(false);
      //@ts-ignore
      clearInterval(interval);
    } else {
      setPlay(true);
      sInterval(
        setInterval(() => {
          setTime((time) => time + 1);
        }, 1000)
      );
    }
  };

  const onStop = async () => {
    setPlay(false);
    clearInterval(interval);

    if (time > 0) {
      loading(true);
      await client.post("/sessions", {
        reviewed_cards: 0,
        reached_goals: 0,
        initDate: new Date(Date.now() - time * 1000),
        endDate: new Date(Date.now()),
      });
      loading(false);
      showMessage("Sesión agregada correctamente", "success");
    }

    setTime(0);
  };

  const onGoalClick = () => {
    if (play) {
      loading(true);
      setTimeout(() => {
        loading(false);
        showMessage("Objetivo agregado correctamente", "success");
      }, 700);
    } else {
      showMessage(
        "No podemos agregar tu objetivo sin una sesión activa",
        "error"
      );
    }
  };

  return (
    <AppLayout>
      <Return />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.help}>
            <Image width={65} height={60} src="/flowtime/help.svg" alt="help" />
            <p>Recordatorio: pausa cuando dejes de realizar la acción.</p>
          </div>
          <div className={styles.clock}>
            <div className={styles.circle}>
              <div className={styles.innerCircle}>
                <p>{new Date(time * 1000).toISOString().slice(11, 19)}</p>
                <div>
                  <Image
                    src="/flowtime/stop.svg"
                    width={23}
                    height={23}
                    alt="stop"
                    onClick={onStop}
                  />

                  <Image
                    src={play ? "/flowtime/pause.svg" : "/flowtime/play.svg"}
                    width={25}
                    height={25}
                    alt="stop"
                    onClick={changePlay}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.presets}>
            <div className={styles.goal} onClick={onGoalClick}>
              <div>
                <p>{"20'"}</p>
              </div>
              <p className={styles.goal_title}>Diverso</p>
            </div>

            <div className={styles.goal} onClick={onGoalClick}>
              <div>
                <p>{"30'"}</p>
              </div>
              <p className={styles.goal_title}>Tarea</p>
            </div>

            <div className={styles.goal} onClick={onGoalClick}>
              <div>
                <p>{"40'"}</p>
              </div>
              <p className={styles.goal_title}>Estudio</p>
            </div>

            <div className={styles.goal} onClick={onGoalClick}>
              <div>
                <p>{"50'"}</p>
              </div>
              <p className={styles.goal_title}>Trabajo</p>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Flowtime;
