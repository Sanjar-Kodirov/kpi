import { ResponseType } from "../constructors";

import { AdvancedFilterStore } from "./store";

export interface ReducersCollectionType<R, S> {
  zeroReducer?: ReducerType;
  doneReducer?: DoneReducerType<R, S>;
  failReducer?: FailReducerType;
}

export type ReducerType = (state: any, params: any) => any;
export type DoneReducerType<R, S = any> = (state: S, response: ResponseType<R>) => S;
export type FailReducerType = <S>(state: any, error: any, initialState: any) => any;
export type GetReducerType = <S>(state: any) => DoneReducerType<any> | ReducerType;

export type AdvancedFilterHandlerType<P, A> = (
  prevStore: AdvancedFilterStore<P, A>,
  props: AdvancedFilterStore<P, A>,
) => AdvancedFilterStore<P, A>;
