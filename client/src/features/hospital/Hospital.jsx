import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHospitalStats } from "./hospitalSlice";
export const HospitalView = () => {
  const hospitalStats = useSelector((state) => state.hospital);
  const { wards } = useSelector((state) => state.wards);
  const { patients } = useSelector((state) => state.patients);

  const dispatch = useDispatch();

  useEffect(() => {
    const totalPatients = patients.length;
    const totalStayTime = patients.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    const averageStayLength = totalStayTime / totalPatients;
    const totalCapacity = wards.reduce((acc, curr) => acc + curr.capacity, 0);
    const totalOccupancyRate = (totalPatients / totalCapacity) * 100;

    const wardOccupants = patients.reduce((acc, curr) => {
      const foundWard = acc.find((ward) => ward.ward === curr.ward);
      if (!foundWard) {
        acc.push({ ward: curr.ward, count: 1 });
      } else {
        acc = acc.map((ward) => {
          if (ward.ward === curr.ward) {
            ward.count++;
          }
          return ward;
        });
      }
      return acc;
    }, []);

    const topPerformingWard = wardOccupants.reduce((acc, curr) => {
      if (acc.count < curr.count) {
        return curr;
      } else {
        return acc;
      }
    }, wardOccupants[0]);

    dispatch(
      updateHospitalStats({
        totalPatients,
        totalOccupancyRate,
        averageStayLength,
        wardOccupants,
        topPerformingWard,
      })
    );
  }, [wards, patients, dispatch]);

  return (
    <div className="container">
      <h1>Hospital View</h1>
      <p>Total Patients: {hospitalStats.totalPatients}</p>
      <p>
        Total Occupancy Rate :{" "}
        {hospitalStats.totalOccupancyRate.toFixed(2) ?? 0}%
      </p>
      <p>
        Average Stay Length : {hospitalStats.averageStayLength.toFixed(2)} days
      </p>
      <p>Top Performing Ward: {hospitalStats.topPerformingWard.ward}</p>
    </div>
  );
};
