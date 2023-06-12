const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');



//Add API
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = 'insert into category (name) values(?)';
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: 'New category added successfully.' })
        } else {
            return res.status(500).json({ message: '' })
        }
    })
})