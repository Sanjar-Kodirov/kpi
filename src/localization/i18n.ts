import i18next, { i18n as i18nInstance } from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { ELanguages, namespaces } from "./i18n.constants";
import ruAuth from "./locales/ru/auth.json";
import ruBilling from "./locales/ru/billing.json";
import ruCatalog from "./locales/ru/catalog.json";
import ruCommon from "./locales/ru/common.json";
import ruCompany from "./locales/ru/company.json";
import ruEDocuments from "./locales/ru/eDocuments.json";
import ruFiscalReports from "./locales/ru/fiscalReports.json";
import ruHome from "./locales/ru/home.json";
import ruReports from "./locales/ru/reports.json";
import ruSettings from "./locales/ru/settings.json";
import ruWarehouse from "./locales/ru/warehouse.json";
import ruClients from "./locales/ru/clients.json";
import ruSeatings from "./locales/ru/seatings.json";
import ruHalls from "./locales/ru/halls.json";
import ruCurrentStock from "./locales/ru/currentStock.json";
import ruOrders from "./locales/ru/orders.json";

import uzAuth from "./locales/uz/auth.json";
import uzBilling from "./locales/uz/billing.json";
import uzCatalog from "./locales/uz/catalog.json";
import uzCommon from "./locales/uz/common.json";
import uzCompany from "./locales/uz/company.json";
import uzEDocuments from "./locales/uz/eDocuments.json";
import uzFiscalReports from "./locales/uz/fiscalReports.json";
import uzHome from "./locales/uz/home.json";
import uzReports from "./locales/uz/reports.json";
import uzSettings from "./locales/uz/settings.json";
import uzWarehouse from "./locales/uz/warehouse.json";
import uzClients from "./locales/uz/clients.json";
import uzSeatings from "./locales/uz/seatings.json";
import uzHalls from "./locales/uz/halls.json";
import uzCurrentStock from "./locales/uz/currentStock.json";
import uzOrders from "./locales/uz/orders.json";

export const defaultNS = namespaces.common;

type TResources = {
  ru: {
    [namespaces.common]: typeof ruCommon;
    [namespaces.company]: typeof ruCompany;
    [namespaces.catalog]: typeof ruCatalog;
    [namespaces.eDocuments]: typeof ruEDocuments;
    [namespaces.warehouse]: typeof ruWarehouse;
    [namespaces.reports]: typeof ruReports;
    [namespaces.settings]: typeof ruSettings;
    [namespaces.home]: typeof ruHome;
    [namespaces.fiscalReports]: typeof ruFiscalReports;
    [namespaces.billing]: typeof ruBilling;
    [namespaces.auth]: typeof ruAuth;
    [namespaces.clients]: typeof ruClients;
    [namespaces.seatings]: typeof ruSeatings;
    [namespaces.halls]: typeof ruHalls;
    [namespaces.currentStock]: typeof ruCurrentStock;
    [namespaces.orders]: typeof ruOrders;
  };
  uz: {
    [namespaces.common]: typeof uzCommon;
    [namespaces.company]: typeof uzCompany;
    [namespaces.catalog]: typeof uzCatalog;
    [namespaces.eDocuments]: typeof uzEDocuments;
    [namespaces.warehouse]: typeof uzWarehouse;
    [namespaces.reports]: typeof uzReports;
    [namespaces.settings]: typeof uzSettings;
    [namespaces.home]: typeof uzHome;
    [namespaces.fiscalReports]: typeof uzFiscalReports;
    [namespaces.billing]: typeof uzBilling;
    [namespaces.auth]: typeof uzAuth;
    [namespaces.clients]: typeof uzClients;
    [namespaces.seatings]: typeof uzSeatings;
    [namespaces.halls]: typeof uzHalls;
    [namespaces.currentStock]: typeof uzCurrentStock;
    [namespaces.orders]: typeof uzOrders;
  };
};
export const resources: TResources = {
  ru: {
    [namespaces.common]: ruCommon,
    [namespaces.company]: ruCompany,
    [namespaces.catalog]: ruCatalog,
    [namespaces.eDocuments]: ruEDocuments,
    [namespaces.warehouse]: ruWarehouse,
    [namespaces.reports]: ruReports,
    [namespaces.settings]: ruSettings,
    [namespaces.home]: ruHome,
    [namespaces.fiscalReports]: ruFiscalReports,
    [namespaces.billing]: ruBilling,
    [namespaces.auth]: ruAuth,
    [namespaces.clients]: ruClients,
    [namespaces.seatings]: ruSeatings,
    [namespaces.halls]: ruHalls,
    [namespaces.currentStock]: ruCurrentStock,
    [namespaces.orders]: ruOrders,
  },
  uz: {
    [namespaces.common]: uzCommon,
    [namespaces.company]: uzCompany,
    [namespaces.catalog]: uzCatalog,
    [namespaces.eDocuments]: uzEDocuments,
    [namespaces.warehouse]: uzWarehouse,
    [namespaces.reports]: uzReports,
    [namespaces.settings]: uzSettings,
    [namespaces.home]: uzHome,
    [namespaces.fiscalReports]: uzFiscalReports,
    [namespaces.billing]: uzBilling,
    [namespaces.auth]: uzAuth,
    [namespaces.clients]: uzClients,
    [namespaces.seatings]: uzSeatings,
    [namespaces.halls]: uzHalls,
    [namespaces.currentStock]: uzCurrentStock,
    [namespaces.orders]: uzOrders,
  },
};

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n.use(detector).init({
    lng: language,
    fallbackLng: language,
    ns: namespaces.common,
    defaultNS,
    resources,
  });

  return i18n;
};

export const i18n = createI18n(localStorage.getItem("i18nextLng") || ELanguages.RU);
