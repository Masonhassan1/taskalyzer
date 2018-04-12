import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import tasks from './tasks';
import message from './message';

export default combineReducers({
    auth,
    error,
    tasks,
    message
});
