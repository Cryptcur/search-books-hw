import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  let location = useLocation();
  let { pathname } = location;
  const links = [
    { to: "home", text: `Booklist` },
    { to: "wishlist", text: `Wishlist` },
  ];
  return (
      <nav className={style["links"]}>
          {links.map((link, idx) => (
            <div key={idx} id={style['link']}>
              <Link
                className={pathname.slice(1) === link.to ? style["selected"] : style["not-selected"]}
                to={link.to}
              >
                {link.text}
              </Link>
            </div>
          ))}
        <Outlet />
      </nav>
  );
};
export default Nav;
