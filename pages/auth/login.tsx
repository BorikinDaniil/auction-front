import type { NextPage } from 'next';
import Head from 'next/head';
// Components
import Subscription from '@Components/Subscription';
import { LOGIN_DESCRIPTION } from '@constants/content';
import LoginForm from './components/LoginForm';
import AuthDescription from './components/AuthDescription';
// Constants

const Login: NextPage = () => (
  <div className="page d-flex flex-column flex-align-center justify-content-center">
    <Head>
      <title>Auction - Login</title>
    </Head>
    <div className="d-flex justify-content-center w-100">
      <LoginForm />
      <AuthDescription content={LOGIN_DESCRIPTION} />
    </div>
    <Subscription />
  </div>
);

export default Login;
