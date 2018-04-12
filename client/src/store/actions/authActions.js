import axios from 'axios';

import * as actionTypes from './actionTypes';
import { headerConfig } from './config';

// LOGIN USER
export const login = (user) => (dispatch) => {
    dispatch({
        type: actionTypes.AUTH_START
    });
    dispatch({
        type: actionTypes.TASKS_READ_START
    });
    axios
        .post('/api/auth/login', user)
        .then((res) => {
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: actionTypes.TASKS_READ_SUCCESS,
                payload: res.data
            });
        })
        .catch((error) => {
            let errors = null;
            if (
                Object.prototype.hasOwnProperty.call(error, 'response') &&
                error.response !== undefined
            ) {
                errors = {
                    msg: error.response
                };
            } else {
                errors = {
                    msg: 'Service unavailable',
                    status: 503
                };
            }
            dispatch({
                type: actionTypes.AUTH_FAIL
            });
            dispatch({
                type: actionTypes.TASKS_READ_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch) => {
    dispatch({
        type: actionTypes.USER_LOGOUT
    });
};

// REGISTER USER
export const register = (user) => (dispatch) => {
    dispatch({
        type: actionTypes.AUTH_START
    });
    axios
        .post('/api/auth/signup', user)
        .then((res) => {
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                payload: res.data
            });
        })
        .catch((error) => {
            let errors = null;
            if (
                Object.prototype.hasOwnProperty.call(error, 'response') &&
                error.response !== undefined
            ) {
                errors = {
                    msg: error.response
                };
            } else {
                errors = {
                    msg: 'Service unavailable',
                    status: 503
                };
            }
            dispatch({
                type: actionTypes.AUTH_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.USER_LOADING
    });
    dispatch({
        type: actionTypes.TASKS_READ_START
    });
    axios
        .get('/api/auth/user', headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data
            });
            dispatch({
                type: actionTypes.TASKS_READ_SUCCESS,
                payload: res.data
            });
        })
        .catch((error) => {
            let errors = null;
            if (
                Object.prototype.hasOwnProperty.call(error, 'response') &&
                error.response !== undefined
            ) {
                errors = {
                    msg: error.response
                };
            } else {
                errors = {
                    msg: 'Service unavailable',
                    status: 503
                };
            }
            dispatch({
                type: actionTypes.AUTH_FAIL
            });
            dispatch({
                type: actionTypes.TASKS_READ_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// UPDATE USER
export const updateUser = ({ email }) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.USER_UPDATE_START
    });
    axios
        .patch('/api/auth/user', { email }, headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.USER_UPDATE_SUCCESS,
                payload: res.data
            });
        })
        .catch((error) => {
            let errors = null;
            if (
                Object.prototype.hasOwnProperty.call(error, 'response') &&
                error.response !== undefined
            ) {
                errors = {
                    msg: error.response
                };
            } else {
                errors = {
                    msg: 'Service unavailable',
                    status: 503
                };
            }
            dispatch({
                type: actionTypes.USER_UPDATE_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};
