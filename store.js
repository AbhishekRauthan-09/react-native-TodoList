import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./redux/todoSlice"


export const store = configureStore({
  reducer: {
    todos:counterReducer
  },
})

