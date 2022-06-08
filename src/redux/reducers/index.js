import { combineReducers } from "redux";

import auth from './auth';
import taskReducer from "./task/taskReducer";


const rootReducer = combineReducers({
    auth,
    task: taskReducer,
})

export default combineReducers;