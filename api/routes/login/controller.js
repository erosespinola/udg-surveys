'use strict';

var jwt = require('jsonwebtoken');
var User = require('./../../models/User');

var secret = 'udgsurveysapi';

exports.login = function(req, res) {
    User.findOne({
    	where: { user: req.body.user }
    })
    .then(function(user) {
        if (!user) {
            return res.status(401).json({ error: 'Usuario inválido' });
        }
        else if (req.body.password === user.get('password')) {
            var token = jwt.sign({ user: user.get('email') }, secret, { expiresIn: '1h' });
            return res.status(200).json({ token: token });
        } 
        else {
        	return res.status(401).json({ error: 'Contraseña inválida' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ error: err });
    });
};