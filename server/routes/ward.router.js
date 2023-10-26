const express = require("express");
const router = express.Router();

//controllers
const {
  createWard,
  getAllWards,
  updateWard,
  deleteWard,
} = require("../controllers/ward.controller");

router.post("", async (req, res) => {
  const wardData = req.body;
  try {
    const savedWard = await createWard(wardData);
    if (savedWard) {
      res.status(201).json({ message: "Ward created", data: savedWard });
    } else {
      res.status(400).json({ message: "Ward creation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Servar Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const wards = await getAllWards();
    if (wards) {
      res.status(200).json({ message: "Wards list", data: wards });
    } else {
      res.status(404).json({ message: "Ward list not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Servar Error" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  const wardId = req.params.id;
  try {
    const updatedWard = await updateWard(wardId, updatedData);
    if (updatedWard) {
      res.status(200).json({ message: "Ward updated", data: updatedWard });
    } else {
      res.status(400).json({ message: "Ward Updation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Servar Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const wardId = req.params.id;
  try {
    const deletedWard = await deleteWard(wardId);
    if (deletedWard) {
      res.status(200).json({ message: "Ward deleted", data: deletedWard });
    } else {
      res.status(404).json({ message: "Ward not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Servar Error" });
  }
});

module.exports = router;
