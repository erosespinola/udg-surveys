'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/survey/:id', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/survey/:id', controller.bulkUpdate);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
