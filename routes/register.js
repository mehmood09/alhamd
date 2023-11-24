const express = require("express");
const {
     getRegister,
     createRegister,
    } = require("../controllers/register");

const router = express.Router(); 

router.get("/", getRegister);
router.post("/", createRegister);
//router.get("/:id", getPatient);
//router.delete("/", deletePatient);
module.exports = router;