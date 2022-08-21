import React from "react";

const Header = ({ logoutHandler }) => {
  return (
    <div>
      <nav className="navbar bg-light border-bottom">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Incasare Table</span>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={logoutHandler}
          >
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
