const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  products:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, default: 'pending' }
});
module.exports = mongoose.model('Order', OrderSchema);