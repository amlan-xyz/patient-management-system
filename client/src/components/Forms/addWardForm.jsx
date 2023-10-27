import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addWardAsync, updateWardAsync } from "../../features/ward/wardSlice";

export const WardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ward = useSelector((state) =>
    state.wards.wards.find(({ _id }) => id === _id)
  );

  const [wardNo, setWardNo] = useState(ward ? ward.ward_no : "");
  const [capacity, setCapacity] = useState(ward ? ward.capacity : "");
  const [specialization, setSpecialization] = useState(
    ward ? ward.specialization : ""
  );

  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    const newWard = {
      ward_no: wardNo,
      capacity,
      specialization,
    };

    if (ward) {
      dispatch(updateWardAsync({ wardId: ward._id, updatedWardData: newWard }));
    } else {
      dispatch(addWardAsync(newWard));
    }

    navigate("/wards");
  };

  return (
    <div className="form__container">
      <form action="" className="form__body">
        <div className="form__item">
          <label htmlFor="wardNo">Ward No.</label>
          <input
            type="text"
            id="wardNo"
            value={wardNo}
            onChange={(e) => setWardNo(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
        <div className="form__item">
          <button onClick={handleSumbit}>
            {ward ? "Update ward" : "Add Ward"}
          </button>
        </div>
      </form>
    </div>
  );
};
