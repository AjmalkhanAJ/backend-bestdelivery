
const express = require ('express');
const router = express.Router();
const { customer , item , order } = require('../schema/schema');

//  Add a Customer
router.post('/addcustomer', async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if a customer already exists with the same mobile number
    const existing = await customer.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Create new customer
    const newcustomer = new customer({ mobile, password });
    await newcustomer.save();

    res.status(201).json(newcustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//  Get all Customers
router.post('/customer/login', async (req, res) => {
  const {mobile, password}=req.body;
  try {
    const customers = await customer.findOne({"mobile":mobile,"password":password});
    console.log(customers);
    res.send(customers)({ message: "login successful" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  Delete Customer
// router.delete('/deletecustomer/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const deleted = await customer.findByIdAndDelete(_id);
//     if (!deleted) return res.status(404).json("Customer not found");
//     res.status(200).json({ message: "Customer deleted successfully" });
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });


// Add item to cart for user id
router.post('/additem/:id', async (req, res) => {
  const cusid = req.params.id;
  const { proname, proprice, proimg, overallquantity, total } = req.body;

  if (!cusid || !proname || !proprice || !proimg || !overallquantity || !total) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const existingItem = await item.findOne({ cusid, proname });
    if (existingItem) {
      return res.status(400).json({ message: "Product already added to cart" });
    }

    const newItem = new item({ cusid, proname, proprice, proimg, overallquantity, total });
    await newItem.save();

    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get cart items for a specific customer id (needed for Cart.js fetch)
router.get('/getcart/:id', async (req, res) => {
  const cusid = req.params.id;
  console.log('Fetching cart for customer id:', cusid);

  try {
    const items = await item.find({ cusid });
    console.log('Items found:', items);

    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching cart:', err.stack || err);
    res.status(500).json({ message: err.message });
  }
});


// Update quantity (matches frontend call)

router.put('/updatequantity/:id', async (req, res) => {
  const _id = req.params.id;
  const { change } = req.body;

  try {
    const foundItem = await item.findById(_id); // ✅ use different name
    if (!foundItem) return res.status(404).json({ message: "Item not found" });
    const newQuantity = Math.max(1, foundItem.overallquantity + change);
    foundItem.overallquantity = newQuantity;
    foundItem.total = newQuantity * foundItem.proprice;
    await foundItem.save();
    res.status(200).json({ success: true, updatedItem: foundItem });
  } catch (err) {res.status(500).json({ message: err.message });}
});

// Remove item from cart (matches frontend call)
router.delete('/removeitem/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const deleted = await item.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/orders/:id', async (req, res) => {
  const orders = req.body.orders;  
  
  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ message: 'No orders provided' });
  }
  try {
    const savedOrders = await order.insertMany(orders);
    console.log(savedOrders);
    res.status(201).json({ message: 'Orders placed successfully', orders: savedOrders });
    console.log('Orders saved:', savedOrders)
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(400).json({ error: err.message });
  }
});


// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await order.find();
        res.json(orders);
    } catch (err) {
        res.status(201).json({ error: err.message });
    }
});

// Get a single order by ID
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an order by ID
router.delete('/orders/:id', async (req, res) => {
    try {
        const result = await order.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

