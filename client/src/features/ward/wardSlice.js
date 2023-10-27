import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/wards";

export const fetchWardsAsync = createAsyncThunk(
  "wards/fetchWards",
  async () => {
    const response = await axios.get(`${url}`);
    const { data } = response.data;
    return data;
  }
);

export const addWardAsync = createAsyncThunk(
  "wards/addWard",
  async (wardData) => {
    const response = await axios.post(`${url}`, wardData);
    const { data } = response.data;
    return data;
  }
);

export const updateWardAsync = createAsyncThunk(
  "wards/updateWard",
  async ({ wardId, updatedWardData }) => {
    const response = await axios.put(`${url}/${wardId}`, updatedWardData);
    const { data } = response.data;
    return data;
  }
);

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWard",
  async (wardId) => {
    const response = await axios.delete(`${url}/${wardId}`);
    const { data } = response.data;
    return data;
  }
);

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const wardSlice = createSlice({
  name: "wards",
  initialState,
  extraReducers: {
    [fetchWardsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWardsAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWardsAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Failed to fetch ward details";
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.wards.push(action.payload);
      state.status = "success";
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error adding new ward details";
    },
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      const updatedWard = action.payload;
      const wardId = updatedWard._id;
      const index = state.wards.findIndex((ward) => ward._id === wardId);
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
      state.status = "success";
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      const wardId = action.payload._id;
      state.wards = state.wards.filter((ward) => ward._id !== wardId);
      state.status = "success";
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});
export default wardSlice.reducer;
