import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePatientAsync } from "./patient/patientSlice";

export const PatientDetails = () => {
  const { id } = useParams();
  const patient = useSelector((state) =>
    state.patients.patients.find(({ _id }) => _id === id)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deletePatientAsync(id));
    navigate("/");
  };

  return (
    <div className="details__container">
      {patient ? (
        <>
          <h3>{patient.name}</h3>
          <Link to={`/patient/${patient._id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <h1>No patient found</h1>
      )}
    </div>
  );
};
