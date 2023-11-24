const mongoose = require('mongoose');
 
// define a schema for storing file references in MongoDB
const fileSchema = new mongoose.Schema({
        name: { required: [true, "Name is required"],
            type: String 
        },
        email:{
            required: [true, "Email is required"],
            type: String
        },
        password:{
            required: [true, "Password is required"],
            type: String
        },
        role:{
            required: [true, "Role is required"],
            type: String
        },
        gender:{
            required: [true, "Gender is required"],
            type: String
        },
    filename: String,
    url: String,
});
const Register = mongoose.model('register', fileSchema);
module.exports = Register;



