const express = require('express');
const mongoose = require('mongoose');
const morgan = require ('morgan');

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send("welcome"); 
    res.status(500).send({message: "Sorry, something went wrong"})
});
app.listen(5000,"localhost",()=> {
        console.log("Server is listening") 
});