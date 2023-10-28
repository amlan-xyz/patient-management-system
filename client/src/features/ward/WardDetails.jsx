import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteWardAsync } from "./wardSlice";

export const WardDetails = () => {
  const { id } = useParams();
  const ward = useSelector((state) =>
    state.wards.wards.find((ward) => ward._id === id)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteWardAsync(id));
    navigate("/wards");
  };

  return (
    <div className="details__container">
      <h2>Ward Details</h2>
      <div className="details__body">
        {ward ? (
          <>
            <h2>{ward.ward_no}</h2>
            <h3>Specialization</h3>

            <p>{ward.specialization}</p>
            <h3>Capacity</h3>
            <p>{ward.capacity}</p>
            <div className="details__btn-container">
              <Link className="primary__btn" to={`/wards/${ward._id}/edit`}>
                Edit
              </Link>
              <button className="secondary_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h1>Ward Details Not Found</h1>
        )}
      </div>
    </div>
  );
};
