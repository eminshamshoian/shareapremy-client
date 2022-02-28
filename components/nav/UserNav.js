import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div
      class='d-flex flex-column flex-shrink-0 p-4 sidebar mt-5'
      style={{ background: "#1d0053" }}
    >
      <ul class='nav nav-pills flex-column mb-auto mt-5'>
        <li class='nav-item'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              Dashboard
            </a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              Dashboard
            </a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              Dashboard
            </a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              Dashboard
            </a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              Dashboard
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
