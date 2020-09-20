const jwt = require('jsonwebtoken');

module.exports = function verify (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.send('Access Denied, no token');

    try {
        // IF LOGGED IN
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch(err) {

        // IF NOT LOGGED IN
        res.send('Invalid Token');
    }
}