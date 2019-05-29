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
                    typeOfPlaying: doc.typeOfPlaying,
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

router.get('/findByProductId/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.find({ _id: id })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                    product: doc
            });
        }else{
            res.status(404).json({
                message: 'Product id ' + id + 'does not exist'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByName/:productName', (req, res, next) => {
    const name = req.params.productName;

    Product.find({ name: name })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                product: doc
            });
        }else{
            res.status(404).json({
                message: 'Product name ' + name + ' does not exist'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByFilter/:product', (req, res, next) => {
    const product = JSON.parse(req.params.product);
    const price = product.price;
    const category = product.category;
    const typeOfPlaying = product.typeOfPlaying;
    const language = product.language;

    Product.find({ $and: [ {price: { $gte: price[0], $lte: price[1] }},
                    {category: { $elemMatch: {category} }},
                    {typeOfPlaying: { $elemMatch: {typeOfPlaying} }},
                    {language: { $elemMatch: {language} }} ]
                 })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    _id: doc._id,
                    dlcId: doc.dlcId,
                    achievementId: doc.achievementId,
                    name: doc.name,
                    price: doc.price,
                    publisher: doc.publisher,
                    category: doc.category,
                    typeOfPlaying: doc.typeOfPlaying,
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
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
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
            message: 'Product id ' + id + ' updated'
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
    const id = req.params.productId;
    Product.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product id ' + id + ' deleted'
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