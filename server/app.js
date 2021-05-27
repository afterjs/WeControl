const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//Adicionar Rotas
const empresaRoute = require("./routes/empresa");


//Incluir prefixo
app.use("/empresa", empresaRoute);

module.exports = app;