import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FiltersSchema } from "../../types/storeTypes";

const initialState = {
  filters: [],
} as FiltersSchema;

export const FiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = action.payload;
    },
  },
});

export const { actions: FiltersActions } = FiltersSlice;
export const { reducer: FiltersReducer } = FiltersSlice;
