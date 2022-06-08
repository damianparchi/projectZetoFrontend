import * as TT from "./taskTypes";
import axios from "axios";

export const saveTask = task => {
    return dispatch => {
        dispatch({
            type: TT.SAVE_TASK_REQUEST
        })
        axios.post("http://localhost:8080/tasks", task)
            .then(response => {
                dispatch(taskSuccess(response.data))
            })
            .catch(error => {
                dispatch(taskFailure(error))
            })
    }
}

export const fetchTask = taskId => {
    return dispatch => {
        dispatch({
            type: TT.FETCH_TASK_REQUEST
        })
        axios.get("http://localhost:8080/tasks/"+taskId)
            .then(response => {
                dispatch(taskSuccess(response.data))
            })
            .catch(error => {
                dispatch(taskFailure(error))
            })
    }
}

export const updateTask = task => {
    return dispatch => {
        dispatch({
            type: TT.UPDATE_TASK_REQUEST
        })
        axios.put("http://localhost:8080/tasks", task)
            .then(response => {
                dispatch(taskSuccess(response.data))
            })
            .catch(error => {
                dispatch(taskFailure(error))
            })
    }
}

export const deleteTask = taskId => {
    return dispatch => {
        dispatch({
            type: TT.DELETE_TASK_REQUEST
        })
        axios.delete("http://localhost:8080/tasks/"+taskId)
            .then(response => {
                dispatch(taskSuccess(response.data))
            })
            .catch(error => {
                dispatch(taskFailure(error))
            })
    }
}

const taskSuccess = task => {
    return {
        type: TT.TASK_SUCCESS,
        payload: task
    }
}

const taskFailure = error => {
    return {
        type: TT.TASK_FAILURE,
        payload: error
    }
}

export const fetchPriorities = () => {
    return dispatch => {
        dispatch({
            type: TT.FETCH_PRIORITIES_REQUEST
        })
        axios.get("http://localhost:8080/tasks/priorytety")
            .then(response => {
                dispatch({
                    type: TT.PRIORITIES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: TT.PRIORITIES_FAILURE,
                    payload: error
                })
            })

    }
}

export const fetchStatus = () => {
    return dispatch => {
        dispatch({
            type: TT.FETCH_STATUS_REQUEST
        })
        axios.get("http://localhost:8080/tasks/statusy")
            .then(response => {
                dispatch({
                    type: TT.STATUS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: TT.STATUS_FAILURE,
                    payload: error
                })
            })
    }
}