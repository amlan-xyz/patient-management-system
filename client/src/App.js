import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientForm } from "./components/Forms/addPatientForm";
import { Navbar } from "./components/Navbar/Navbar";
import { PatientDetails } from "./features/PatientDetails";
import PatientsView from "./features/patient/Patients";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientsView />} />
        <Route path="/add/patient" element={<PatientForm />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/patient/:id/edit" element={<PatientForm />} />
      </Routes>
    </div>
  );
}

export default App;
