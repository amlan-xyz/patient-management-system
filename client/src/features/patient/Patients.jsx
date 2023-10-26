import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          <ul className="list">
            {patients.map((patient) => {
              const { _id, name } = patient;
              return (
                <li key={_id} className="list__item">
                  {name}
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
