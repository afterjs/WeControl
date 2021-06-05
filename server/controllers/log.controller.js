const Validator = require("fastest-validator");
const models = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//inserir dados
function newLog(req, res) {  

        const logSchema = {
            info: req.body.info
        }
    
        const schema = {
            info: {type:"string", optional: false, max: "255"}
        }
    
        const v = new Validator();
        const vResponse = v.validate(logSchema , schema);
    
    
        if(vResponse !== true) {
                return res.status(400).json({
                message: "Problema de validação",
                errors: vResponse
            })
        }


        models.Logs.create(logSchema)
        .then((result) => {
            res.status(201).json({
                message: "Log Inserida",
                log: result
            });
        
        })
        .catch((error) => {
            res.status(500).json({
                message: "problemas ao inserir log",
                error
            });
        });

}

function getAll(req, res) {

    models.Logs.findAll()
    .then((result) => {
        res.status(200).json(result);
    })

    .catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        });
    })
}






module.exports = {
    newLog,
    getAll
}
