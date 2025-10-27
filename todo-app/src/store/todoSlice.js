import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action) {
      state.items = action.payload;
      state.error = null;
    },
    addTodo(state, action) {
      state.items.push(action.payload);
      state.error = null;
    },
    updateTodo(state, action) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
      state.error = null;
    },
    deleteTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } =
  todoSlice.actions;

export default todoSlice.reducer;
