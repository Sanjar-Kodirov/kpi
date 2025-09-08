import { XHRDataStoreType, XHRSuccessStoreType } from "../types/store";

import { ErrorResponseModel } from "#types/api";

export interface ResponseDataWithStatusCode<T> {
  data: T;
  statusCode: number;
}

export interface ResponseType<T = any> {
  result: {
    data: T;
    headers?: any;
    status: number;
    statusText: string;
  };
  params?: any;
}

// export type ResponseType<T = any> = AxiosResponse<T>

export interface PaginationListModel<T> {
  content: Array<T>;
  page: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export class XHRDataStoreState<D> implements XHRDataStoreType<D> {
  fulfilled: boolean;
  loading: boolean;
  data: D;
  error: ErrorResponseModel | undefined;
  phone: any;

  constructor(data: D) {
    this.fulfilled = false;
    this.loading = false;
    this.data = data;
    this.error = undefined;
  }
}

export class XHRSuccessStoreState implements XHRSuccessStoreType {
  fulfilled: boolean;
  loading: boolean;
  success: boolean;
  error: ErrorResponseModel | undefined;

  constructor(success = false) {
    this.fulfilled = false;
    this.loading = false;
    this.success = success;
    this.error = undefined;
  }
}
