import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CreateCardForm } from "../CreateCardForm/CreateCardForm";
import styles from "./TaskList.module.css";
import { StateSchema } from "../../types/storeTypes";
import { Card } from "../Card/Card";
import { Filter } from "../Filter/Filter";

export const TaskList = () => {
  const { tasks } = useSelector((state: StateSchema) => state.tasks);
  const { filters } = useSelector((state: StateSchema) => state.filters);
  const [filteredTasks, setfilteredTasks] = useState(tasks);

  useEffect(() => {
    setfilteredTasks(
      filters.length > 0
        ? tasks.filter((task) => task.tags.some((tag) => filters.includes(tag)))
        : tasks
    );
  }, [filters, tasks]);
  return (
    <div className={styles.tasklist}>
      <div className={styles.title}> Add your tasks</div>
      <div className={styles.controls}>
        <Filter />
        <CreateCardForm />
      </div>
      <div className={styles.wrapper}>
        {filteredTasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
