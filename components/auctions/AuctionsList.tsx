import React, { useMemo } from 'react';
// Components
import AuctionCard from '@Components/auctions/AuctionCard';
import { Skeleton } from 'antd';
// Store
import { useSelector } from 'react-redux';
// Types
import { AuctionsList } from '@Types/auctions';
import { RootState } from '@Types/other';
// Utils
import { isEqual } from 'lodash';
// Styles
import styles from '@styles/Auction.module.scss';

type Props = {
  auctions: AuctionsList;
};

const AuctionsListComponent: React.FC<Props> = ({ auctions }) => {
  const filterLoading = useSelector(
    (state: RootState) => state.auctions.filterLoading,
  );
  const storeAuctions = useSelector(
    (state: RootState) => state.auctions.auctions,
  );

  const currentAuctions = useMemo(() => {
    if (storeAuctions && !isEqual(storeAuctions, auctions)) {
      return storeAuctions;
    }

    return auctions;
  }, [auctions, storeAuctions]);

  return (
    <div className={styles.auctions__list}>
      {currentAuctions.map(auction =>
        filterLoading ? (
          <Skeleton.Node
            key={auction.id}
            active
            className={styles.auctions__list__skeleton}
          />
        ) : (
          <AuctionCard key={auction.id} auction={auction} />
        ),
      )}
    </div>
  );
};

export default AuctionsListComponent;
