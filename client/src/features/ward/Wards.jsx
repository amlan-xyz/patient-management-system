import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWardsAsync } from "./wardSlice";

export const WardsView = () => {
  const dispatch = useDispatch();
  const { status, wards, error } = useSelector((state) => state.wards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWardsAsync());
    }
  }, [status, dispatch]);
  return (
    <div className="container">
      <h1>Wards View</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/add/wards">Add Ward</Link>
          <ul className="list">
            {wards.map((ward) => {
              const { _id, ward_no, specialization } = ward;
              return (
                <li key={_id} className="list__item">
                  {ward_no} || {specialization}
                  <Link to={`/wards/${_id}`}>Details</Link>
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
