import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientForm } from "./components/Forms/addPatientForm";
import { WardForm } from "./components/Forms/addWardForm";
import { Navbar } from "./components/Navbar/Navbar";
import { HospitalView } from "./features/hospital/Hospital";
import { PatientDetails } from "./features/patient/PatientDetails";
import PatientsView from "./features/patient/Patients";
import { WardDetails } from "./features/ward/WardDetails";
import { WardsView } from "./features/ward/Wards";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientsView />} />
        <Route path="/add/patient" element={<PatientForm />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/patient/:id/edit" element={<PatientForm />} />
        <Route path="/wards" element={<WardsView />} />
        <Route path="/add/wards" element={<WardForm />} />
        <Route path="/wards/:id" element={<WardDetails />} />
        <Route path="/wards/:id/edit" element={<WardForm />} />
        <Route path="/hospital/statistics" element={<HospitalView />} />
      </Routes>
    </div>
  );
}

export default App;
