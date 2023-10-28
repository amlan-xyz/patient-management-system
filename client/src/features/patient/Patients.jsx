import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
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
      <div className="heading">
        <h1>List of Patients</h1>
        <Link className="primary__btn" to="/add/patient">
          Add Patient
        </Link>
      </div>

      {status === "loading" ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Gender</td>
              <td>Medical History</td>
              <td>Ward</td>
              <td>Duration</td>
              <td>Phone No</td>
              <td>Address</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              const {
                _id,
                name,
                age,
                gender,
                medical_history,
                ward,
                duration,
                phone_no,
                address,
              } = patient;
              return (
                <tr key={_id} className="list__item">
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{gender}</td>
                  <td>{medical_history}</td>
                  <td>{ward}</td>
                  <td>{duration} days</td>
                  <td>{phone_no}</td>
                  <td>{address}</td>
                  <td>
                    <Link to={`/patient/${_id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {status === "error" && <p>{error}</p>}
    </div>
  );
};

export default PatientsView;
