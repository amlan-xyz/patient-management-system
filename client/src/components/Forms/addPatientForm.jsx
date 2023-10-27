import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPatientAsync,
  updatePatientAsync,
} from "../../features/patient/patientSlice";

export const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = useSelector((state) =>
    state.patients.patients.find(({ _id }) => _id === id)
  );

  const [name, setName] = useState(patient ? patient.name : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [gender, setGender] = useState(patient ? patient.gender : "");
  const [medicalHistory, setMedicalHistory] = useState(
    patient ? patient.medical_history : ""
  );
  const [phone, setPhone] = useState(patient ? patient.phone_no : "");
  const [address, setAddress] = useState(patient ? patient.address : "");
  const [ward, setWard] = useState(patient ? patient.ward : "");

  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    const newPatient = {
      name,
      age,
      gender,
      medical_history: medicalHistory,
      phone_no: phone,
      address,
      ward,
    };
    if (patient) {
      dispatch(
        updatePatientAsync({
          patientId: patient._id,
          updatedPatientData: newPatient,
        })
      );
    } else {
      dispatch(addPatientAsync(newPatient));
    }
    navigate("/");
  };

  return (
    <form action="" className="form__container">
      <div className="form__item">
        <label htmlFor="name">Patient Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form__item">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="form__item">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form__item">
        <label htmlFor="history">Medical History</label>
        <textarea
          id="history"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className="form__item">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form__item">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
        />
      </div>
      <div className="form__item">
        <label htmlFor="ward">Ward</label>
        <input
          type="text"
          id="ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
        />
        <div className="form__item">
          <button onClick={handleSumbit}>
            {patient ? "Update Patient" : "Add Patient"}
          </button>
        </div>
      </div>
    </form>
  );
};
