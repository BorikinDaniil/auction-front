import type { NextPage } from 'next';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

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
