import React, { useMemo } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useRouterUtils from '@utils/hooks/useRouterUtils';
import { setAuctionFilterLoading, setAuctionsList } from '@store/auctinSlice';
import { getFilteredObj } from '@utils/common';
import { AuctionsFilter } from '@Types/auctions';
import auctionsApi from '@api/auctions';
import { defaultAuctionsData } from '@constants/entities';
import { RootState } from '@Types/other';

const PaginationComponent: React.FC = () => {
  const pagination = useSelector(
    (state: RootState) => state.auctions.pagination,
  );

  const dispatch = useDispatch();
  const { setQuery, getQuery } = useRouterUtils();

  const onPaginationChanged = async (page: number, pageSize: number) => {
    dispatch(setAuctionFilterLoading(true));
    const filteredQuery = getFilteredObj({
      ...getQuery(),
      page,
      pageSize,
    }) as AuctionsFilter;

    try {
      const [auctionsData] = await Promise.all([
        auctionsApi.getAuctions({
          ...filteredQuery,
        }),
        setQuery(filteredQuery),
      ]);

      dispatch(
        setAuctionsList(
          auctionsData?.data?.auctionsData || defaultAuctionsData,
        ),
      );
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setAuctionFilterLoading(false));
    }
  };

  const pages = useMemo(
    () => pagination.total / pagination.pageSize,
    [pagination],
  );

  return (
    <>
      {pages > 1 ? (
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onChange={onPaginationChanged}
        />
      ) : null}
    </>
  );
};

export default PaginationComponent;
