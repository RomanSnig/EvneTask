const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currencySchema = new Schema({
    currency: {
        type: Object,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('task', currencySchema);
