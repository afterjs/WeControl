const express = require('express');
const logController = require("../controllers/log.controller.js");
const checkAuthMiddleWare = require("../middleware/auth-validator");

const router = express.Router();

router.post('/newLog',  checkAuthMiddleWare.checkAuth, logController.newLog);
router.get('/',   logController.getAll)

module.exports = router;