import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// Utils
import { removeCookie } from '@utils/cookies';
// Component
import Navigation from '@Components/Navigation';
import { Button, Input } from 'antd';
// Store
import { setUserInfo } from '@store/userSlice';
// Styles
import styles from '../styles/Layout.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setUserDefaultInfo = useCallback(() => {
    dispatch(setUserInfo(null));
  }, [dispatch]);

  const logout = useCallback(async() => {
    setUserDefaultInfo();
    removeCookie();
    await router.push('/auth/login');
  }, [router, setUserDefaultInfo]);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Navigation />
        <div className="mr-24 w-100">
          <Input
            className={styles.header__search}
            placeholder="Search for products..."
          />
        </div>
        <Button
          className="small"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
