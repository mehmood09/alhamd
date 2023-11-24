require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const path = require("path")


const patientRoutes = require("./routes/product");
const contactRoutes = require("./routes/contact");
//const registerRoutes = require("./routes/register");
const cors = require("cors");

const app = express();
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());

const port= process.env.PORT || 3000;
const host=process.env.HOST || '0.0.0.0';

async function dbConnection(){
    const mongoString = process.env.DATABASE_URL;
    await mongoose.connect(mongoString);
    console.log('Connected to MongoDB Successfully.');
}

dbConnection().catch(err => console.error(err));
// config cloudinary
/* cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}); */
cloudinary.config({ 
    cloud_name: 'alhamdsolution', 
    api_key: '863516813626593', 
    api_secret: '8Pnb-L_gMj1YzyQXtx145ci5qxY'
  });
//configure multer for file uploads
const storage=multer.memoryStorage();
const upload = multer({ storage });

// define a schema for storing file references in MongoDB
const fileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    gender: String,
    filename: String,
    url: String,
});
const File = mongoose.model('register', fileSchema);

// Handle file upload 
app.post('/upload', upload.single('file'), async (req, res) => {
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
        const newFile = new File({
            name, email, password,role,gender,
            filename: req.file.originalname,
            url: result.secure_url
        });
        newFile.save();

        // Remove temporary file
        // fs.unlinkSync(tempFilePath);
        res.json({ url: result.secure_url });
    }
    catch(error) {
        console.error('Error', error);
        res.status(500).json({error: 'Server error'});
    }
});

app.get("/", (req, res) => {
    res.send("NxB REST API");
});
// Here we define its routes in this way
app.use("/patients", patientRoutes)
app.use("/contact", contactRoutes) 
//app.use("/register", registerRoutes) 
app.listen(port, host, () => {
    console.log(`Server is running on port ${5000}`)
})



