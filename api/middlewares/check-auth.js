const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (error) => {
            // Verification failed
            if (error) {
                return res.status(401).json({
                    message: 'Auth failed.',
                    error: error
                });
            }
            next();
        });
    } catch (err) {
        // err
        return res.status(401).json({
            message: 'Auth failed.',
            error: err
        });
    }
};
