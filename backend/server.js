const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/customers', require('./routes/customers'));
app.use('/api/products',  require('./routes/products'));
app.use('/api/orders',    require('./routes/orders'));

app.listen(5000, () => console.log('Backend running on port 5000'));