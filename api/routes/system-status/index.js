'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/', controller.list);
router.put('/', controller.update);

module.exports = router;