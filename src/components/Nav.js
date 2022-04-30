import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = (props) => {
  let location = useLocation();
  let { pathname } = location;
  const links = [
    { to: "home", text: `Booklist` },
    { to: "wishlist", text: `Wishlist` },
  ];
  return (
      <nav className={style["links"]}>
      <h1>Books</h1>
          {links.map((link, idx) => (
            <Link
              className={pathname.slice(1) === link.to ? "selected" : ""}
              key={idx}
              to={link.to}
            >
              {link.text}
            </Link>
          ))}
        <Outlet />
      </nav>
  );
};
export default Nav;
