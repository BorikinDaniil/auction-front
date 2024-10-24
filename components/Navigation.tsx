import React, { useState } from 'react';
import { useRouter } from 'next/router';
// Components
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
// Types
import type { MenuProps } from 'antd';
// Constants
import { PAGES_WITHOUT_HEADER } from '@constants/common';
// Styles
import styles from '@styles/Layout.module.scss';

const items: MenuProps['items'] = [
  {
    label: (
      <Link href="/">
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
