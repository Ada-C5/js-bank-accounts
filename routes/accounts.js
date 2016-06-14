var express = require('express');
var router = express.Router();
var AccountsController = require('../controllers/accounts_controller.js')

/* GET account details. */
router.get('/:id', AccountsController.show);

module.exports = router;
