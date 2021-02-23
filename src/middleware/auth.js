const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    // * autorizacion por el header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        const error = new Error("No autenticado");
        error.statusCode = 401;
        throw error;
    }
    // * obtener el token
    try {
        const cifrado = jwt.verify(authHeader.split(" ")[1],"LLAVESECREATA")
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token no valido"});
    }
}