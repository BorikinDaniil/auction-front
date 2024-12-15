import React from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
// Store
import { Provider } from 'react-redux';
import store from '@store/index';
import { setUserInfo } from '@store/userSlice';
// API
import userApi from '@api/user';
// Components
import Header from '@Components/Header';
import { ConfigProvider } from 'antd';
// Constants
import { antdTheme } from '@constants/antd';
// Types
import { User } from '@Types/user';
// Services
import { setContext } from '@services/axios';
// Styles
import '@styles/globals.scss';

type AppOwnProps = { user: User };

const MyApp = ({ Component, pageProps, user }: AppProps & AppOwnProps) => {
  if (user) store.dispatch(setUserInfo(user));

  return (
    <ConfigProvider theme={antdTheme}>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
};

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx: AppInitialProps = await App.getInitialProps(context);
  /* eslint-disable-next-line */
  const serverSidePropsContext: any = context.ctx;
  const accessToken = serverSidePropsContext?.req?.cookies?.accessToken;
  let user: User = null;

  if (!accessToken) return { ...ctx, user };

  setContext(serverSidePropsContext);

  try {
    user = (await userApi.getCurrentUser())?.data;
    /* eslint-disable-next-line */
  } catch (e: any) {
    console.error(e.resopnse);
  }

  return { ...ctx, user };
};

export default MyApp;
