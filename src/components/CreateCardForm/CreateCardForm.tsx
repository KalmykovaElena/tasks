import { FC, useState, useEffect } from "react";
import { Button, Modal, Typography } from "antd";
import styles from "./CreateCardForn.module.css";
import { EditOutlined } from "@ant-design/icons";
import { TaskType } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import { TasksActions } from "../../redux/redusers/tasks";
import { v4 as uuidv4 } from "uuid";
import { handleTags } from "../helpers/handleTags";

type ModalProps = {
  item?: TaskType;
};

export const CreateCardForm: FC<ModalProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.content || "");
  const [tags, setTags] = useState<string[]>([]);
  const { Paragraph } = Typography;
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
    setTitle(item?.title || "");
    setDescription(item?.content || "");
  };
  const handleOk = () => {
    if (title || description) {
      const task = {
        id: item ? item.id : uuidv4(),
        title: title || description.slice(0, 20),
        content: description,
        tags
      };
      dispatch(
        item ? TasksActions.updateTask(task) : TasksActions.addTask(task)
      );
      onClose();
    }
  };

  useEffect(() => {
    setTags(
      (title +' ' +description).split("#").reduce<string[]>((acc, el, index) => {
        if (index > 0) {
          el.split(" ").map((word, i) => {
            if (i === 0) {
              return (acc = [...acc, word]);
            }
          });
        }
        return acc;
      }, [])
    );
  }, [description, title]);
  return (
    <div className={styles.createcardform}>
      {item ? (
        <Button icon={<EditOutlined />} onClick={handleButtonClick} />
      ) : (
        <Button type="primary" onClick={handleButtonClick}>
          Add task
        </Button>
      )}
      <Modal
        title={item ? "Edit the task" : "Add a task"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => onClose()}
      >
        {" "}
        <div className={styles.wrapper}>
          <Paragraph editable={{ text: title, onChange: setTitle }}>
            {title ? (
              handleTags(title)
            ) : (
              <span className={styles.placeholder}>Title</span>
            )}
          </Paragraph>
          <Paragraph
            rootClassName={styles.paragraph}
            editable={{
              text: description,
              onChange: setDescription,
              autoSize: { minRows: 4 },
            }}
          >
            {description ? (
              handleTags(description)
            ) : (
              <span className={styles.placeholder}>Description</span>
            )}
          </Paragraph>
          <div className={styles.tags}> {tags.map(e=>`#${e}`).join(" ,")}</div>
        </div>
      </Modal>
    </div>
  );
};
