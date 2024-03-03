import type { NextPage } from 'next';
import Head from 'next/head';
// Components
import LoginForm from './components/LoginForm';
import AuthDescription from './components/AuthDescription';
// Constants
import { LOGIN_DESCRIPTION } from '@constants/content';
const Login: NextPage = () => {
  return (
    <div className="page d-flex flex-align-center justify-content-center without-header">
      <Head>
        <title>Auction - Login</title>
      </Head>
      <div className="d-flex">
        <LoginForm />
        <AuthDescription content={LOGIN_DESCRIPTION} />
      </div>
    </div>
  );
};

export default Login;