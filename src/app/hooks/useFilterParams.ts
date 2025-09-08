import { useCallback, useState } from "react";

export type TUseFilterParams<P, A> = {
  queryParams: P;
  additionalParams?: A;
};
export const useFilterParams = <Q extends Record<string, unknown>, A extends Record<string, unknown> | undefined>(
  defaultParams: TUseFilterParams<Q, A>,
) => {
  const [queryParams, setQueryParams] = useState<Q>(defaultParams.queryParams);
  const [additionalParams, setAdditionalParams] = useState<A | undefined>(defaultParams.additionalParams);

  const updateFilterParams = useCallback((params: TUseFilterParams<Q, A>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...params.queryParams,
    }));
    setAdditionalParams(
      (prev) =>
        ({
          ...prev,
          ...params.additionalParams,
        }) as A,
    );
  }, []);

  const resetFilterParams = useCallback(() => {
    setQueryParams(defaultParams.queryParams);
    setAdditionalParams(defaultParams.additionalParams);
  }, [defaultParams]);

  return {
    queryParams,
    updateFilterParams,
    resetFilterParams,
    defaultParams,
    additionalParams,
  };
};
