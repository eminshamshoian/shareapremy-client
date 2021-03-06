import { useState, useEffect } from "react";
import Link from "next/link";

const CreatorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className='sidebar-content'>
      <div
        className='d-flex flex-column flex-shrink-0 p-4 sidebar'
        style={{ background: "#1d0053" }}
      >
        <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item mt-4'>
            <Link href='/creator/collection/create'>
              <a
                className={`nav-link ${
                  current === "/creator/collection/create" && "active"
                }`}
              >
                Create Collection
              </a>
            </Link>
          </li>
          <li className='nav-item mt-4'>
            <Link href='/creator/revenue'>
              <a
                className={`nav-link ${
                  current === "/creator/collection/create" && "active"
                }`}
              >
                Revenue
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreatorNav;
