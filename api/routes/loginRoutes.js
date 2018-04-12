const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const checkAuth = require('../middlewares/check-auth');

router.post('/login', userController.userLogin);

router.post('/signup', userController.userSignUp);

router.get('/user', checkAuth, userController.loadUser);

router.patch('/user', checkAuth, userController.updateUser);

router.delete('/users/:userID', checkAuth, userController.deleteUser);

module.exports = router;
