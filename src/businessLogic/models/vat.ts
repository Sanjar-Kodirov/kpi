export enum E_VAT_CODE {
  WITHOUT_VAT = "WITHOUT_VAT",
  VAT_0 = "VAT_0",
  VAT_12 = "VAT_12",
}

export interface IVatListType {
  name: string;
  code: E_VAT_CODE;
  amount: number;
}
