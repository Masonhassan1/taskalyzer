import * as actionTypes from 'store/actions/actionTypes';

const initialState = {
    error: {},
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_ERROR:
            if (Object.prototype.hasOwnProperty.call(action.payload, 'msg')) {
                return {
                    error: action.payload.msg,
                    status: action.payload.status
                };
            }
            return {
                error: 'Server unavailable',
                status: 503
            };

        default:
            return state;
    }
}
