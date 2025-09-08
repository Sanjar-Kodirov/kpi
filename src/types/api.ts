export interface ResponseDataWithStatusCode<T> {
  data: T;
  statusCode?: number;
}

export interface ErrorResponseModel {
  customStatus?: any;
  detail: string;
  errorFields?: any;
  path: string;
  status: number;
  message: string;
  timestamp: string;
  title?: string;
  url?: string;
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
