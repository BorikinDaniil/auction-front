import '../styles/globals.scss';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@store/index';
import { setContext } from '../services/axios';
import userApi from '@api/user';
import { User } from '../types/user';
import { setUserInfo } from '@store/userSlice';
import Header from '@Components/Header';
import { ConfigProvider } from 'antd';
import { antdTheme } from '@constants/antd';

type AppOwnProps = { user: User }

function MyApp({ Component, pageProps, user }: AppProps & AppOwnProps) {
  if (user) store.dispatch(setUserInfo(user));

  return (
    <ConfigProvider
      theme={antdTheme}
    >
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async(
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx: AppInitialProps = await App.getInitialProps(context);
  const serverSidePropsContext: any = context.ctx;
  const accessToken = serverSidePropsContext?.req?.cookies?.accessToken;
  let user: User = null;

  if (!accessToken) return { ...ctx, user };


  setContext(serverSidePropsContext);

  try {
    user = (await userApi.getCurrentUser()).data;

  } catch (e: any) {
    console.log(e);
  }

  return { ...ctx, user };
};

export default MyApp;
