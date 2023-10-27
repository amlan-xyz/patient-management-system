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
      {ward ? (
        <>
          <h3>{ward.ward_no}</h3>
          <Link to={`/wards/${ward._id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <h1>Ward Details Not Found</h1>
      )}
    </div>
  );
};
