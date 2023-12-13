import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './redux/todoSlice';

import createSagaMiddleware from 'redux-saga'
import {apiSaga} from './saga/apisaga';


const saga = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    todos: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(saga),
});
saga.run(apiSaga)