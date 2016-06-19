'use strict';

var express = require('express');
var controller = require('./controller')

var router = express.Router();

router.post('/', controller.login);

module.exports = router;