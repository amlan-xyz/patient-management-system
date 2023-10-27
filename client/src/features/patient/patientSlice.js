import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/patients";

export const fetchPatientsAsync = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(`${url}`);
    const { data } = response.data;
    return data;
  }
);

export const addPatientAsync = createAsyncThunk(
  "patients/addPatient",
  async (patientData) => {
    const response = await axios.post(`${url}`, patientData);
    const { data } = response.data;
    return data;
  }
);

export const updatePatientAsync = createAsyncThunk(
  "patients/updatePatient",
  async ({ patientId, updatedPatientData }) => {
    const response = await axios.put(`${url}/${patientId}`, updatedPatientData);
    const { data } = response.data;
    return data;
  }
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatient",
  async (patientId) => {
    const response = await axios.delete(`${url}/${patientId}`);
    const { data } = response.data;
    return data;
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  extraReducers: {
    [fetchPatientsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatientsAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatientsAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex(
        (patient) => patient._id === updatedPatient._id
      );
      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        ({ _id }) => _id !== action.payload._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default patientSlice.reducer;
