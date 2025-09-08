type TEntity = {
  id: number;
  name: string;
};

export type TCurrentStockUnit = {
  id: number;
  weight: number;
  price: number;
  unit: TEntity;
  techCard: TEntity;
};

export type TCurrentStockItem = {
  id: number;
  menuItem: TEntity;
  department: TEntity;
  qty: 0;
  soldQty: 0;
  unit: TEntity;
  units: TCurrentStockUnit[];
  recurring: boolean;
  transferPreviousQty: boolean;
};

export type TCurrentStockListParams = {
  branchId?: string;
  menuId?: number;
  departmentId?: number;
  search?: string;
  page?: number;
  size?: number;
};

export type TSetQuantityStock = {
  menuItemId: number;
  qty?: number;
  recurring?: boolean;
  transferPreviousQty?: boolean;
};

export type TUpdateStatusStock = {
  ids: string[];
  status: string;
};
