import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Import context
import { Context } from "../context";

// Menu Items
const { Item } = Menu;

const TopNav = () => {
  // Current state of the selected navitem
  const [current, setCurrent] = useState("");

  // Global state
  const { state, dispatch } = useContext(Context);

  // Router
  const router = useRouter();

  // useEffect on client side only and set current state to the current window
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  // Logout
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  return (
    // Give each menu item a key and set current state to that navitem and selectedKeys to the current key array
    <Menu className='top-nav' mode='horizontal' selectedKeys={[current]}>
      <Item key='/' onClick={(e) => setCurrent(e.key)} className='nav-item'>
        <Link href='/'>
          <a className='typewriter menu-a-tag'>Home</a>
        </Link>
      </Item>
      <Item
        key='/login'
        onClick={(e) => setCurrent(e.key)}
        className='nav-item'
      >
        <Link href='/login'>
          <a className='typewriter menu-a-tag'>Login</a>
        </Link>
      </Item>
      <Item
        key='/register'
        onClick={(e) => setCurrent(e.key)}
        className='nav-item'
      >
        <Link href='/register'>
          <a className='typewriter menu-a-tag'>Register</a>
        </Link>
      </Item>
      <Item onClick={logout} className='nav-item'>
        <a className='typewriter menu-a-tag'>Logout</a>
      </Item>
    </Menu>
  );
};

export default TopNav;
