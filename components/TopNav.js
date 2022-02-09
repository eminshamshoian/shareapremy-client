import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

// Menu Items
const { Item } = Menu;

const TopNav = () => {
  return (
    <Menu className='top-nav' mode='horizontal'>
      <Item>
        <Link href='/'>
          <a className='typewriter menu-a-tag'>Home</a>
        </Link>
      </Item>
      <Item>
        <Link href='/login'>
          <a className='typewriter menu-a-tag'>Login</a>
        </Link>
      </Item>
      <Item className='nav-item'>
        <Link href='/register'>
          <a className='typewriter menu-a-tag'>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
