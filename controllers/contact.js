const mongoose = require('mongoose');
const Contact = require("../models/contact")

// GET Method 
let getContacts = async (req, res) => {    
    try {
        const contacts = await Contact.find();
        res.status(200).send({data:contacts});
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }    
};
// POST Method 
let createContact = async (req, res) => {
    //console.log(req.body) 
    const {name, email, message} = req.body
    const contact = new Contact({ name, email, message })    
    try {
         const response = await contact.save();
         res.status(200).json({ data: response});
    }
    catch (error) {
        res.status(500).send({ error: error.toString()});
    }
};

module.exports = { getContacts,createContact };