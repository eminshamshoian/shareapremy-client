import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Row, Col, Icon } from 'antd';

// Import icons
import { HomeFilled } from '@ant-design/icons';

// Import context
import { Context } from '../context';

// Menu Items
const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  // Current state of the selected navitem
  const [current, setCurrent] = useState('');

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
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
    const { data } = await axios.get('/api/logout');
    toast.success(data.message);
    router.push('/login');
  };

  return (
    // Give each menu item a key and set current state to that navitem and selectedKeys to the current key array
    <Menu className='top-nav' mode='horizontal' selectedKeys={[current]}>
      <Item key='/' onClick={(e) => setCurrent(e.key)} className='nav-item'>
        <Link href='/'>
          <a className='typewriter menu-a-tag'>Home</a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key='/login'
            onClick={(e) => setCurrent(e.key)}
            className='nav-item'
            style={{ marginLeft: 'auto' }}
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

      {user !== null && (
        <SubMenu
          icon={<HomeFilled style={{ fontSize: '20px' }} />}
          title={user && user.name}
          style={{ marginLeft: 'auto' }}
          className='subclass'
        >
          <ItemGroup>
            <Item key='/user' className='nav-item'>
              <a className='typewriter menu-a-tag'>Dashboard</a>
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
