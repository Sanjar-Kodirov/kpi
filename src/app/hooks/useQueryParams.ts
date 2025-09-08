import { useEffect, useState } from "react";

import { AdvancedFilterStore } from "#core/store/types/store";
import { Location } from "history";
import queryString from "query-string";
import { equals, isNil, mergeRight, pipe, reject } from "ramda";
import { useLocation } from "react-router-dom";

export type AnyParamsType = { [key: string]: any };
export const URL_SEPARATOR = "&separate=1&";
export const parseParams = (value: string, isAdditionalParams: boolean) => {
  const indx = isAdditionalParams ? 1 : 0;
  const data = value.split(URL_SEPARATOR)[indx];

  return queryString.parse(data);
};

export const updateQueryParams = pipe(
  (search: string, params: any) => mergeRight(queryString.parse(search), params),
  reject(isNil),
  queryString.stringify,
);

export const updatePathNew = (location: Location, qp: AnyParamsType, add: { [key: string]: any }) => {
  const requestParams = updateQueryParams("", qp);
  const additionalParams = updateQueryParams("", add);

  window.history.pushState(
    {},
    "",
    `${location.pathname}${requestParams ? "?" : ""}${requestParams}${
      additionalParams ? URL_SEPARATOR : ""
    }${additionalParams}`,
  );
};

export type useQueryParamsNewReturnType<T, A> = {
  queryParams: T;
  additionalParams: A;
  updateQueryParams: (params: T, additionalParams?: A) => void;
  clearQueryParams: () => void;
};
export type InitialValueType<T, A> = {
  queryParams: T;
  additionalParams?: A;
};

export type UpdateStoreType<T, A> = (params: AdvancedFilterStore<T, A>) => void;
export const useQueryParams = <T extends AnyParamsType, A extends AnyParamsType | undefined = undefined>(
  initialValue: InitialValueType<T, A>,
  storeState?: InitialValueType<T, A>,
  updateStore?: UpdateStoreType<T, A>,
  resetStore?: any,
): useQueryParamsNewReturnType<T, A> => {
  const location = useLocation();

  const [queryParams, setQueryParams] = useState<T>({
    ...initialValue.queryParams,
    ...storeState?.queryParams,
    ...parseParams(location.search, false),
  });

  // @ts-ignore
  const [additionalParams, setAdditionalQueryParams] = useState<A>({
    ...initialValue.additionalParams,
    ...storeState?.additionalParams,
    ...parseParams(location.search, true),
  });

  useEffect(() => {
    if (Object.keys(queryParams).length) {
      if (updateStore) {
        updateStore({
          queryParams,
          additionalParams,
        });
      }
    }
  }, []);

  useEffect(() => {
    const locationParams = parseParams(location.search, false) as T;

    if (!equals(queryParams, locationParams)) {
      updatePathNew(location, { ...queryParams }, { ...additionalParams });
    }
  }, [queryParams]);

  const updateQueryParams = (newParams: T, additionalParams?: A) => {
    setQueryParams((params) => ({ ...params, ...newParams }));
    setAdditionalQueryParams((params) => ({ ...params, ...additionalParams }));

    if (updateStore) {
      updateStore({
        queryParams: newParams,
        additionalParams: additionalParams ? additionalParams : ({} as A),
      });
    }
  };

  const clearQueryParams = () => {
    setQueryParams(initialValue.queryParams);
    if (initialValue.additionalParams) {
      setAdditionalQueryParams(initialValue.additionalParams);
    }

    if (resetStore) {
      resetStore();
    }
  };

  return {
    queryParams,
    additionalParams,
    updateQueryParams,
    clearQueryParams,
  };
};
