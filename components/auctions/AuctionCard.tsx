import React from 'react';
// Types
import { AuctionData } from '@Types/auctions';
// Components
import Image from 'next/image';
// Styles
import styles from '@styles/Auction.module.scss';

type props = {
  auction: AuctionData;
}

const AuctionCard: React.FC<props> = ({ auction }) => {
  const imageSRC = `${process.env.NEXT_PUBLIC_BE_URL}${auction.image}`;

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <Image alt="example" src={imageSRC} width="100%" height="100%" />
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__body__name}>
          {auction.productName}
        </div>
        <div className={styles.card__body__main}>
          <div className="d-flex flex-align-center">
            <div className={styles.card__body__main__price}>
              ${auction.startPrice}
            </div>
            <div className={styles.card__body__main__bids}>
              3 bids
            </div>
          </div>
          <div className="d-flex flex-align-center">
            <div className={styles.card__body__main__owner}>
              ({auction.owner && auction.owner.profile.username || ''})
            </div>
            <div className={styles.card__body__main__step}>
              st.${auction.step}
            </div>
          </div>
        </div>
        <div className={styles.card__body__time}>
          Time left 4d 20h (Sat, 02:39 PM)
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;