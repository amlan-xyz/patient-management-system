const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    ward_no: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ward = mongoose.model("Ward", wardSchema);
module.exports = Ward;
