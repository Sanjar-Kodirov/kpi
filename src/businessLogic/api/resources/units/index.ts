import { HandlerType } from "#core/store/types/handler";
import { IUnitsModel } from "#businessLogic/models/units";
import { httpGet } from "#core/httpClient";

export const getUnits: HandlerType<void, IUnitsModel[]> = () =>
  httpGet({
    url: "/api/public/v1/units/items",
  });
