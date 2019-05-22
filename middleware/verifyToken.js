let jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] ||  req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
        next();
    });
}
module.exports = verifyToken;