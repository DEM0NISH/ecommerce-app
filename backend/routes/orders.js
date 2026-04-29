const router = require('express').Router();
const Order = require('../models/Order');

// one-to-many: get orders by customer
router.get('/by-customer/:customerId', async (req, res) => {
  res.json(await Order.find({ customerId: req.params.customerId }).populate('products'));
});

// many-to-many: get all orders with products populated
router.get('/',       async (req, res) => res.json(await Order.find().populate('customerId').populate('products')));
router.post('/',      async (req, res) => res.json(await Order.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Order.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;