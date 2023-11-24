const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    title: {
        required: [true, "Title is required"],
        type: String
    },
    
    date:{
        required: [true, "Date is required"],
        type: String
    },
    isActive:   Boolean,
});
const Patients = mongoose.model("triage", patientSchema);
module.exports = Patients;


