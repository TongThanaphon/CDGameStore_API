const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const History = require('../models/history');
const checkAuth = require('../middleware/check-auth');

router.post('/create', checkAuth, (req, res, next) => {
    const history = new History({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        product: {
            productId: req.body.product.productId,
            quantity: req.body.product.quantity
        },
        dlc: {
            dlcId: req.body.dlc,
            quantity: req.body.dlc.quantity
        }
    });

    history
    .save()
    .then(result => {
        res.status(200).json({
            message: 'Hstory created',
            history: {
                _id: result._id,
                userId: result.userId,
                product: result.product,
                dlc: result.dlc
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

router.get('/', checkAuth, (req, res, next) => {
    History.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            history: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    product: doc.product,
                    dlc: doc.dlc
                };

            })
        };

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;