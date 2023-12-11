import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [
    {
      id:1,
      title: 'Go for Running..',
      desc: 'ah ofhuahdf uhuisdfu sdfigdf',
      date: '8-12-23',
      done: false,
    },
    {
      id:2,
      title: 'Take medicine..',
      desc: 'ah ofhuahdf uhuisdfu sdfigdf',
      date: '18-12-23',
      done: true,
    },
    {
      id:3,
      title: 'Have lunch',
      desc: 'ah ofhuahdf uhuisdfu sdfigdf',
      date: '19-12-23',
      done: false,
    },
    {
      id:4,
      title: 'Go To bed..',
      desc: 'ah ofhuahdf uhuisdfu sdfigdf',
      date: '24-12-23',
      done: true,
    },
  ],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    setTodolist: (state, action) => {
        state.value = action.payload;
    },
    addTodo: (state, action) => {
      console.log("done")
        state.value = action.payload;
    },
    deleteTodo: (state, action) => {
      console.log(action, 'action');
    },
  },
});

export const {addTodo, deleteTodo , setTodolist} = counterSlice.actions;

export default counterSlice.reducer;
