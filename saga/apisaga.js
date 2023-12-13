import  { call , put , takeEvery, all, takeLatest } from 'redux-saga/effects';
import { getTodos } from '../components/Apis';
import { addToDo as addTodotoList } from '../components/Apis';
import { addTodo, getTodosListSuccess , gettingTodosList } from '../redux/todoSlice';

console.log("in saga file")
function* workgetTodos(){
    console.log("getting todos in saga")
    const todos = yield call(getTodos)
    const todosList = yield todos.data;
    console.log("successfully loaded from saga" , todosList)
    yield put(getTodosListSuccess(todosList))
}

function* todoSaga(){
    console.log("in to do saga")
    yield takeLatest( gettingTodosList ,workgetTodos)
}

// function* addTodos(){
//     yield call(addTodotoList)
// }

// function* addTodoSaga(){
//     yield takeLatest(addTodo , addTodos)
// }

export function* apiSaga(){
    yield all([
        call(todoSaga)
    ])
};