const jwt = require("jsonwebtoken");


function checkAuth(req, res, next) {
 
    try {

        const token = req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, 'chaveUltraSecreta');
        req.userData = decoded;
        next();

    } catch (e) {

        return res.status(401).json({
        message: "Token Invalido",
        error: e
        });
        
    }
    
}


module.exports = {
    checkAuth
}