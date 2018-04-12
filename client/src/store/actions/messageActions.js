import * as actionTypes from './actionTypes';

// Create message
// eslint-disable-next-line import/prefer-default-export
export const createMessage = (msg) => {
    return {
        type: actionTypes.CREATE_MESSAGE,
        payload: msg
    };
};
