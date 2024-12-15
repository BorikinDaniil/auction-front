import React, { useEffect, useMemo, useState } from 'react';
// Components
import AInput from '@Components/controls/AInput';
import ASelect from '@Components/controls/ASetect';
// Types
import { AuctionsFilter } from '@Types/auctions';
import { SubCategories, SubCategory } from '@Types/categories';
import { DateValue, SelectOptions } from '@Types/form';
// API
import auctionsApi from '@api/auctions';
// Store
import { setAuctionFilterLoading, setAuctionsList } from '@store/auctinSlice';
import { useDispatch } from 'react-redux';
// Utils
import { getFilteredObj } from '@utils/common';
import useRouterUtils from '@utils/hooks/useRouterUtils';
import { debounce, isEqual } from 'lodash';
// Styles
import styles from '@styles/Auction.module.scss';
import ARangePicker from '@Components/controls/ARangePicker';
import { formatToDate, formatToTimeStamp } from '@utils/date';
import { Slider } from 'antd';
import { TwoNumbersArray } from '@Types/common';
import { defaultAuctionsData } from '@constants/entities';

type DateProp = 'startAt' | 'endAt';

type Props = {
  subCategories: SubCategories;
  limitPrices: TwoNumbersArray;
};

const statuses = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Awaiting',
    value: '1',
  },
  {
    label: 'Started',
    value: '2',
  },
  {
    label: 'Finished',
    value: '3',
  },
];

const getDefaultFilter = ([minPrice, maxPrice]: TwoNumbersArray) => ({
  productName: '',
  subCategories: [],
  status: '',
  startAtFrom: '',
  startAtTo: '',
  endAtFrom: '',
  endAtTo: '',
  priceFrom: +minPrice,
  priceTo: +maxPrice,
});

