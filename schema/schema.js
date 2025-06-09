const mongoose = require('mongoose');

const customerschema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const itemschema = new mongoose.Schema({
  cusid: {
    type: String,
    required: true
  },
  proname: {
    type: String,
    required: true
  },
  proprice: {
    type: Number,
    required: true
  },
  proimg: {
    type: String,
    required: true
  },
  overallquantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const orderschema = new mongoose.Schema({
  cusid: {
    type: String,
    required: true
  },
  proname: {
    type: String,
    required: true
  },
  proprice: {
    type: Number,
    required: true
  },
  overallquantity: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentmethods: {
    type: String,
    required: true
  },
  grandtotal: {
    type: Number,
    required: true
  }
});


const customer = mongoose.model("customer", customerschema);
const item = mongoose.model("item", itemschema);
const order = mongoose.model("order", orderschema);

module.exports = {
  customer,
  item,
  order
};
