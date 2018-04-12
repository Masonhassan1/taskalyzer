/* -- Header Configuration --
 * Adds the token to the request header
 */
// eslint-disable-next-line import/prefer-default-export
export const headerConfig = (getState) => {
    // Get the token from the state
    const { token } = getState().auth;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token exist, add it to the header,
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
};
const port = process.env.PORT ? process.env.PORT : '5000';
export const baseUrl = "http://localhost:"+port.toString();