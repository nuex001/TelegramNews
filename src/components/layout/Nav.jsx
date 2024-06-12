import React from "react";
import { NavLink } from "react-router-dom";
import { SiHomeadvisor } from "react-icons/si";
import { SiTask } from "react-icons/si";
import { BsPatchPlus } from "react-icons/bs";
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="nav-link">
            <SiHomeadvisor className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className="nav-link create">
            <BsPatchPlus className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/task" className="nav-link">
            <SiTask className="icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
