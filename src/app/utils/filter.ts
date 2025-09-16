export const uniqArray = <T extends string>(array: Array<T>) => {
  const hash = {} as Record<T, boolean>;
  return array.filter((item) => {
    return hash[item] ? false : (hash[item] = true);
  });
};
export const handleChangeSearchFilter = (e: React.ChangeEvent<HTMLInputElement>, search) => {
  return [{ search }];
};

export const handleChangeDatePeriodFilter = (param: any) => {
  return [{ start_date: param.from, end_date: param.to }];
};
