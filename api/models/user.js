const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: Map, of: String, require: true },
    age: { type: Number, require: true },
    email: { type: String,
             require: true, 
             unique: true, 
             match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/  },
    password: { type: String, require: true },
    address: { type: String, require: true },
    point: { type: Number, default: 0 },
    history: { type: Array, ref: 'History' }
});

module.exports = mongoose.model('User', userSchema);