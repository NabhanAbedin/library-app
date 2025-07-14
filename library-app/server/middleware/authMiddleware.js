const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req,res,next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({error: 'missing auth token'});
    };

    jwt.verify(token, JWT_SECRET, (err,payload)=> {
        if (err) {
            return res.status(403).json({error: 'invalid or expired token'});
        };

        req.userId = payload.userId;
        req.role = payload.role;
        next();
    });
};

module.exports = {
    requireAuth
};