import axios from 'axios';

import * as actionTypes from './actionTypes';
import { headerConfig } from './config';

// CREATE A TASK
export const createTask = (task) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.TASK_CREATE_START
    });
    axios
        .post('/api/tasks', task, headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.TASK_CREATE_SUCCESS,
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
                type: actionTypes.TASK_CREATE_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// READ ALL TASKS
export const fetchAllTasks = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.TASKS_READ_START
    });
    axios
        .get('/api/tasks', headerConfig(getState))
        .then((res) => {
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
                type: actionTypes.TASKS_READ_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// READ A TASK
export const fetchTaskById = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.TASK_READ_START
    });
    axios
        .get(`/api/tasks/${id}`, headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.TASK_READ_SUCCESS,
                payload: res.data.result
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
                type: actionTypes.TASK_READ_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// UPDATE A TASK
export const updateTask = (task) => (dispatch, getState) => {
    const { _id } = task;
    const id = _id;
    dispatch({
        type: actionTypes.TASK_UPDATE_START
    });
    axios
        .patch(`/api/tasks/${id}`, task, headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.TASK_UPDATE_SUCCESS,
                payload: res.data.result
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
                type: actionTypes.TASK_UPDATE_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// DELETE A TASK
export const deleteTask = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.TASK_DELETE_START
    });
    axios
        .delete(`/api/tasks/${id}`, headerConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.TASK_DELETE_SUCCESS,
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
                type: actionTypes.TASK_DELETE_FAIL
            });
            dispatch({
                type: actionTypes.SHOW_ERROR,
                payload: errors
            });
        });
};

// CLEAR A TASK
export const clearTask = () => (dispatch) => {
    dispatch({
        type: actionTypes.TASK_CLEAR
    });
};

// CLEAR TASKS
export const clearTasks = () => (dispatch) => {
    dispatch({
        type: actionTypes.TASKS_CLEAR
    });
};
