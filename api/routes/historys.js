const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const History = require('../models/history');
const checkAuth = require('../middleware/check-auth');

router.post('/create', (req, res, next) => {
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
        },
        date: {
            year: req.body.date.year,
            month: req.body.date.month,
            day: req.body.date.day
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
                dlc: result.dlc,
                date: result.date
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

router.get('/', (req, res, next) => {
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
                    dlc: doc.dlc,
                    date: doc.date
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

router.get('/findByProductId/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    History.find({ product: { productId: id } })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    product: doc.product,
                    date: doc.date
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

router.get('/findByDLCId/:dlcId', (req, res, next) => {
    const id = req.params.dlcId;
    
    History.find({ dlc: { dlcId: id } })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    dlc: doc.dlc,
                    date: doc.date
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

module.exports = router;