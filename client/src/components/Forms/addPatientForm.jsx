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

  const { wards } = useSelector((state) => state.wards);

  const [name, setName] = useState(patient ? patient.name : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [gender, setGender] = useState(patient ? patient.gender : "");
  const [medicalHistory, setMedicalHistory] = useState(
    patient ? patient.medical_history : ""
  );
  const [phone, setPhone] = useState(patient ? patient.phone_no : "");
  const [address, setAddress] = useState(patient ? patient.address : "");
  const [ward, setWard] = useState(patient ? patient.ward : "");
  const [duration, setDuration] = useState(patient ? patient.duration : "");

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
      duration,
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
    <div className="form__container">
      {patient ? <h2>Edit Patient Details</h2> : <h2>Add Patient Details</h2>}
      <form action="" className="form__body">
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
          <select
            id="ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            <option value="">Select</option>
            {wards.map((ward) => (
              <option value={ward.ward_no}>{ward.ward_no}</option>
            ))}
          </select>
        </div>
        <div className="form__item">
          <label htmlFor="duration">Duration of stay</label>
          <select
            id="duration"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          >
            <option value="">Select</option>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
          </select>
        </div>
        <div className="form__item">
          <button className="submit__btn" onClick={handleSumbit}>
            {patient ? "Update Patient" : "Add Patient"}
          </button>
        </div>
      </form>
    </div>
  );
};
