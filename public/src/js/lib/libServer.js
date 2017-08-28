var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = { 
        sendRes, 
        validPassword,
        generateJwt
}

function sendRes(res, status, content) {
        res.status(status); 
        res.json(content);
};

function validPassword(hash, salt, password) {
        return hash === crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex'); 
};

function generateJwt (user, role) {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({
            _id: user._id,
            username: user.name,
            exp: parseInt(expiry.getTime() / 1000)            
        }, process.env.JWT_SECRET);
    };