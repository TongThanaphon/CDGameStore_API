const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/create', upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        publisher: req.body.publisher,
        category: req.body.category,
        typeOfPlaying: req.body.typeOfPlaying,
        releaseDate: req.body.releaseDate,
        devepoper: req.body.developer,
        size: req.body.size,
        language: req.body.language,
        ageRate: req.body.ageRate,
        productImage: req.file.path
    });

    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created',
            createProduct: {
                _id: result._id,
                dlcId: result.dlcId,
                achievementId: result.achievementId,
                name: result.name,
                price: result.price,
                publisher: result.publisher,
                category: result.category,
                typeOfPlaying: result.typeOfPlaying,
                releaseDate: result.releaseDate,
                developer: result.developer,
                size: result.size,
                language: result.language,
                ageRate: result.ageRate,
                productImage: result.productImage
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
    Product.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    dlcId: doc.dlcId,
                    achievementId: doc.achievementId,
                    name: doc.name,
                    price: doc.price,
                    publisher: doc.publisher,
                    category: doc.category,
                    releaseDate: doc.releaseDate,
                    developer: doc.developer,
                    size: doc.size,
                    language: doc.language,
                    ageRate: doc.ageRate,
                    platform: doc.platform,
                    productImage: doc.productImage
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByFilter/:product', (req, res, next) => {
    const product = req.params.product;

    console.log(product);
});

router.patch('/update/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product ' + id + ' updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:productId', (req, res, next) => {
    Product.remove({ _id: req.params.productId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product ' + id + ' deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;