import * as actionTypes from 'store/actions/actionTypes';

const initialState = {
    tasks: [],
    task: {},
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TASK_CREATE_START:
        case actionTypes.TASK_READ_START:
        case actionTypes.TASKS_READ_START:
        case actionTypes.TASK_UPDATE_START:
        case actionTypes.TASK_DELETE_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TASK_READ_SUCCESS:
        case actionTypes.TASK_UPDATE_SUCCESS:
            return {
                ...state,
                task: action.payload,
                isLoading: false
            };
        case actionTypes.TASK_CREATE_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const { tasks } = state;
            tasks.push(action.payload.task);
            return {
                ...state,
                task: action.payload.task,
                tasks,
                isLoading: false
            };
        case actionTypes.TASKS_READ_SUCCESS:
            return {
                ...state,
                tasks: action.payload.user.tasks,
                isLoading: false
            };
        case actionTypes.TASK_CREATE_FAIL:
        case actionTypes.TASK_READ_FAIL:
        case actionTypes.TASKS_READ_FAIL:
        case actionTypes.TASK_UPDATE_FAIL:
        case actionTypes.TASK_DELETE_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.TASK_DELETE_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const { deleted } = action.payload;
            for (let i = 0; i < state.tasks.length; i += 1) {
                // eslint-disable-next-line no-underscore-dangle
                if (state.tasks[i]._id === deleted._id) {
                    state.tasks.splice(i, 1);
                }
            }
            return {
                ...state,
                isLoading: false,
                task: {}
            };
        case actionTypes.TASK_CLEAR:
            return {
                ...state,
                isLoading: false,
                task: {}
            };
        case actionTypes.TASKS_CLEAR:
            return {
                ...state,
                isLoading: false,
                tasks: []
            };
        default:
            return state;
    }
}
