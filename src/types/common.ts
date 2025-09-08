export type FilterOnChangeType<T, A = undefined> = (queryParams: T, additionalParams?: A) => void;

export type TNamesAndCode<T = string> = {
  code: T;
  nameRu: string;
  nameUzCyrillic: string;
  nameUzLatin: string;
  selectable: boolean;
};

export enum E_GRANULARITY_TYPES {
  HOUR = "HOUR",
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export enum E_MOMENT_TYPES {
  HOUR = "hour",
  HOURS = "hours",
  DAY = "day",
  DAYS = "days",
  WEEK = "week",
  WEEKS = "weeks",
  MONTH = "month",
  MONTHS = "months",
}

export type TStringMap = {
  [key: string]: string;
};
