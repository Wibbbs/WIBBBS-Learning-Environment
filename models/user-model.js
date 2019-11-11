const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleid: String,
    email: String   
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;