const express = require('express');
const workController = require("../controllers/work.controller.js");
const checkAuthMiddleWare = require("../middleware/auth-validator");



const router = express.Router();


router.post('/addWork', checkAuthMiddleWare.checkAuth, workController.addWorker);
router.patch('/:idAuto', checkAuthMiddleWare.checkAuth, workController.update);
router.delete('/:idAuto', checkAuthMiddleWare.checkAuth, workController.destroy);
router.get('/', checkAuthMiddleWare.checkAuth, workController.getAll)
router.get('/:identificador', checkAuthMiddleWare.checkAuth, workController.getById);


module.exports = router;