import React from "react";
import { ROUTES } from "#constants/index";
import { ButtonUI } from "#ui/button";
import { InfoCardUI } from "#ui/infoCard";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useStyles } from "./styles";
import { $adminCompanyDetails } from "src/app/stores/admin/adminCompany";
import { useTranslation } from "react-i18next";

export const CompanyDetailsInfo = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { data: companyDetails } = $adminCompanyDetails.store();

  if (!companyDetails) {
    return null;
  }

  return (
    <div className={classes.card}>
      <div className={classes.infoCardsParent}>
        <InfoCardUI title={"Название компании"} value={companyDetails.name} />
        <InfoCardUI title={"Тип компании"} value={companyDetails.businessType?.name || "-"} />
        <InfoCardUI title={"Контакт"} value={`${companyDetails.owner?.name}`} />
        {/*<InfoCardUI title={"Адрес компании"} value={companyDetails.director?.name || "-"} />*/}
        {/*<InfoCardUI*/}
        {/*    title={"Дата изменения"}*/}
        {/*    value={companyDetails.lastModifiedDate ? moment(companyDetails.lastModifiedDate).format("YYYY-MM-DD") : "-"}*/}
        {/*/>*/}
        {/*<InfoCardUI title={"Способ оплаты"} value={companyDetails.paymentTypes?.join(", ") || "-"} />*/}
        {/*<InfoCardUI title={"ФИО менеджера"} value={getManagerFullName(companyDetails)} />*/}
        {/*<InfoCardUI title={"Номер телефона менеджера"} value={getManagerPhone(companyDetails)} />*/}
      </div>
      <div className={classes.infoCardsParent}>
        <InfoCardUI title={t("fields.tin")} value={companyDetails.tin || "-"} />
        <InfoCardUI title={"Сфера деятельности"} value={companyDetails.activityType?.name || "-"} />
        <InfoCardUI title={t("fields.phoneNumber")} value={companyDetails.phone} />
        {/*<InfoCardUI title={"НДС"} value={companyDetails. || "-"} />*/}
        {/*<InfoCardUI*/}
        {/*    title={"Дата посл. синхронизации"}*/}
        {/*    value={companyDetails.syncDate ? moment(companyDetails.syncDate).format("YYYY-MM-DD") : "-"}*/}
        {/*/>*/}
        {/*<InfoCardUI*/}
        {/*    title={"Пробный период"}*/}
        {/*    value={companyDetails.freeTrial ? getTrialDate(companyDetails.trialDate) : "Выключен"}*/}
        {/*/>*/}
        {/*<InfoCardUI title={"Оператор"} value={companyDetails.supportName ? companyDetails.supportName : "-"} />*/}
      </div>
      <ButtonUI onClick={() => navigate(`${ROUTES.MONITORING_COMPANIES}/edit/${companyDetails.id}`)}>
        <EditOutlined />
      </ButtonUI>
    </div>
  );
};
