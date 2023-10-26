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
  },
});

export default patientSlice.reducer;
