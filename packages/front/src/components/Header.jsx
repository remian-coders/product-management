import React from "react";

const Header = ({ ipAddress = "192.168.1.1" }) => {
  return (
    <div>
      <nav className="navbar bg-light border-bottom">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">address: {ipAddress}</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
