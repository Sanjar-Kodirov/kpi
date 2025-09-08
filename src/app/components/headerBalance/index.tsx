import React from "react";

import { UZS_CURRENCY } from "#constants/index";
import { WalletSvgIcon } from "#svgIcons/index";
import { formatPrice } from "#utils/formatters";

import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

export const HeaderBalance = () => {
  // const currentCompanyState = $currentCompany.store()
  const classes = useStyles();
  const { t } = useTranslation();

  //const organisationBalanceState = $organisationBalance.store()
  // const { data: organisationBalance, loading } = organisationBalanceState;
  //  const { data: currentCompanyData } = currentCompanyState;

  // useEffect(() => {
  //   if (currentCompanyData?.inn) {
  //     //$organisationBalance.request(currentCompanyData?.inn);
  //   }
  // }, [currentCompanyData?.inn]);

  return (
    <div className={classes.balanceWrapper}>
      {/*<ContentUI.Loading show={loading} size="small" />*/}
      <div className={classes.balanceIcon}>
        <WalletSvgIcon />
      </div>
      <div>
        <div className={classes.balanceLabel}>{t("fields.balance")}:</div>
        <div className={classes.balanceSum}>
          {formatPrice(0)} <span>{UZS_CURRENCY}</span>
        </div>
      </div>
    </div>
  );
};
