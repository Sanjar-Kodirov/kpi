import { HandlerType } from "#core/store/types/handler";
import {
  ITechCardDetailsModel,
  ITechCardsListItemModel,
  TTechCardsCreateParams,
  TTechCardsListParams,
  TTechCardsUpdateParams,
} from "#businessLogic/models/techCards";
import { PaginationListModel } from "#core/store/constructors";
import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { appType } from "#constants/index";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getTechCardsList: HandlerType<TTechCardsListParams, PaginationListModel<ITechCardsListItemModel>> = (
  params,
) =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/tech-cards`,
    params,
  });

export const getTechCardDetails: HandlerType<string, ITechCardDetailsModel> = (id) =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/tech-cards/${id}`,
  });

export const getTechCardDetailsByProduct: HandlerType<number, ITechCardDetailsModel[]> = (productId) =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/tech-cards/product/${productId}`,
  });

export const createTechCard: HandlerType<TTechCardsCreateParams, void> = (data) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/tech-cards`,
    data,
  });

export const updateTechCard: HandlerType<TTechCardsUpdateParams, void> = (data) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/tech-cards/${data.id}`,
    data,
  });

export const deleteTechCard: HandlerType<number, void> = (id) =>
  httpDelete({
    url: `/api/${apiTypePrefix}/v1/tech-cards/${id}`,
  });
