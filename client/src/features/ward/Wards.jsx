import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
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
      <div className="heading">
        <h1>List of Wards</h1>
        <Link className="primary__btn" to="/add/wards">
          Add Ward
        </Link>
      </div>

      {status === "loading" ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>Ward Name</td>
              <td>Specialization</td>
              <td>Capacity</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {wards.map((ward) => {
              const { _id, ward_no, specialization, capacity } = ward;
              return (
                <tr key={_id} className="list__item">
                  <td>{ward_no}</td>
                  <td>{specialization}</td>
                  <td>{capacity}</td>
                  <td>
                    {" "}
                    <Link to={`/wards/${_id}`}>View</Link>
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
