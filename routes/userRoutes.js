const express = require('express')
const UserController =require('../controllers/UserController')
const jwtUtils = require('../utils/jwt')
const router = express.Router();

router.post('/authentication',UserController.authenticateUser);
router.get('/search',UserController.getUserByName);
router.get('/:id',jwtUtils.verifyTokenUser,UserController.getUserById);
router.get('/profile/:id',UserController.getUserProfileById);

router.post('/',UserController.createUser);
router.put('/:id',jwtUtils.verifyTokenUser,UserController.updateUser);
router.delete('/:id',jwtUtils.verifyTokenUser,UserController.deleteUserById);

module.exports = router;