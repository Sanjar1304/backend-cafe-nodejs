const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


// Add product API
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let product = req.body;
    var query = "insert into product (name,categoryId,description,price,status) values(?,?,?,?,'true')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
        !err ? res.status(200).json({ message: "Product added successfully." }) : res.status(500).json(err);
    })
});


// Get all products API
router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select p.id,p.name,p.description,p.price,p.status,c.id as categoryId,c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query, (err, results) => {
        !err ? res.status(200).json(results) : res.status(500).json(err);
    })
});


// Get By Category products API
router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name from product where categoryId=? and status='true'";
    connection.query(query, [id], (err, results) => {
        !err ? res.status(200).json(results) : res.status(500).json(err);
    })
});


// Get By Id products API
router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name,description,price from product where id=?";
    connection.query(query, [id], (err, results) => {
        !err ? res.status(200).json(results[0]) : res.status(500).json(err);
    })
});


// Update product API
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "update product set name=?,categoryId=?,description=?,price=? where id=?";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not exist." });
            }
            return res.status(200).json({ message: "Product updated successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
});


// Delete product API
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let id = req.params.id;
    var query = "delete from product where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: 'Product id does not exist.' })
            }
            return res.status(200).json({ message: 'Product deleted successfully.' })
        } else {
            return res.status(500).json(err);
        }
    })
});


// updateStatus API
router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body;
    var query = "update product set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        !err ? results.affectedRows == 0 ? res.status(404).json({ message: 'Product id does not exist.' }) : res.status(200).json({ message: "Product status updated successfully." }) : res.status(500).json(err);
    })
})

module.exports = router;