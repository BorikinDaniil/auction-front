import { useCallback, useEffect } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
// Store
import { useDispatch } from 'react-redux';
import { setAuctionsList } from '@store/auctinSlice';
// Components
import { Button } from 'antd';
// API
import auctionsApi from '@api/auctions';
// Types
import { AuctionsList } from '@Types/auctions';

export const getServerSideProps: GetServerSideProps<{ auctions: AuctionsList }> = (async() => {
  let auctions = [];

  try {
    auctions = (await auctionsApi.getAuctions())?.data || [];
  } catch (e: any) {
    return {
      redirect: {
        destination: e.response?.status === 401 ? '/auth/login' : '/404',
        permanent: false,
      },
    };
  }

  return { props: { auctions } };
});

const Home = ({ auctions }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setAuctionsData = useCallback(() => {
    dispatch(setAuctionsList(auctions));
  }, [auctions, dispatch]);

  useEffect(() => {
    setAuctionsData();
  }, [setAuctionsData]);

  const createNew = useCallback(async() => {
    await router.push('/auctions/new');
  }, [router]);

  return (
    <div className="page">
      <div className="page__container">
        <h1>Auctions</h1>

        <Button type="primary" onClick={createNew}>Add New</Button>
      </div>
    </div>
  );
};

export default Home;
