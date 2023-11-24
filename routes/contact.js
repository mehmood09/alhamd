const express = require("express");
const {
     getContacts,
     createContact,
    } = require("../controllers/contact");

const router = express.Router(); 

router.get("/", getContacts);
router.post("/", createContact);
//router.get("/:id", getPatient);
//router.delete("/", deletePatient);
module.exports = router;