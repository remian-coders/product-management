import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="navbar bg-light border-bottom">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Incasare Table - {new Date().toLocaleDateString()}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
