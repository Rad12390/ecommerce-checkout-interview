const express = require('express');
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  const { formData, productData, simulateStatus } = req.body;
  const orderId = uuidv4();
  let transactionStatus = 'approved';

  if (simulateStatus === '2') transactionStatus = 'declined';
  if (simulateStatus === '3') transactionStatus = 'gateway_error';

  const order = new Order({ ...formData, product: productData, orderId, transactionStatus });
  await order.save();

  await sendEmail(formData.email, order, transactionStatus);
  res.json({ orderId });
});

router.get('/:orderId', async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });
  res.json(order);
});

const sendEmail = async (email, order, status) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const subject = status === 'approved' ? 'Order Confirmed' : 'Order Failed';
  const html = `<h3>${subject}</h3><p>Order ID: ${order.orderId}</p><p>Status: ${status}</p>`;

  await transporter.sendMail({
    from: '"Shop" <shop@example.com>',
    to: email,
    subject,
    html
  });
};

module.exports = router;
