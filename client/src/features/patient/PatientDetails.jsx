import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePatientAsync } from "./patientSlice";

export const PatientDetails = () => {
  const { id } = useParams();
  const patient = useSelector((state) =>
    state.patients.patients.find(({ _id }) => _id === id)
  );

  const {
    name,
    age,
    gender,
    medical_history,
    ward,
    duration,
    phone_no,
    address,
  } = patient;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deletePatientAsync(id));
    navigate("/");
  };

  return (
    <div className="details__container">
      <h2>Patient Details</h2>
      <div className="details__body">
        {patient ? (
          <>
            <h2>{name}</h2>
            <p>
              {age} years , {gender}{" "}
            </p>
            <h3>Medical History:</h3>
            <p>{medical_history}</p>
            <h3>Ward</h3>
            <p>
              {ward} , Admitted for : {duration} days
            </p>
            <h3>Contact Information</h3>
            <p>Phone : {phone_no}</p>
            <p>Address : {address}</p>
            <div className="details__btn-container">
              <Link
                className="primary__btn"
                to={`/patient/${patient._id}/edit`}
              >
                Edit
              </Link>
              <button className="secondary_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h1>No patient found</h1>
        )}
      </div>
    </div>
  );
};
