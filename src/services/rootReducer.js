import {combineReducers} from 'redux';
import userReducer from './user/userReducer'
import authReducer from './user/auth/authReducer'
import taskReducer from "./task/taskReducer";


const rootReducer = combineReducers({
    user: userReducer,
    task: taskReducer,
    auth: authReducer
})

export default rootReducer;