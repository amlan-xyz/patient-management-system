import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../features/patient/patientSlice";
import wardSlice from "../features/ward/wardSlice";

export const store = configureStore({
  reducer: {
    patients: patientSlice,
    wards: wardSlice,
  },
});
