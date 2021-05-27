const express = require('express');
const empresaController = require("../controllers/empresa.controller.js");

const router = express.Router();

router.get('/', empresaController.save);

router.get('/user/:username/:password', empresaController.verificaLogin)



module.exports = router;