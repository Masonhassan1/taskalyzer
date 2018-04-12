const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/User');
// salt for password
// Password salt for randomness
const saltRounds = 10;

// User login
exports.userLogin = (req, res) => {
    let query = {
        $or: [{ userName: req.body.username }, { email: req.body.username }]
    };
    User.find(query)
        .populate('tasks')
        .exec()
        .then((user) => {
            if (user.length === 0) {
                // User not found
                return res.status(401).json({
                    message: 'Invalid credentials!',
                    request: {
                        type: 'POST',
                        url: '/api/auth/login'
                    }
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed.',
                        error: err,
                        request: {
                            type: 'POST',
                            url: '/api/auth/login'
                        }
                    });
                }
                if (result) {
                    // result == true
                    // User found
                    const matchedUser = {
                        _id: user[0]._id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        userName: user[0].userName,
                        email: user[0].email,
                        tasks: user[0].tasks,
                        created: user[0].created,
                        modified: user[0].modified
                    };
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            id: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth succesfull.',
                        token: token,
                        user: matchedUser,
                        request: {
                            type: 'POST',
                            url: '/api/auth/login'
                        }
                    });
                } else {
                    return res.status(401).json({
                        message: 'Invalid credentials!',
                        request: {
                            type: 'POST',
                            url: '/api/auth/login'
                        }
                    });
                }
            });
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
            res.status(401).json({
                message: 'User login failed.',
                error: error,
                request: {
                    type: 'POST',
                    url: '/api/auth/login'
                }
            });
        });
};

// User register with redundancy check!!!
exports.userSignUp = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length !== 0) {
                return res.status(409).json({
                    message: 'User exist with the given email address!',
                    request: {
                        type: 'POST',
                        url: '/api/auth/signup'
                    }
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        // Store hashed password in the DB.
                        if (err) {
                            res.status(500).json({
                                message: 'Password hashing failed',
                                error: err,
                                request: {
                                    type: 'POST',
                                    url: '/api/auth/signup'
                                }
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                userName: req.body.userName,
                                email: req.body.email,
                                password: hash,
                                tasks: [],
                                created: new Date(),
                                modified: new Date()
                            });
                            user.save()
                                .then((result) => {
                                    const token = jwt.sign(
                                        {
                                            email: result.email,
                                            id: result._id
                                        },
                                        process.env.JWT_KEY,
                                        {
                                            expiresIn: '1h'
                                        }
                                    );
                                    res.status(201).json({
                                        message: `User created successfully.`,
                                        token: token,
                                        user: {
                                            _id: result._id,
                                            firstName: result.firstName,
                                            lastName: result.lastName,
                                            userName: result.userName,
                                            email: result.email,
                                            tasks: result.tasks,
                                            created: result.created,
                                            modified: result.modified
                                        },
                                        request: {
                                            type: 'POST',
                                            url: '/api/auth/signup'
                                        }
                                    });
                                })
                                .catch((error) => {
                                    // eslint-disable-next-line no-console
                                    console.log(error);
                                    res.status(500).json({
                                        message: 'User create failed.',
                                        error: error,
                                        request: {
                                            type: 'POST',
                                            url: '/api/auth/signup'
                                        }
                                    });
                                });
                        }
                    });
                });
            }
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({
                message: 'User create failed.',
                error: error,
                request: {
                    type: 'POST',
                    url: '/api/auth/signup'
                }
            });
        });
};

// User load
exports.loadUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        User.findById(decoded.id)
            .populate('tasks')
            .exec()
            .then((matchedUser) => {
                const user = {
                    _id: matchedUser._id,
                    firstName: matchedUser.firstName,
                    lastName: matchedUser.lastName,
                    userName: matchedUser.userName,
                    email: matchedUser.email,
                    tasks: matchedUser.tasks,
                    created: matchedUser.created,
                    modified: matchedUser.modified
                };
                const newToken = jwt.sign(
                    {
                        email: user.email,
                        id: user._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).json({
                    message: 'User load succesfull.',
                    token: newToken,
                    user: user,
                    request: {
                        type: 'GET',
                        url: '/api/auth/user'
                    }
                });
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
                res.status(401).json({
                    message: 'User load failed.',
                    error: err,
                    request: {
                        type: 'GET',
                        url: '/api/auth/user'
                    }
                });
            });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(401).json({
            message: 'User load failed.',
            error: err,
            request: {
                type: 'GET',
                url: '/api/auth/user'
            }
        });
    }
};

// Delete specific user
exports.deleteUser = (req, res) => {
    const id = req.params.userID;
    User.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            if (result.deletedCount === 1) {
                // Delete success
                res.status(200).json({
                    message: `User has been deleted successfully.`,
                    result: result,
                    request: {
                        type: 'DELETE',
                        url: '/api/auth/users/' + id
                    }
                });
            } else {
                // Delete fail
                res.status(200).json({
                    message: `User already deleted!`,
                    result: result,
                    request: {
                        type: 'DELETE',
                        url: '/api/auth/users/' + id
                    }
                });
            }
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: error });
        });
};

// Update User email
exports.updateUser = (req, res) => {
    const updatedEmail = req.body.email;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        User.findOneAndUpdate(
            { _id: decoded.id },
            { $set: { email: updatedEmail, modified: new Date() } },
            {
                upsert: false,
                new: true
            }
        )
            .exec()
            .then((user) => {
                res.status(201).json({
                    message: `Account updated successfully.`,
                    user: user,
                    request: {
                        type: 'PATCH',
                        url: '/api/user/'
                    }
                });
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
                res.status(500).json({
                    message: 'Account update failed.',
                    error: error,
                    request: {
                        type: 'PATCH',
                        url: '/api/user/'
                    }
                });
            });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(401).json({
            message: 'Unauthorized.',
            error: error,
            request: {
                type: 'PATCH',
                url: '/api/user/'
            }
        });
    }
};
