const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Adicionar Rotas
const userRoute = require("./routes/user");
const workRoute = require("./routes/work");

//Incluir prefixo

app.use("/user", userRoute);
app.use("/work", workRoute);

module.exports = app;