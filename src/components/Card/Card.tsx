import { FC, useState } from "react";
import styles from "./Card.module.css";
import { Button, Card as CardAntd, Modal } from "antd";
import { CreateCardForm } from "../CreateCardForm/CreateCardForm";
import { CloseOutlined } from "@ant-design/icons";
import { TaskType } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import { TasksActions } from "../../redux/redusers/tasks";
import { handleTags } from "../helpers/handleTags";

type CardType = {
  task: TaskType;
};

export const Card: FC<CardType> = ({ task }) => {
  const [isFulfiled, setIsFulfiled] = useState(false);
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as Element).className.toString().includes("ant-card")) {
      setIsFulfiled(true);
    }
  };

  return (
    <>
      {isFulfiled && (
        <Modal
          title={handleTags(task.title)}
          open={isFulfiled}
          footer={null}
          centered
          classNames={{ body: styles.modalBody }}
          onCancel={() => setIsFulfiled(false)}
        >
          <>
            <div className={styles.content}>{handleTags(task.content)}</div>
            <div className={styles.tags}>
              {task.tags.map((e) => `#${e}`).join(" ,")}
            </div>
          </>
        </Modal>
      )}
      <div className={styles.card}>
        <CardAntd
          title={handleTags(task.title)}
          extra={
            <span className={styles.icons}>
              <CreateCardForm item={task} />
              <Button
                icon={<CloseOutlined />}
                onClick={() => dispatch(TasksActions.removeTask(task.id))}
              />
            </span>
          }
          style={{ width: 300 }}
          hoverable
          onClick={handleClick}
        >
          {handleTags(task.content)}
        </CardAntd>
      </div>
    </>
  );
};
