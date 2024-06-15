import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">FRIENDS DATABASE</div>
      <nav className="nav-links">
        <Link to="/friends" className="nav-link">
          FRIENDLIST.
        </Link>
        <Link to="/friends/add" className="nav-link">
          ADDFRIEND.
        </Link>
        <Link to="/logout" className="nav-link">
          LOGOUT
        </Link>
      </nav>
    </header>
  );
};

export default Header;
