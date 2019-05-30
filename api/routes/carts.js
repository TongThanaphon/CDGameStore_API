const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart = require('../models/cart');

router.post('/create', (req, res, next) => {
    const cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        stock: req.body.stock,
        user: req.body.user,
        quantity: req.body.quantity
    });

    cart
    .save()
    .then(result => {
        res.status(201).json({
            message: 'Cart created',
            crat: {
                _id: result._id,
                stock: result.stock,
                user: result.user,
                quantity: result.quantity
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    Cart.find({ user: id })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            carts: docs.map(doc => {
                return {
                    _id: doc._id,
                    stock: doc.stock,
                    user: doc.user,
                    quantity: doc.quantity
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/update/:cartId', (req, res, next) => {
    const id = req.params.cartId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Cart.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Cart updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:cartId', (req, res, next) => {
    const id = req.params.cartId;

    Cart.remove({ _id: id })
    .exec()
    .then(resuslt => {
        res.status(200).json({
            message: 'Cart deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/deleteAll/:userId', (req, res, next) => {
    const id = req.params.usertId;

    Cart.remove({ user: id })
    .exec()
    .then(resuslt => {
        res.status(200).json({
            message: 'All Cart deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;