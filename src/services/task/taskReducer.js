import * as TT from "./taskTypes";

const initialState = {
    task: '', error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TT.SAVE_TASK_REQUEST:
        case TT.FETCH_TASK_REQUEST:
        case TT.UPDATE_TASK_REQUEST:
        case TT.DELETE_TASK_REQUEST:
        case TT.FETCH_PRIORITIES_REQUEST:
        case TT.FETCH_STATUS_REQUEST:
            return {
                ...state
            }
        case TT.TASK_SUCCESS:
            return {
                task: action.payload,
                error: ''
            }
        case TT.TASK_FAILURE:
            return {
                task: '',
                error: action.payload
            }
        case TT.PRIORITIES_SUCCESS:
            return {
                task: action.payload,
                error: ''
            }
        case TT.PRIORITIES_FAILURE:
            return {
                task: '',
                error: action.payload
            }
        case TT.STATUS_SUCCESS:
            return {
                task: action.payload,
                error: ''
            }
        case TT.STATUS_FAILURE:
            return {
                task: '',
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;