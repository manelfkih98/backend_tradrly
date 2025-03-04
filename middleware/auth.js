const jwt = require('jsonwebtoken');

//refrech token 

const auth = (req, res, next) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || 'Authorization';
    const token = req.header(tokenHeaderKey);
    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }
    try {
        const tokenWithoutBearer = token.split(' ')[1];
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY);
        req.user = verified;  
        next();  
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = auth;
