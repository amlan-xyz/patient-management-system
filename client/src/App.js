import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import PatientsView from "./features/patient/Patients";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientsView />} />
      </Routes>
    </div>
  );
}

export default App;
