const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: 'string',
    password: 'string'
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);