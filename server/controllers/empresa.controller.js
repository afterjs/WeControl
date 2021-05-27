function save(req, res) {
    res.send("Save Function")
}

function verificaLogin(req, res) {
    res.send("Username: " + req.params.username +  " | Passowrd : " + req.params.password)
}


function nome(req, res) {

    res.send("Nome: " + req.params.nomeC + " | Idade: " + req.params.idade + " | Escola: " + req.params.escola)
    
}

function users(req, res) {
    res.send("Inerir dados")
}

module.exports = {
    save,
    nome,
    users,
    verificaLogin
}