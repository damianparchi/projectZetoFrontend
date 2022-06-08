import {LOGIN_REQUEST, SUCCESS, FAILURE, LOGOUT_REQUEST} from "./authTypes";

const initialState = {
    username: '',
    isLoggedIn: '',
    role_id: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state
            }
        case SUCCESS:
        case FAILURE:
            return {
                username: action.payload.username,
                isLoggedIn: action.payload.isLoggedIn, //zwrocvaluexpayload
            }
        default:
            return state
    }
}

export default reducer;