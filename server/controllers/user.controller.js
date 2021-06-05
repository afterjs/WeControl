const Validator = require("fastest-validator");
const models = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//inserir dados
function register(req, res) {  

        const userSchema = {
            nome: req.body.nome,
            idade: req.body.idade,
            telemovel: req.body.telemovel,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            tipo: req.body.tipo,
            cartas: req.body.cartas
        }
    
        const schema = {
            nome: {type:"string", optional: false, max: "255"},
            idade: {type:"number", optional: false, max: "255"},
            telemovel: {type:"string", optional: false, max: "255"},
            email: {type:"string", optional: false, max: "255"},
            username: {type:"string", optional: false, max: "255"},
            password: {type:"string", optional: false, max: "255"},
            tipo: {type:"string", optional: false, max: "255"},
            cartas: {type:"string", optional: false, max: "255"}
        }
    
        const v = new Validator();
        const vResponse = v.validate(userSchema , schema);
    
    
        if(vResponse !== true) {
            return res.status(400).json({
            message: "Problema de validação",
            errors: vResponse
        })
        }


    models.Users.findOne({where: {username: req.body.username}})
    .then((result) => {
        if(result) {
            res.status(409).json({
                message: "Username já registrado"
            })
        } else {
            models.Users.findOne({where: {email: req.body.email}})
            .then((result) => {
                if(result) {
                    res.status(409).json({
                        message: "Email em uso!"
                    })
                } else {
                    
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            const user = {
                                nome: req.body.nome,
                                idade: req.body.idade,
                                telemovel: req.body.telemovel,
                                email: req.body.email,
                                username: req.body.username,
                                password: hash,
                                tipo: req.body.tipo,
                                cartas: req.body.cartas
                            }
          
                            models.Users.create(user)
                            .then((result) => {
                             res.status(201).json({
                                 message: "Criado com sucesso",
                                 user: result
                             });
                         
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    message: "problemas ao inserir user",
                                    error
                                });
                            });
                        });
                    });
    
    
                }
            }).catch((error) => {
                res.status(500).json({
                    message: "Problemas no servidor",
                    error
                });
            }) 
            
        }
    }).catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        });
    })  
}


//select dados
function login(req, res) {

    models.Users.findOne({where: {username: req.body.username}})
    .then((response) => {

        if(response === null) {
            res.status(401).json({
                message: "Cradenciais invalidas!"
            });
        } else {

            bcrypt.compare(req.body.password, response.password).then(function(result) {

                if(result === true) {
                    const token = jwt.sign({ 
                        exp: Math.floor(5),
                        email: response.email,
                        }, 'chaveUltraSecreta',
                        function(err, token) {
                            res.status(201).json({
                                message: "Autenticação com sucesso!",
                                token,
                                info: response
                                
                            });
                        });
                } else {
                    res.status(401).json({
                        message: "Cradenciais invalidas!"
                    });
                }
                
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


function getAll(req, res) {

    models.Users.findAll()
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

    models.Users.findByPk(identificador)
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

function destroy(req, res) {
    const identificador = req.params.identificador;
    
    models.Users.destroy({where: {identificador: identificador}})
    .then((result) => {
        res.status(200).json({
            message: "Apagado com sucesso!",
            
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: "Problemas no servidor",
            error
        })
    })
     
}

function update(req, res) {
    const identificador = req.params.identificador;

    const updateUser = {
        nome: req.body.nome,
        idade: req.body.idade,
        telemovel: req.body.telemovel,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        tipo: req.body.tipo,
        cartas: req.body.cartas
    }

    models.Users.findByPk(identificador)
    .then((result) => {
        if(result) {
            models.Users.update(updateUser, {where: {identificador:identificador}})
            .then((result) => {
                res.status(200).json({
                    message: "Atualizado com sucesso!",
                    user: updateUser
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

module.exports = {
    register,
    login,
    getAll,
    getById,
    destroy,
    update
}
