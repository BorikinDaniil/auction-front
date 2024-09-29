import type { NextPage } from 'next';
import Head from 'next/head';
// Components
import Subscription from '@Components/Subscription';
import { REGISTRATION_DESCRIPTION } from '@constants/content';
import RegistrationForm from './components/RegistrationForm';
import AuthDescription from './components/AuthDescription';
// Constants

const Registration: NextPage = () => (
  <div className="page d-flex flex-column flex-align-center justify-content-center">
    <Head>
      <title>Auction - Registration</title>
    </Head>
    <div className="d-flex justify-content-center w-100">
      <RegistrationForm />
      <AuthDescription content={REGISTRATION_DESCRIPTION} />
    </div>
    <Subscription />
  </div>
);

export default Registration;
