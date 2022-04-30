import React from "react";
import { Link, NavLink } from "react-router-dom";
import { capitalize } from "../utils/capitalize";

const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ border: "1px solid black", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Link className="navbar-brand" to="/">
        Spellbook
      </Link>
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/spells">
            Spells
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/">
                {capitalize(user.name)}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
