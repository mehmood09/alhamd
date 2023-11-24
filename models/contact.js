const mongoose = require('mongoose');
 
const contactSchema = new mongoose.Schema({
    name: {
        required: [true, "Name is required"],
        type: String
    },
    
    email:{
        required: [true, "Email is required"],
        type: String
    },
    message:{
        required: [true, "Message is required"],
        type: String
    },
});
const Contacts = mongoose.model("contact", contactSchema);
module.exports = Contacts;



