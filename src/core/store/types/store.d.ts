import { StoreApi, UseBoundStore } from "zustand";

import { ErrorResponseModel } from "#types/api";

import { HandlerType } from "./handler";
import { ReducersCollectionType } from "./reducer";

export interface XHRDataStoreType<T> {
  fulfilled?: boolean;
  loading: boolean;
  data: T;
  error?: ErrorResponseModel;
}

export interface XHRSuccessStoreType {
  fulfilled?: boolean;
  loading: boolean;
  success: boolean;
  error: any;
}

export interface CreateStoreReturnType<E, S> {
  // effect: (params: P) => Promise<AxiosResponse<E>> | undefined;
  request: E;
  store: UseBoundStore<StoreApi<S>>;
  reset: () => void;
}

export type CreateXHRStoreType = <P, R, S>(
  handler: HandlerType<P, R>,
  initialState: S,
  reducers?: ReducersCollectionType<R, S>,
  resets?: Array<() => void> | Array<Array<() => void>>,
  debug?: boolean,
) => CreateStoreReturnType<typeof handler, S>;

export interface AdvancedFilterStore<P, A> {
  queryParams: P;
  additionalParams?: A;
}

export type CreateAdvancedFilterStorePropTypes = <P, A = undefined>(
  initialState: AdvancedFilterStore<P, A>,
  resets?: Array<() => void>,
) => {
  update: (params: AdvancedFilterStore<P, A>) => void;
  store: UseBoundStore<StoreApi<AdvancedFilterStore<P, A>>>;
  reset: () => void;
};

export type TCreateGlobalStore = <StateType>(initialState: StateType) => {
  update: (params: StateType) => void;
  store: UseBoundStore<StoreApi<StateType>>;
  reset: () => void;
};
