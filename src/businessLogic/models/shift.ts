import { TCodeNameModel } from ".";

export interface IShiftModel {
  id: number;
  shiftNumber: string;
  startDate: string;
  status: TCodeNameModel;
}
