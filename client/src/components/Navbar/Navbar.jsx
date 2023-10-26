import { NavLink } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <header className="nav__header">Patient Management System</header>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/">Patients</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/wards">Wards</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/hospital-statistics">Statistics</NavLink>
        </li>
      </ul>
    </div>
  );
};
