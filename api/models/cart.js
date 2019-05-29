const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: 'Guest' },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);