const AuctionFilters: React.FC<Props> = props => {
  let defaultFilter = getDefaultFilter(props.limitPrices);

  const [filter, setFilter] = useState<AuctionsFilter>({ ...defaultFilter });
  const dispatch = useDispatch();
  const { setQuery, getQuery } = useRouterUtils();

  useEffect(() => {
    const {
      productName,
      subCategories,
      status,
      startAtFrom,
      startAtTo,
      endAtFrom,
      endAtTo,
      priceFrom,
      priceTo,
    } = getQuery({ arrays: ['subCategories'] });

    const filterQuery = {
      productName:
        (typeof productName === 'string' && productName) ||
        defaultFilter.productName,
      subCategories:
        (Array.isArray(subCategories) && subCategories) ||
        defaultFilter.subCategories,
      status: (typeof status === 'string' && status) || defaultFilter.status,
      startAtFrom:
        (typeof startAtFrom === 'string' && startAtFrom) ||
        defaultFilter.startAtFrom,
      startAtTo:
        (typeof startAtTo === 'string' && startAtTo) || defaultFilter.startAtTo,
      endAtFrom:
        (typeof endAtFrom === 'string' && endAtFrom) || defaultFilter.endAtFrom,
      endAtTo:
        (typeof endAtTo === 'string' && endAtTo) || defaultFilter.endAtTo,
      priceFrom: Number(priceFrom) || defaultFilter.priceFrom,
      priceTo: Number(priceTo) || defaultFilter.priceTo,
    };

    setFilter(filter => ({
      ...filter,
      ...filterQuery,
    }));
  }, []);

  const { subCategories } = props;

  const resetFilter = () =>
    setFilter(() => {
      debouncedFilter(defaultFilter);

      return defaultFilter;
    });

  const debouncedFilter = React.useRef(
    debounce(async (updatedFilter: AuctionsFilter) => {
      dispatch(setAuctionFilterLoading(true));
      const filteredQuery = getFilteredObj({
        ...getQuery(),
        ...updatedFilter,
        page: 1,
      }) as AuctionsFilter;

      try {
        const [auctionsData] = await Promise.all([
          auctionsApi.getAuctions(filteredQuery),
          setQuery(filteredQuery),
        ]);

        dispatch(
          setAuctionsList(
            auctionsData?.data?.auctionsData || defaultAuctionsData,
          ),
        );
        defaultFilter = getDefaultFilter(
          auctionsData?.data?.limitPrices || [0, 0],
        );
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(setAuctionFilterLoading(false));
      }
    }, 800),
  ).current;

  const changeFilterState = (value: string | object, prop: string) => {
    setFilter(filter => {
      const updatedFilter = {
        ...filter,
        [`${prop}`]: value,
      };
      debouncedFilter(updatedFilter);

      return updatedFilter;
    });
  };

  const filterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    changeFilterState(value, name);
  };

  const handleSubCategoriesChanged = (value: string[]) => {
    changeFilterState(value, 'subCategories');
  };

  const handleStatusChanged = (value: string) => {
    changeFilterState(value, 'status');
  };

  const changeDate = (value: DateValue[] | null, prop: DateProp) => {
    let from: DateValue = null;
    let to: DateValue = null;

    if (value) {
      [from, to] = value;
    }

    setFilter(filter => {
      const updatedFilter = {
        ...filter,
        [`${prop}From`]: formatToTimeStamp(from),
        [`${prop}To`]: formatToTimeStamp(to),
      };
      debouncedFilter(updatedFilter);

      return updatedFilter;
    });
  };

  const subCategoriesOptions = useMemo((): SelectOptions => {
    return subCategories.map((category: SubCategory) => ({
      label: category.name,
      value: `${category.id}`,
    }));
  }, [subCategories]);

  const onChangePrice = (val: number[]) => {
    const [from, to] = val;

    setFilter(filter => {
      const updatedFilter = {
        ...filter,
        priceFrom: from,
        priceTo: to,
      };
      debouncedFilter(updatedFilter);

      return updatedFilter;
    });
  };

  const onChange = (val: number[]) => {
    const [from, to] = val;

    setFilter(filter => ({
      ...filter,
      priceFrom: from,
      priceTo: to,
    }));
  };

  const isResetVisible = useMemo(
    () => !isEqual(filter, defaultFilter),
    [filter, defaultFilter],
  );

  return (
    <div className={styles.filter}>
      <AInput
        value={filter.productName}
        placeholder='Product name'
        className={styles.filter__item}
        type='text'
        name='productName'
        onInput={filterChanged}
      />

      <ASelect
        mode='multiple'
        value={filter.subCategories}
        className={styles.filter__item}
        filterOption={(input, option) =>
          ((option?.label ?? '') as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        placeholder='Please select'
        onChange={handleSubCategoriesChanged}
        options={subCategoriesOptions}
      />

      <ASelect
        value={filter.status}
        className={styles.filter__item}
        filterOption={(input, option) =>
          ((option?.label ?? '') as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        placeholder='Please select'
        onChange={handleStatusChanged}
        options={statuses}
      />

      <ARangePicker
        value={[
          formatToDate(filter.startAtFrom),
          formatToDate(filter.startAtTo),
        ]}
        showTime={{ format: 'HH:mm' }}
        className={styles.filter__item}
        format='YYYY-MM-DD HH:mm'
        onChange={val => changeDate(val, 'startAt')}
      />

      <ARangePicker
        value={[formatToDate(filter.endAtFrom), formatToDate(filter.endAtTo)]}
        showTime={{ format: 'HH:mm' }}
        className={styles.filter__item}
        format='YYYY-MM-DD HH:mm'
        onChange={val => changeDate(val, 'endAt')}
      />

      <div className={styles.filter__item}>
        <Slider
          range
          step={1}
          value={[filter.priceFrom, filter.priceTo]}
          min={defaultFilter.priceFrom}
          max={defaultFilter.priceTo}
          onChange={onChange}
          onChangeComplete={onChangePrice}
        />
      </div>

      {isResetVisible && (
        <div className={styles.filter__reset} onClick={resetFilter}>
          Reset
        </div>
      )}
    </div>
  );
};

export default AuctionFilters;
