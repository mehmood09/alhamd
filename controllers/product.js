const mongoose = require('mongoose');
const Patients = require("../models/product")

let getPatients = async (req, res) => {    
    try {
        const patients = await Patients.find();
        res.status(200).send({data:patients});
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }    
};
let getPatient = async (req, res) => {
    try {
         const id = req.params.id;
         console.log(id);
         if (! mongoose.Types.ObjectId.isValid(id)) {
             return res.status(400).send({ message: "Invalid ID" });
         }
         const patient = await Patients.findOne({ _id: id });
         if (patient == null) {
             return res.status(404).send({ message: "No record found against this ID" });
         } 
             res.status(200).send(patient);       
     } catch (error) {
         res.status(500).send({error:error.toString()});
     }    
};
let deletePatient = async (req, res) => {
    try {
         const id = req.params.id;
         console.log(id);
         if (! mongoose.Types.ObjectId.isValid(id)) {
             return res.status(400).send({ message: "Invalid ID" });
         }
         //Todo : Find product before deleting
         const patient = await Patients.deleteOne({ _id: id });
         console.log(product);
         if (patient.deletedCount == 0) {
             return res.status(404).send({ data:patient, message: "No record found against this ID" });
         } 
             res.status(200).send({ message: "Record deleted Successfully" });   
             //Todo : Send product in response    
     } catch (error) {
         res.status(500).send({error:error.toString()});
     }    
};
let createPatient = async (req, res) => {
    //res.send('POST Method')
    const data = new Patients({
        title: req.body.title,
        ticketNo: req.body.description,
        date: req.body.date,
        isActive: req.body.isActive
    })    
    try {
         const dataToSave = await data.save();
         res.status(200).send({ data: dataToSave, message: "Data Saved Successfully..."});
    }
    catch (error) {
        res.status(500).send({ error: error.toString()});
    }
};
module.exports = { getPatients,getPatient,deletePatient,createPatient };

