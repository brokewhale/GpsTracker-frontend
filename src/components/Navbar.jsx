import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-con">
        <div className="nav__link">
          <Link to="/"> Map Box</Link>
        </div>
        <div className="nav__link">
          <Link to="/map-gl">Map Gl</Link>
        </div>
        <div className="nav__link">
          <Link to="/google">Google Map</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
