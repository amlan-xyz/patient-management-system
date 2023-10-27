const mongoose = require("mongoose");

const patientSchema = new mongoose.mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    medical_history: {
      type: String,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: String,
    duration: Number,
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
