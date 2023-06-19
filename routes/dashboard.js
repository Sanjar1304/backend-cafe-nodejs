const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


// get Dashboard Details API
router.get('/details', auth.authenticateToken, (req, res, next) => {
    var categoryCount;
    var productCount;
    var billCount;

    var query = "select count(id) as categoryCount from category";
    connection.query(query, (err, results) => {
        !err ? categoryCount = results[0].categoryCount : res.status(500).json(err);
    });

    var query = "select count(id) as productCount from product";
    connection.query(query, (err, results) => {
        !err ? productCount = results[0].productCount : res.status(500).json(err);
    });

    var query = "select count(id) as billCount from bill";
    connection.query(query, (err, results) => {
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                category: categoryCount,
                product: productCount,
                bill: billCount
            };
            return res.status(200).json(data);
        } else {
            res.status(500).json(err);
        }
    })
});

module.exports = router;