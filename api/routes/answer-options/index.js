'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/question/:id', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/', controller.bulkUpdate);
router.delete('/:id', controller.delete);

module.exports = router;
