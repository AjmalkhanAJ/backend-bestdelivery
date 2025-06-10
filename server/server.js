const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const app = express ();

const router = require ('../route/route');


const customer = require ('../schema/schema');
const items = require ('../schema/schema');
const order = require ('../schema/schema');


app.use(cors());
app.use(express.json());
app.use(router);


mongoose.connect("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/test?retryWrites=true&w=majority")
.then(() => { console.log("connection done");})
.catch((err) => {console.log(err);});

app.listen(5000,()=>{
    console.log("server running on:http://localhost:5000/");
})
