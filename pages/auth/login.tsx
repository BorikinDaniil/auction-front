import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from './components/LoginForm';
const Login: NextPage = () => {
  return (
    <div className="page d-flex flex-align-center justify-content-center">
      <Head>
        <title>Auction - Login</title>
      </Head>
      <LoginForm />
    </div>
  );
};

export default Login;