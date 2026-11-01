const jwt = require('jsonwebtoken');

const authanticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401).json({ message: "Authorization token required" });

    jwt.verify(token, "Aryan1786", (err, user) => {
        if (err) {
            return res.sendStatus(403).json({err});
        }
        req.user = user;
        next();
    });
};

module.exports = {authanticateToken};