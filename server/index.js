require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//cors
app.use(cors());

//router
const patientRouter = require("./routes/patient.router");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Patient Management System" });
});

app.use("/patient", patientRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
