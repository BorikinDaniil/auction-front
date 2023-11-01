import '../styles/globals.scss';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@store/index';
import { setContext } from '../services/axios';
import userApi from '@api/user';
import { User } from '@ITypes/index';
import { setUserInfo } from '@store/userSlice';

type AppOwnProps = { user: User }

function MyApp({ Component, pageProps, user }: AppProps & AppOwnProps) {
  if (user) store.dispatch(setUserInfo(user));

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
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
