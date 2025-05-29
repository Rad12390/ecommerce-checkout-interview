const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  product: Object,
  transactionStatus: String,
  orderId: String,
});

module.exports = mongoose.model('Order', orderSchema);
