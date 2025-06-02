// const express = require ('express');
// const router = express.Router();
// const {customer, item} = require('../schema/schema');

// //  Add a Customer
// router.post('/addcustomer', async (req, res) => {
//   const {  mobile , password } = req.body;

//   if (!mobile || !password) {
//     return res.status(400).json("Please fill all fields");
//   }

//   try {
//     const existing = await customer.findOne({ mobile });
//     if (existing) {
//       return res.status(409).json("Customer already exists");
//     }

//     const newcustomer = new customer({  mobile , password });
//     await newcustomer.save();
//     res.status(201).json(newcustomer);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// //  Get all Customers
// router.get('/customer', async (req, res) => {
//   try {
//     const customers = await customer.find();
//     res.send(customers);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// //  Delete Customer
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


// //  Add an Item
// router.post('/additem', async (req, res) => {
//   const { id, name, address, mobile, rating, timing } = req.body;

//   if (!id || !name || !address || !mobile || !rating || !timing) { 
//     return res.status(400).json("Please fill all fields");
//   }

//   try {
//     const newItem = new Item({ id, name, address, mobile, rating, timing });
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// //  Get all Items
// router.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });




// // update Items
// router.put('/updateitems/:id',async(req,res)=>{
//     try{
//         const _id = req.params.id;
//         const body = req.body;
//         const updateitems = await item.findByIdAndUpdate(_id,body,{new:true});

//         if(!updateitems){
//             res.status(201).send({
//                 "status":true,
//                 "message":"items as updated ... !!!"
//             });
//         }
//         return res.status(200).send(updateitems);
//     }
//     catch(error){
//         res.status(400).send(error);
//     }
// });

// //  Delete Item
// router.delete('/deleteitem/:id', async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const deleted = await Item.findByIdAndDelete(_id);
//     if (!deleted) return res.status(404).json("Item not found");
//     res.status(200).json({ message: "Item deleted successfully" });
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });


// module.exports = router;


const express = require ('express');
const router = express.Router();
const {customer, item, order } = require('../schema/schema');

//  Add a Customer
router.post('/addcustomer', async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json("Please fill all fields");
  }

  try {
    const existing = await customer.findOne({ mobile });
    if (existing) {
      return res.status(409).json("Customer already exists");
    }

    const newcustomer = new customer({ mobile, password });
    await newcustomer.save();
    res.status(400).json(newcustomer);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  Get all Customers
router.post('/customer/:mobile', async (req, res) => {
  const mobile=req.params.mobile;
  const {password}=req.body;
  try {
    const customers = await customer.findOne({"mobile":mobile,"password":password});
    res.send(customers);
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


//  Add an Item
router.post('/additem', async (req, res) => {
  const { cusid, proname, proprice, proimg, overallquantity, total } = req.body;

  if (!cusid ||  !proname || !proprice || !proimg || !overallquantity || !total ) { 
    return res.status(400).json("Please fill all fields");
  }

  try {
    const newItem = new item({ cusid, proname, proprice, proimg, overallquantity, total });

    await newItem.save();
    res.status(400).json(newItem);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  Get all Items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err.message);
  }
});




// update Items
router.put('/updateitems/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const body = req.body;
        const updateitems = await item.findByIdAndUpdate(_id,body,{new:true});

        if(!updateitems){
            res.status(201).send({
                "status":true,
                "message":"items as updated ... !!!"
            });
        }
        return res.status(200).send(updateitems);
    }
    catch(error){
        res.status(400).send(error);
    }
});

//  Delete Item
router.delete('/deleteitem/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const deleted = await Item.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json("Item not found");
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});



// Create a new order
router.post('/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single order by ID
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an order by ID
router.delete('/orders/:id', async (req, res) => {
    try {
        const result = await Order.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

