const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        }
    ]
});

module.exports = mongoose.model('User', userSchema);