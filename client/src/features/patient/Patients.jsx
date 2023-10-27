import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPatientsAsync } from "./patientSlice";

const PatientsView = () => {
  const dispatch = useDispatch();
  const { status, patients, error } = useSelector((state) => state.patients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatientsAsync());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <h1>Patients View</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/add/patient">Add Patient</Link>
          <ul className="list">
            {patients.map((patient) => {
              const { _id, name } = patient;
              return (
                <li key={_id} className="list__item">
                  {name}
                  <Link to={`/patient/${_id}`}>Details</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {status === "error" && <p>{error}</p>}
    </div>
  );
};

export default PatientsView;
