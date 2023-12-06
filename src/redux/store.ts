import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { useDispatch } from "react-redux";
import { TasksReducer } from "./redusers/tasks";
import { FiltersReducer } from "./redusers/filters";

const rootReducer = combineReducers({
  tasks: TasksReducer,
  filters: FiltersReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
