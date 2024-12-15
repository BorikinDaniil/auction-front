import { useRouter } from 'next/router';
import { clone, isEqual } from 'lodash';
import { getFilteredObj, transformValuesToString } from '@utils/common';
import { RouterQuery } from '@Types/common';

type GetQueryOptions = {
  arrays: string[];
};

const useRouterUtils = () => {
  const router = useRouter();

  const getQuery = (options: GetQueryOptions = { arrays: [] }) => {
    const query = clone(router.query);

    options.arrays.forEach(key => {
      const value = query[key];

      if (!value || !Array.isArray(value)) {
        query[key] = value ? [value] : [];
      }
    });

    return query;
  };

  const setQuery = async (
    queries: RouterQuery = {},
    options = { isSaveOld: false },
  ): Promise<void> => {
    const params = { query: {} };

    if (options.isSaveOld) {
      params.query = getQuery();
    }

    const filteredQuery = getFilteredObj(queries) as RouterQuery;

    Object.assign(params.query, transformValuesToString(filteredQuery));

    if (!isEqual(params.query, getQuery())) {
      try {
        await router.push(params, undefined, { shallow: true });
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.resolve();
  };

  return {
    setQuery,
    getQuery,
  };
};

export default useRouterUtils;
