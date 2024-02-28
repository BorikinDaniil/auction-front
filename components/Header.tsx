import React, {useCallback} from 'react';
import styles from '../styles/Layout.module.scss';
import { useDispatch } from 'react-redux';
import { removeCookie } from '@utils/cookies';
import Navigation from '@Components/Navigation';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { setUserInfo } from '@store/userSlice';
import { PAGES_WITHOUT_HEADER } from '../constants/common';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPageWithHeader = !PAGES_WITHOUT_HEADER.includes(router.pathname);

  const setUserDefaultInfo = useCallback(() => {
    dispatch(setUserInfo(null));
  }, [dispatch]);

  const logout = useCallback(async() => {
    setUserDefaultInfo();
    removeCookie();
    await router.push('/auth/login');
  }, [router, setUserDefaultInfo]);
  
  return (
    isPageWithHeader
      ? <div className={styles.header}>
      <Navigation />
      <Button 
        type="primary"
        onClick={logout}
      >
        Logout
      </Button>
    </div> 
      : null
  );
};

export default Header;
