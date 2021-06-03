const Validator = require("fastest-validator");
const models = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//inserir dados
function addWorker(req, res) {  

        const workSchema = {
            identificador: req.body.identificador,
            camiao: req.body.camiao,
            matricula: req.body.matricula,
            docaInicial: req.body.docaInicial,
            docaFinal: req.body.docaFinal,
            klmInicial: req.body.klmInicial,
            klmFinal: req.body.klmFinal,
            estado: req.body.estado
        }
    
        const schema = {
            identificador: {type:"number", optional: false, max: "255"},
            camiao: {type:"string", optional: false, max: "255"},
            matricula: {type:"string", optional: false, max: "255"},
            docaInicial: {type:"string", optional: false, max: "255"},
            docaFinal: {type:"string", optional: false, max: "255"},
            klmInicial: {type:"string", optional: false, max: "255"},
            klmFinal: {type:"string", optional: true, max: "255"},
            estado: {type:"string", optional: false, max: "255"},     
        }
    
        const v = new Validator();
        const vResponse = v.validate(workSchema , schema);
    
    
        if(vResponse !== true) {
            return res.status(400).json({
            message: "Problema de validação",
            errors: vResponse
        })
        }

        models.Works.create(workSchema)
        .then((result) => {
         res.status(201).json({
             message: "Criado com sucesso",
             work: result
         });
     
        })
        .catch((error) => {
            res.status(500).json({
                message: "problemas ao inserir trabalho",
                error
            });
        });
}

function update(req, res) {
    const idAuto = req.params.idAuto;

    const updateWork = {
            identificador: req.body.identificador,
            camiao: req.body.camiao,
            matricula: req.body.matricula,
            docaInicial: req.body.docaInicial,
            docaFinal: req.body.docaFinal,
            klmInicial: req.body.klmInicial,
            klmFinal: req.body.klmFinal,
            estado: req.body.estado
    }

    models.Works.findByPk(idAuto)
    .then((result) => {
        if(result) {
            models.Works.update(updateWork, {where: {idAuto:idAuto}})
            .then((result) => {
                res.status(200).json({
                    message: "Atualizado com sucesso!",
                    user: updateWork
                })
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Problemas no servidor",
                    error
                })
            })
        } else {
            res.status(404).json({
                message: "ID INEXISTENTE",
                error
            });
        }
        
    })
    .catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        });
    })
}


function destroy(req, res) {
    const idAuto = req.params.idAuto;
    
    models.Works.destroy({where: {idAuto: idAuto}})
    .then((result) => {
        res.status(200).json({
            message: "Apagado com sucesso!",
            destroyRow: result
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        })
    })
     
}

function getAll(req, res) {

    models.Works.findAll()
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

function getById(req, res) {
    
    const identificador = req.params.identificador;

    models.Works.findAll({where: {identificador: identificador}})
    .then((result) => {
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "ID INEXISTENTE",
                error
            });
        }
        
    })
    .catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        });
    })
}

module.exports = {
    addWorker,
    update,
    destroy,
    getById,
    getAll
   
}