import { useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { useSelector } from "react-redux";
import { Typography, Tag } from "antd";
import { StateSchema } from "../../types/storeTypes";
import { useAppDispatch } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";
import CheckableTag from "antd/es/tag/CheckableTag";
import { FiltersActions } from "../../redux/redusers/filters";

export const Filter = () => {
  const { tasks } = useSelector((state: StateSchema) => state.tasks);
  const { filters } = useSelector((state: StateSchema) => state.filters);
  const [allTags, setAllTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { Paragraph } = Typography;
  useEffect(() => {
    const tags = tasks
      .reduce<string[]>((acc, task) => {
        acc = [...acc, ...task.tags];
        return acc;
      }, [])
      .filter((item) => !filters.includes(item));
    setAllTags([...new Set(tags)]);
  }, [filters, tasks]);

  return (
    <div className={styles.filter}>
      <Paragraph rootClassName={styles.paragraph}>
        {filters.length > 0 ? (
          filters?.map((tag) => {
            return (
              <Tag
                closable
                key={uuidv4()}
                onClose={(e) => {
                  e.preventDefault();
                  dispatch(
                    FiltersActions.setFilters(
                      filters.filter((item) => item !== tag)
                    )
                  );
                }}
              >
                {tag}
              </Tag>
            );
          })
        ) : (
          <span className={styles.placeholder}>
            Select the available tags from the list below
          </span>
        )}
      </Paragraph>
      <div className={styles.tags}>
        {allTags.map((tag) => {
          return (
            <CheckableTag
              key={uuidv4()}
              className={styles.chackableTag}
              checked={filters?.includes(tag)}
              onChange={() =>
                dispatch(FiltersActions.setFilters([...filters, tag]))
              }
            >
              {tag}
            </CheckableTag>
          );
        })}
      </div>
    </div>
  );
};
