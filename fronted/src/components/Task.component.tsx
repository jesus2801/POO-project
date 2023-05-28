import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck as faSquareChecked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "../config/interfaces.config";
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { client } from "../config/axios.config";
import { loading } from "../utils/alerts";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

interface TaskProps {
  task: Task;
  setTasks: (tasks: Task[]) => void;
  tasks: Task[];
}

const TaskComponent: FC<TaskProps> = ({ task, setTasks, tasks }) => {
  const [value, setValue] = useState(task.content);
  const [update, setUpdate] = useState(false);
  const [done, setDone] = useState(task.done);
  const [firstRendered, setFirstRendered] = useState(true);

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setUpdate(true);
  };

  const onChangeChecked = (e: MouseEvent<HTMLOrSVGElement>) => {
    setDone(!done);
  };

  useEffect(() => {
    if (firstRendered) {
      setFirstRendered(false);
      return;
    }
    updateTask();
  }, [done]);

  const updateTask = async () => {
    loading(true);
    await client.put(`/tasks/${task.id}`, {
      ...task,
      content: value,
      done: done,
    });
    loading(false);

    setUpdate(false);
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...task,
            content: value,
            done: done,
          };
        }
        return t;
      })
    );
  };

  const onDelete = async () => {
    loading(true);
    await client.delete(`/tasks/${task.id}`);
    loading(false);

    setTasks(tasks.filter((t) => task.id !== t.id));
  };

  return (
    <>
      {/* @ts-ignore */}
      <ContextMenuTrigger id={task.id}>
        {/* @ts-ignore */}
        <ContextMenu id={task.id}>
          {/* @ts-ignore */}
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </ContextMenu>
        <input value={value} onChange={onChangeContent} />
        <FontAwesomeIcon
          onClick={onChangeChecked}
          icon={done ? faSquareChecked : faSquareCheck}
        />
      </ContextMenuTrigger>

      {update && <button onClick={updateTask}>Actualizar</button>}
    </>
  );
};

export default TaskComponent;
