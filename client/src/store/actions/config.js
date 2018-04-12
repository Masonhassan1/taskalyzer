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
export const baseUrl = process.env.NODE_ENV === 'production' ? "https://taskalyzer.herokuapp.com:"+process.env.PORT : 'http://localhost:5000';