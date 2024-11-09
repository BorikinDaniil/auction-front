import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// Utils
import { removeCookie } from '@utils/cookies';
// Components
import Navigation from '@Components/Navigation';
import { Button } from 'antd';
import AInput from '@Components/controls/AInput';
// Store
import { setUserInfo } from '@store/userSlice';
import { setIsMobile, setIsTablet } from '@store/uiSlice';
// Styles
import styles from '@styles/Layout.module.scss';
// Types
import { RootState } from '@Types/user';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setIsMobileView = useCallback((payload: boolean) => dispatch(setIsMobile(payload)), [dispatch]);
  const setIsTabletView = useCallback((payload: boolean) => dispatch(setIsTablet(payload)), [dispatch]);
  
  const isTablet = useSelector((state: RootState) => state.ui.isTablet);
  const isMobile = useSelector((state: RootState) => state.ui.isMobile);

  const setUserDefaultInfo = useCallback(() => {
    dispatch(setUserInfo(null));
  }, [dispatch]);

  const checkWidth = useCallback(() => {
    if (!window) return;

    const { innerWidth } = window;

    if (innerWidth <= 1024 && innerWidth > 767 && !isTablet) {
      setIsTabletView(true);

      return;
    }

    if (innerWidth <= 767 && !isMobile) {
      setIsMobileView(true);

      return;
    }

    if ((isMobile || isTablet) && innerWidth > 1024) {
      setIsMobileView(false);
      setIsTabletView(false);
    }
  }, [isMobile, isTablet, setIsTabletView, setIsMobileView]);

  const addListener = useCallback(() => {
    if (window) window.addEventListener('resize', checkWidth);

    checkWidth();
  }, [checkWidth]);

  const removeListener = useCallback(() => {
    if (window) window.removeEventListener('resize', checkWidth);
  }, [checkWidth]);

  useEffect(() => {
    addListener();

    return removeListener;
  }, [addListener, removeListener]);

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
            <AInput
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
