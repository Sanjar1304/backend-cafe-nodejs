const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


// get Details API
router.get('/details', auth.authenticateToken, (req, res, next) => {

});

module.exports = router;