const mongoose = require('mongoose');

// Another Table 
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
//Singular lower case
module.exports = mongoose.model("triage", patientSchema)
//const Patients = mongoose.model("triage", patientSchema);
//module.exports = Patients;


