import React, { FC, ForwardedRef, Ref } from "react";

import { namespaces } from "#src/localization/i18n.constants";
import { formatNumber, formatPrice } from "#utils/formatters";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

type PropTypes = {
  xReport?: boolean;
  // report: ZReportListItemModel;
  report: any;
  ref?: Ref<HTMLDivElement>;
};

export const formatDateWithTime = (date?: string) => moment(date).format("DD-MM-YYYY/HH:mm:ss");

export const ZReportTemplate: FC<PropTypes> = React.forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  const { report, xReport } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  if (!report) {
    return null;
  }

  return (
    <div className={classes.reportOuter}>
      <div className={classes.reportWrapper} ref={ref}>
        <div className={classes.report}>
          <div className={classes.company}>
            <strong>{report.companyName}</strong>
            <div>{report.branchName}</div>
            <div>{report.branchAddress}</div>
          </div>

          <div className={classes.row}>
            <span>{t("fields.date")}:</span>
            <span>{formatDateWithTime()}</span>
          </div>
          <div className={classes.row}>
            <span>{t("zReportTemplate.registrationDate", { ns: namespaces.fiscalReports })}:</span>
            <span>{formatDateWithTime(report.companyDateTime)}</span>
          </div>
          <div className={classes.row}>
            <span>{t("fields.tin")}:</span>
            <span>{report.companyINN}</span>
          </div>
          <div className={classes.row}>
            <span>{t("receiptTemplate.kkmNumber", { ns: namespaces.company })}:</span>
            <span>{report.terminalSN}</span>
          </div>
          {/*<div className={classes.row}>*/}
          {/*  <span>Смена:</span>*/}
          {/*  <span>{report.fiscalNumber}</span>*/}
          {/*</div>*/}

          <div className={classes.divider} />
          <div className={classes.row}>
            <span>{t("fields.shift")}:</span>
            <span>{report.fiscalNumber}</span>
          </div>
          <div className={classes.row}>
            <span>{t("fields.cashier")}:</span>
            <span>{report.userName}</span>
          </div>
          <div className={classes.row}>
            <span>{t("zReport.shiftOpeningDate", { ns: namespaces.fiscalReports })}:</span>
            <span>{formatDateWithTime(report.startDateTime)}</span>
          </div>
          {!xReport && (
            <div className={classes.row}>
              <span>{t("zReport.shiftClosingDate", { ns: namespaces.fiscalReports })}:</span>
              <span>{formatDateWithTime(report.endDateTime)}</span>
            </div>
          )}

          <div className={classes.midHead}>
            {xReport ? (
              <>
                {t("zReport.reportStateKkmWithout", { ns: namespaces.fiscalReports })}
                {report.fiscalNumber}
              </>
            ) : (
              <>
                {t("zReport.reportStateKkm", { ns: namespaces.fiscalReports })}
                {report.fiscalNumber}
              </>
            )}
          </div>

          <div className={classes.rowHead}>
            <span>{t("fields.sale")}:</span>
            <span>{formatPrice(report.totalCash + report.totalCard, true)}</span>
          </div>
          <div className={classes.rowInner}>
            <div className={classes.row}>
              <span>{t("receiptTemplate.cash", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.totalCash, true)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("receiptTemplate.card", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.totalCard, true)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("zReport.vatSales", { ns: namespaces.fiscalReports })}:</span>
              <span>{formatPrice(report.nds, true)}</span>
            </div>
          </div>

          <div className={classes.rowHead}>
            <span>{t("zReport.return", { ns: namespaces.fiscalReports })}:</span>
            <span>{formatPrice(report.totalCashReturned + report.totalCardReturned, true)}</span>
          </div>
          <div className={classes.rowInner}>
            <div className={classes.row}>
              <span>{t("receiptTemplate.cash", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.totalCashReturned, true)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("receiptTemplate.card", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.totalCardReturned, true)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("zReport.vatRefund", { ns: namespaces.fiscalReports })}:</span>
              <span>{formatPrice(report.ndsReturned, true)}</span>
            </div>
          </div>
          <div className={classes.divider} />

          <div className={classes.rowHead}>
            <span>{t("zReport.numberChecks", { ns: namespaces.fiscalReports })}:</span>
          </div>
          <div className={classes.rowInner}>
            <div className={classes.row}>
              <span>{t("fields.sale")}:</span>
              <span>{formatNumber(report.receipts)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("fields.return")}:</span>
              <span>{formatNumber(report.receiptsReturned)}</span>
            </div>
          </div>
          <div className={classes.rowHead}>
            <span>{t("fields.totalVatAmount")}:</span>
            <span>{formatPrice(report.nds - report.ndsReturned, true)}</span>
          </div>

          <div className={classes.divider} />

          <div className={classes.rowHead}>
            <span>{t("fields.total")}:</span>
            <span>
              {report.statistics ? formatPrice(report.statistics.totalCash + report.statistics.totalCard, true) : 0}
            </span>
          </div>
          <div className={classes.rowInner}>
            <div className={classes.row}>
              <span>{t("receiptTemplate.cash", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.statistics?.totalCash, true)}</span>
            </div>
            <div className={classes.row}>
              <span>{t("receiptTemplate.card", { ns: namespaces.company })}:</span>
              <span>{formatPrice(report.statistics?.totalCard, true)}</span>
            </div>
          </div>

          <div className={classes.divider} />

          <div className={classes.row}>
            <span>{t("fields.fm")}:</span>
            <span>{report.fmNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
