import { useCallback, useEffect } from 'react';
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { useRouter } from 'next/router';
// Store
import { useDispatch } from 'react-redux';
import { setAuctionsList } from '@store/auctinSlice';
import { setSubcategoriesList } from '@store/categoriesSlice';
// Components
import { Button } from 'antd';
import AuctionFilters from '@Components/auctions/AuctionFilters';
import AuctionsListComponent from '@Components/auctions/AuctionsList';
// API
import auctionsApi from '@api/auctions';
import categoriesApi from '@api/categories';
// Types
import { AuctionsFilter, AuctionsList } from '@Types/auctions';
import { CategoriesList } from '@Types/categories';
import { Pagination, TwoNumbersArray } from '@Types/common';
// Utils
import { getFilteredObj } from '@utils/common';
import PaginationComponent from '@Components/Pagination';
import { defaultPagination } from '@constants/entities';

type Props = {
  auctions: AuctionsList;
  limitPrices: TwoNumbersArray;
  subCategories: CategoriesList;
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext,
) => {
  let auctions = [] as AuctionsList;
  let subCategories = [] as CategoriesList;
  let limitPrices = [0, 0] as TwoNumbersArray;
  let pagination = defaultPagination;
  const filter = getFilteredObj(ctx.query) as AuctionsFilter;

  try {
    const [auctionsData, categoriesData] = await Promise.all([
      auctionsApi.getAuctions(filter),
      categoriesApi.getSubCategories(),
    ]);

    auctions = auctionsData?.data?.auctionsData?.auctions || [];
    pagination =
      auctionsData?.data?.auctionsData?.pagination || defaultPagination;
    limitPrices = auctionsData?.data?.limitPrices || [];
    subCategories = categoriesData?.data || [];
    /* eslint-disable-next-line */
  } catch (e: any) {
    if (e.response?.status === 401) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
  }

  return { props: { auctions, limitPrices, subCategories, pagination } };
};

const Home = ({
  auctions,
  limitPrices,
  subCategories,
  pagination,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setAuctionsData = useCallback(() => {
    dispatch(setAuctionsList({ auctions, pagination }));
    dispatch(setSubcategoriesList(subCategories));
  }, [subCategories, auctions, pagination, dispatch]);

  useEffect(() => {
    setAuctionsData();
  }, [setAuctionsData]);

  const createNew = useCallback(async () => {
    await router.push('/auctions/new');
  }, [router]);

  return (
    <div className='page'>
      <div className='page__container'>
        <h1>Auctions</h1>
        <Button className='mb-24' type='primary' onClick={createNew}>
          Add New
        </Button>
        <AuctionFilters
          subCategories={subCategories}
          limitPrices={limitPrices}
        />
        <AuctionsListComponent auctions={auctions} />
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Home;
