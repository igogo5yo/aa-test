import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";

import "./Layout.css";

const getClassName = ({ isActive }: { isActive: boolean }) => classNames('city-link', {
  'active': isActive
});

const Layout: React.FC = () => {
  return (
    <div className="container">
      <nav className="item navigation">
        <NavLink className={getClassName} to="/">Ottawa</NavLink>
        <NavLink className={getClassName} to="/moscow">Moscow</NavLink>
        <NavLink className={getClassName} to="/tokyo">Tokyo</NavLink>
      </nav>
      <div className="item container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
