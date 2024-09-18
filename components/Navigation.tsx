import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  MailOutlined,
} from '@ant-design/icons';


import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from '../styles/Layout.module.scss';
import Link from 'next/link';
import { PAGES_WITHOUT_HEADER } from '@constants/common';

const items: MenuProps['items'] = [
  {
    label: (
      <Link href='/'>
        Home
      </Link>
    ),
    key: '/',
    icon: <MailOutlined />,
  },
];

const authItems: MenuProps['items'] = [
  
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const router = useRouter();

  const isAuthPage = PAGES_WITHOUT_HEADER.includes(router.pathname);

  const menuItems = isAuthPage ? authItems : items;
  

  return (
    <div className={styles.navigation}>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
    </div>
  );
};

export default Navigation;