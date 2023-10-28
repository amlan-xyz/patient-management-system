import { configureStore } from "@reduxjs/toolkit";
import hospitalSlice from "../features/hospital/hospitalSlice";
import patientSlice from "../features/patient/patientSlice";
import wardSlice from "../features/ward/wardSlice";

export const store = configureStore({
  reducer: {
    patients: patientSlice,
    wards: wardSlice,
    hospital: hospitalSlice,
  },
});
