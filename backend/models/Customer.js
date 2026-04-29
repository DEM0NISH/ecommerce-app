const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({ name: String });
module.exports = mongoose.model('Customer', CustomerSchema);