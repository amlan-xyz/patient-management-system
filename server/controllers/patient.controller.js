const Patient = require("../models/patient.model");

const createPatient = async (patientDetails) => {
  const { name, age, gender, medical_history, phone_no, address, ward } =
    patientDetails;
  try {
    const newPatient = {
      name,
      age,
      gender,
      medical_history,
      phone_no,
      address,
      ward,
    };
    const patient = new Patient(newPatient);
    const savedPatient = await patient.save();
    return savedPatient;
  } catch (error) {
    console.error("Error creating patient:-", error);
  }
};

const getAllPatients = async () => {
  try {
    const patients = await Patient.find({});
    return patients;
  } catch (error) {
    console.error("Error getting patients:-", error);
  }
};

const updatePatient = async (patientId, updatedPatientData) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedPatientData,
      { new: true }
    );
    return updatedPatient;
  } catch (error) {
    console.error("Error updating patient info:-", error);
  }
};

const deletePatient = async (patientId) => {
  try {
    const deletedPatient = await Patient.findByIdAndRemove(patientId);
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient:-", error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
};
