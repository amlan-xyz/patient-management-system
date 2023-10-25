const express = require("express");
const router = express.Router();

//controllers
const {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

router.post("", async (req, res) => {
  const patientDetails = req.body;
  try {
    const savedPatient = await createPatient(patientDetails);
    if (savedPatient) {
      res.status(201).json({ message: "Patient added", data: savedPatient });
    } else {
      res.status(400).json({ message: "Error creating patient" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const allPatients = await getAllPatients();
    if (allPatients) {
      res.status(200).json({
        message: "Fetching patients list successful",
        data: allPatients,
      });
    } else {
      res.status(404).json({ message: "Fetching paitents list failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const patientId = req.params.id;
  const updatedPatientData = req.body;
  try {
    const updatedPatient = await updatePatient(patientId, updatedPatientData);
    if (updatedPatient) {
      res
        .status(200)
        .json({ message: "Patient info updated", data: updatedPatient });
    } else {
      res.status(400).json({ message: "Patient info updation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const deletedPatient = await deletePatient(patientId);
    if (deletedPatient) {
      res
        .status(200)
        .json({ message: "Patient deleted", data: deletedPatient });
    } else {
      res.status(400).json({ message: "Patient deletion failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
