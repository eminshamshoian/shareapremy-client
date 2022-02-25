import Link from "next/link";

const UserNav = () => {
  return (
    <div
      class='d-flex flex-column flex-shrink-0 p-4 sidebar'
      style={{ background: "#1d0053" }}
    >
      <ul class='nav nav-pills flex-column mb-auto mt-2'>
        <li class='nav-item'>
          <Link href='/user'>
            <a className='nav-link active'>Dashboard</a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className='nav-link active'>Dashboard</a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className='nav-link active'>Dashboard</a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className='nav-link active'>Dashboard</a>
          </Link>
        </li>
        <li class='nav-item mt-4'>
          <Link href='/user'>
            <a className='nav-link active'>Dashboard</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
