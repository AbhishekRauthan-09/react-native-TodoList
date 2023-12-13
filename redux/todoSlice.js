import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
  isLoading: false,
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

    gettingTodosList: (state) => {
      state.isLoading = true;
    },
    getTodosListSuccess: (state, action) =>{
      state.isLoading = false;
      state.value = action.payload;
    },
  },
});

export const {addTodo, deleteTodo, setTodolist , gettingTodosList, getTodosListSuccess} = counterSlice.actions;

export default counterSlice.reducer;
