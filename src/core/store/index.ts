import { create } from "zustand";

import { DoneReducerType, FailReducerType, GetReducerType, ReducerType } from "./types/reducer";
import { CreateAdvancedFilterStorePropTypes, CreateXHRStoreType, TCreateGlobalStore } from "./types/store";
import { useMemo } from "react";

const zeroReducerDefault: ReducerType = (state) => ({ ...state, loading: true });
const doneReducerDefault: DoneReducerType<any> = (state, response) => {
  return {
    ...state,
    fulfilled: true,
    loading: false,
    data: response.result.data,
    error: undefined,
  };
};
const doneSuccessReducerDefault: ReducerType = (state) => ({
  ...state,
  fulfilled: true,
  loading: false,
  success: true,
  error: undefined,
});

const failReducerDefault: FailReducerType = (state, error, initialState) => ({
  ...state,
  fulfilled: true,
  loading: false,
  error: error?.response && error?.response.data,
  data: initialState.data,
});

const getDoneReducer: GetReducerType = (initialState) => {
  return "data" in initialState ? doneReducerDefault : doneSuccessReducerDefault;
};

const globalResetsList: Array<() => void> = [];
export const globalReset = () => {
  globalResetsList.forEach((reset) => {
    reset();
  });
};

// Это функция для того, чтобы снаружи только могли регистрировать reset функцию и не поменять массив функций на прямую
export const registerGlobalReset = (resetFn: () => void) => {
  globalResetsList.push(resetFn);
};

export const createXHRStore: CreateXHRStoreType = (handler, initialState, reducers = {}, resets, debug) => {
  const zeroReducer = reducers.zeroReducer !== undefined ? reducers.zeroReducer : zeroReducerDefault;
  const doneReducer =
    reducers.doneReducer !== undefined ? reducers.doneReducer : getDoneReducer<typeof initialState>(initialState);
  const failReducer = reducers.failReducer !== undefined ? reducers.failReducer : failReducerDefault;

  const useStore = create(() => initialState);

  const reset = () => {
    useStore.setState(() => initialState);
  };

  type HandlerType = typeof handler;

  const request: HandlerType = async (params) => {
    const zeroRes = zeroReducer(useStore.getState(), params);
    useStore.setState(() => zeroRes);

    if (debug) {
      console.log("debug  ===> ", useStore.getState());
    }

    try {
      const response = await handler(params);

      const state = useStore.getState();

      if (response && doneReducer) {
        const result = doneReducer(state, {
          params,
          result: response,
        });
        useStore.setState(() => result);
      }

      return response;
    } catch (e) {
      if (failReducer) {
        const state = useStore.getState();
        const res = failReducer(state, e, initialState);
        useStore.setState(() => res);
      }

      // временно
      return e as ReturnType<typeof handler>;
    }
  };

  if (resets) {
    if (resets.length && Array.isArray(resets[0])) {
      resets.forEach((resetItem) => {
        resetItem.push(reset);
      });
    } else {
      (resets as Array<() => void>).push(reset);
    }
  }

  globalResetsList.push(reset);

  return {
    request: request,
    store: useStore,
    reset: reset,
  };
};

export const createAdvancedFilterStore: CreateAdvancedFilterStorePropTypes = (initialState, resets) => {
  const useStore = create(() => initialState);

  const reset = () => {
    useStore.setState(() => initialState);
  };

  type FilterParamsType = typeof initialState;
  const update = (params: FilterParamsType) => {
    useStore.setState(
      (state) =>
        ({
          queryParams: {
            ...state.queryParams,
            ...params.queryParams,
          },
          additionalParams: {
            ...state.additionalParams,
            ...params.additionalParams,
          },
        }) as FilterParamsType,
    );
  };

  if (resets) {
    resets.push(reset);
  }

  globalResetsList.push(reset);

  return {
    update,
    store: useStore,
    reset,
  };
};

export const createGlobalStore: TCreateGlobalStore = (initialState) => {
  const useStore = create(() => initialState);

  const reset = () => {
    useStore.setState(() => initialState);
  };

  type FilterParamsType = typeof initialState;
  const update = (params: Partial<FilterParamsType>) => {
    useStore.setState(
      (state) =>
        ({
          ...state,
          ...params,
        }) as FilterParamsType,
    );
  };

  registerGlobalReset(reset);

  return {
    update,
    store: useStore,
    reset,
  };
};

export const useCreateXHRLocalStore: CreateXHRStoreType = (handler, initialState, reducers = {}, resets) => {
  return useMemo(() => {
    return createXHRStore(handler, initialState, reducers, resets);
  }, []);
};
