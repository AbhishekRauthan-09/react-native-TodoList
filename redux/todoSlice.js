import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTodolist: (state, action) => {
      state.value = action.payload;
    },
    addTodo: (state, action) => {
      console.log('done');
      state.value = action.payload;
    },
    deleteTodo: (state, action) => {
      console.log(action, 'action');
    },
  },
});

export const {addTodo, deleteTodo, setTodolist} = counterSlice.actions;

export default counterSlice.reducer;
