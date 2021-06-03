const express = require('express');
const userController = require("../controllers/user.controller.js");
const checkAuthMiddleWare = require("../middleware/auth-validator");



const router = express.Router();





router.post('/login', userController.login)
router.post('/register',  userController.register)
router.get('/', checkAuthMiddleWare.checkAuth, userController.getAll)
router.get('/:identificador', checkAuthMiddleWare.checkAuth, userController.getById);
router.delete('/:identificador', checkAuthMiddleWare.checkAuth, userController.destroy);
router.patch('/:identificador', checkAuthMiddleWare.checkAuth, userController.update); 

module.exports = router;