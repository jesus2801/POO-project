import { Habit } from "@/config/interfaces.config";
import styles from "./habit.module.css";
import { MouseEvent } from "react";
import { loading, showMessage } from "@/utils/alerts";
import { client } from "@/config/axios.config";
import "./default.styles.css";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

interface HabitProps {
  habit: Habit;
  habits: Habit[];
  setHabits: (x: Habit[]) => void;
}

const Habit = ({ habit, setHabits, habits }: HabitProps) => {
  const onCheckboxClick = async (e: MouseEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    const newDays = habit.fullfilled.map((d, i) => {
      if (i === parseInt(t.parentNode!.querySelector("p")!.innerText) - 1) {
        return !d;
      }
      return d;
    });
    loading(true);
    await client.put(`/habits/${habit.id}`, {
      fullfilled: newDays,
    });
    loading(false);

    setHabits(
      //@ts-ignore
      habits.map((h) => {
        //@ts-ignore
        if (h.id == habit.id) {
          //@ts-ignore
          return {
            //@ts-ignore
            ...habit,
            //@ts-ignore
            fullfilled: newDays,
          };
        }
        return h;
      })
    );
    t!.classList.toggle("checked");
  };

  const onDelete = async () => {
    loading(true);
    await client.delete(`/habits/${habit.id}`);
    loading(false);

    setHabits(habits.filter((h) => h.id !== habit.id));
    showMessage("Hábito eliminado correctamente", "success");
  };

  return (
    <>
      {/*@ts-ignore*/}
      <ContextMenuTrigger id={habit.id}>
        {/*@ts-ignore*/}
        <ContextMenu id={habit.id}>
          {/*@ts-ignore*/}
          <MenuItem onClick={onDelete}>Eliminar</MenuItem>
        </ContextMenu>
        <div className={styles.habit}>
          <div className={styles.titles}>
            <p>Hábito de:</p>
            <p>{habit.name}</p>
          </div>
          {habit.fullfilled.map((day, i) => (
            <div key={habit.id + i} className={styles.day}>
              <p>{i + 1}</p>
              <div
                className={day ? "checked" : ""}
                onClick={onCheckboxClick}
              ></div>
            </div>
          ))}
        </div>
      </ContextMenuTrigger>
    </>
  );
};

export default Habit;
