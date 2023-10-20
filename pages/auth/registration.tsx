import type { NextPage } from 'next';
import Head from 'next/head';
import RegistrationForm from './components/RegistrationForm';
const Registration: NextPage = () => {
  return (
    <div className="page d-flex flex-align-center justify-content-center">
      <Head>
        <title>Auction - Registration</title>
      </Head>
      <RegistrationForm />
    </div>
  );
};

export default Registration;