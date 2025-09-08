import { TCodeNameModel } from "#businessLogic/models/index";

export type TCreateBillParams = {
  orderId: number;
  amount: number;
};

export interface ICreateBillModel {
  id: string;
  status: TCodeNameModel;
  time: string;
  providerId: string;
  epsBillId: string;
  epsQrCode: string;
}

export interface IBillDetailsModel {
  code: string;
  name: string;
  clientPhoneNumber: string;
  message: string;
  time: string;
  epsBillId: string;
}
