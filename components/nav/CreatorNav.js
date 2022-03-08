import { useState, useEffect } from "react";
import Link from "next/link";

const CreatorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div
      className='flex-column p-4 sidebar mt-5'
      style={{ background: "#1d0053" }}
    >
      <ul className='nav nav-pills flex-column mb-auto mt-5'>
        <li className='nav-item mt-4'>
          <Link href='/user'>
            <a className={`nav-link ${current === "/user" && "active"}`}>
              User Dashboard
            </a>
          </Link>
        </li>
        <li className='nav-item mt-4'>
          <Link href='/creator/collection/create'>
            <a
              className={`nav-link ${
                current === "/creator/collection/create" && "active"
              }`}
            >
              Course Create
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CreatorNav;
