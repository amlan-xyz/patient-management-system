import { NavLink } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <header className="nav__header">Patient Management System</header>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="nav__link" to="/">
            Patients
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/wards">
            Wards
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/hospital/statistics">
            Hospital
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
