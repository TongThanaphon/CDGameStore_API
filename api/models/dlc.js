const mongoose = require('mongoose');

const dlcSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    size: { type: String, required: true },
    dlcImage: { type: String, required: true }
});

module.exports = mongoose.model('DLC', dlcSchema);