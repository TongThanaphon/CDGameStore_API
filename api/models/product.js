const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dlcId: { type: Array, ref: 'DLC' },
    achievementId: { type: Array, ref: 'Achievement' },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    category: { type: Array, required: true },
    typeOfPlaying: { type: Array, required: true },
    releaseDate: { type: String, required: true },
    developer: { type: Array, required: true },
    size: { type: String, required: true },
    language: { type: Array, required: true },
    ageRate: { type: Number, required: true },
    productImage: { type: String, required: true }
    
});

module.exports = mongoose.model('Product', productSchema);