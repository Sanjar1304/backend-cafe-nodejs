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
        !err ? res.status(200).json({ message: 'New category added successfully.' }) : res.status(500).json(err)
    })
});


// Get all the category API
router.get('/get', auth.authenticateToken, (req, res, next) => {
    query = 'select * from category order by name';
    connection.query(query, (err, results) => {
        !err ? res.status(200).json(results) : res.status(500).json(err)
    })
})