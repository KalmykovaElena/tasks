import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskSchema } from "../../types/storeTypes";
import { TaskType } from "../../types/types";

const initialState = {
  filters: [],
  tasks: [],
} as TaskSchema;

export const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.content = action.payload.content;
      }
    },
    setFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = action.payload;
    },
  },
});

export const { actions: TasksActions } = TasksSlice;
export const { reducer: TasksReducer } = TasksSlice;
