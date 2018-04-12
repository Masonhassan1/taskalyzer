import * as actionTypes from 'store/actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    user: {},
    isAuthenticated: false,
    isLoading: false
};

export default function (state = initialState, action) {
    const token = localStorage.getItem('token');
    switch (action.type) {
        case actionTypes.AUTH_START:
        case actionTypes.USER_UPDATE_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true,
                token
            };
        case actionTypes.USER_LOADED:
        case actionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isLoading: false,
                isAuthenticated: true
            };
        case actionTypes.AUTH_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            };
        case actionTypes.USER_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: {},
                token: null
            };
        case actionTypes.AUTH_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: {},
                token: null
            };
        case actionTypes.USER_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
