const mongoose = require('mongoose');
const Register = require("../models/register")

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const path = require("path")

// GET Method 
let getRegister = async (req, res) => {    
    try {
        const contacts = await Register.find();
        res.status(200).send({data:contacts});
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }    
};
cloudinary.config({ 
    cloud_name: 'alhamdsolution', 
    api_key: '863516813626593', 
    api_secret: '8Pnb-L_gMj1YzyQXtx145ci5qxY'
  });
//configure multer for file uploads
const storage=multer.memoryStorage();
const upload = multer({ storage });
// POST Method to Handle file upload 

//app.post('/register', upload.single('file'), async (req, res) => {
let createRegister = (upload.single('file'), async (req, res) => {
    try {

        if(!req.file) {
            return res.status(400).json({message:"No file to upload"})
        }
        // write the buffer to a temporary file
        const tempFilePath = path.join(__dirname, 'uploads/profiles/', req.file.originalname);
        fs.writeFileSync(tempFilePath, req.file.buffer);
        
        // upload the temporary file to cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, { resource_type: 'auto' })
        // save file reference in MOngoDB
        const {name, email, password,role,gender} = req.body
        const newFile = new Register({
            name, email, password,role,gender,
            filename: req.file.originalname,
            url: result.secure_url
        });
        newFile.save();
        // Remove temporary file // fs.unlinkSync(tempFilePath);
        res.json({ url: result.secure_url });
    }
    catch(error) {
        console.error('Error', error);
        res.status(500).json({error: 'Server error'});
    }
});

module.exports = { getRegister,createRegister };