import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Import icons
import { HomeFilled, TeamOutlined, CarryOutOutlined } from "@ant-design/icons";

// Import context
import { Context } from "../context";

// Menu Items
const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  // Current state of the selected navitem
  const [current, setCurrent] = useState("");

  // Global state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

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
      {user && user.role && user.role.includes("Creator") ? (
        <Item
          key='/creator/collection/create'
          onClick={(e) => setCurrent(e.key)}
        >
          <Link href='/creator/collection/create'>
            <a className='typewriter menu-a-tag'>Create Collection</a>
          </Link>
        </Item>
      ) : user ? (
        <Item key='/user/become-creator' onClick={(e) => setCurrent(e.key)}>
          <Link href='/user/become-creator'>
            <a className='typewriter menu-a-tag-secondary'>Become A creator</a>
          </Link>
        </Item>
      ) : (
        <>
          <Item key='/' onClick={(e) => setCurrent(e.key)} className='nav-item'>
            <Link href='/#home'>
              <a className='typewriter menu-a-tag'>Home.</a>
            </Link>
          </Item>

          <Item
            key='/#about'
            onClick={(e) => setCurrent(e.key)}
            className='nav-item'
          >
            <Link href='/#about'>
              <a className='typewriter menu-a-tag'>explain it to me.</a>
            </Link>
          </Item>
          <Item
            key='/#pricing'
            onClick={(e) => setCurrent(e.key)}
            className='nav-item'
          >
            <Link href='/#pricing'>
              <a className='typewriter menu-a-tag'>pricing.</a>
            </Link>
          </Item>
          <Item
            key='/#recent'
            onClick={(e) => setCurrent(e.key)}
            className='nav-item'
          >
            <Link href='/#recent'>
              <a className='typewriter menu-a-tag'>recent collections.</a>
            </Link>
          </Item>
          <Item
            key='/login'
            onClick={(e) => setCurrent(e.key)}
            className='nav-item'
            style={{ marginLeft: "auto" }}
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
        </>
      )}

      {user && user.role && user.role.includes("Creator") && (
        <Item key='/creator' onClick={(e) => setCurrent(e.key)}>
          <Link href='/creator'>
            <a className='typewriter menu-a-tag'>creator portal</a>
          </Link>
        </Item>
      )}

      {user !== null && (
        <SubMenu
          icon={<HomeFilled style={{ fontSize: "20px" }} />}
          title={user && user.name}
          style={{ marginLeft: "auto" }}
          className='subclass'
        >
          <ItemGroup>
            <Item key='/user' className='nav-item'>
              <Link href='/user'>
                <a className='typewriter menu-a-tag'>Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout} className='nav-item'>
              <a className='typewriter menu-a-tag'>Logout</a>
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
