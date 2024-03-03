import type { NextPage } from 'next';
import Head from 'next/head';
// Components
import RegistrationForm from './components/RegistrationForm';
import AuthDescription from './components/AuthDescription';
// Constants
import { REGISTRATION_DESCRIPTION } from '@constants/content';

const Registration: NextPage = () => {
  return (
    <div className="page d-flex flex-align-center justify-content-center without-header">
      <Head>
        <title>Auction - Registration</title>
      </Head>
      <div className="d-flex">
      <RegistrationForm />
        <AuthDescription content={REGISTRATION_DESCRIPTION} />
      </div>
    </div>
  );
};

export default Registration;