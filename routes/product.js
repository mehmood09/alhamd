const express = require("express");
const {
     getPatients,
     getPatient,
     deletePatient,
     createPatient,
    } = require("../controllers/product");

const router = express.Router(); 

router.get("/", getPatients);
router.get("/:id", getPatient);
router.delete("/", deletePatient);
router.post("/", createPatient);

module.exports = router;