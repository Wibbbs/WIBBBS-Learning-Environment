const mongoose = require('mongoose');

const lotteryEntrySchema = new mongoose.Schema({
    email: String
});

const lotteryEntryModel = mongoose.model('lotteryEntries', lotteryEntrySchema);

module.exports = lotteryEntryModel;