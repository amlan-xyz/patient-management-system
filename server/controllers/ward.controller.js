const Ward = require("../models/ward.model");

const createWard = async (wardData) => {
  const { ward_no, capacity, specialization } = wardData;
  try {
    const newWard = {
      ward_no,
      capacity,
      specialization,
    };
    const ward = new Ward(newWard);
    const savedWard = await ward.save();
    return savedWard;
  } catch (error) {
    console.error("Error creating ward:-", error);
  }
};

const getAllWards = async () => {
  try {
    const wards = await Ward.find();
    return wards;
  } catch (error) {
    console.error("Error getting wards:-", error);
  }
};

const updateWard = async (wardId, updatedData) => {
  try {
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedData, {
      new: true,
    });
    return updatedWard;
  } catch (error) {
    console.error("Error updating ward:-", error);
  }
};

const deleteWard = async (wardId) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(wardId);
    return deletedWard;
  } catch (error) {
    console.error("Error deleting ward:-", error);
  }
};

module.exports = { createWard, getAllWards, updateWard, deleteWard };
