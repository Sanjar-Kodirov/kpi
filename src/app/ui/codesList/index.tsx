import React, { FC } from "react";

import { namespaces } from "#src/localization/i18n.constants";
import { ClearIconSvg } from "#svgIcons/scan";
import { ButtonUI } from "#ui/button";
import { CollapseUI } from "#ui/collapse";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

import cn from "classnames";

type TCodeListProps = {
  markCodes: string[];
  markingsQty?: number;
  aggregationCodes: string[];
  onDeleteAggregation?: (code: string) => void;
  onDeleteMarking?: (code: string) => void;
  highlightedCode?: string;
};

const CodeList: FC<TCodeListProps> = ({
  markCodes,
  markingsQty,
  aggregationCodes,
  onDeleteAggregation,
  onDeleteMarking,
  highlightedCode,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.codesCont}>
        <div className={classes.blockTitle}>
          {t("fields.marks")} ({markingsQty || markCodes.length})
        </div>
        {markCodes.map((code, index) => (
          <div className={classes.codeCont} key={code}>
            <div className={classes.index}>{index + 1}).</div>
            <div className={cn(classes.code, code === highlightedCode && classes.highlightedCode)}>{code}</div>
            {onDeleteMarking && (
              <div onClick={() => onDeleteMarking(code)} className={classes.clearButton}>
                <ClearIconSvg />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.codesCont}>
        <div className={classes.blockTitle}>
          {t("fields.aggregations")} ({aggregationCodes.length})
        </div>
        {aggregationCodes.map((code, index) => (
          <div className={classes.codeCont} key={code}>
            <div className={classes.index}>{index + 1}).</div>
            <div className={cn(classes.code, code === highlightedCode && classes.highlightedCode)}>{code}</div>
            {onDeleteAggregation && (
              <div onClick={() => onDeleteAggregation(code)} className={classes.clearButton}>
                <ClearIconSvg />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

type TInvoiceCodesProps = {
  codes?: any;
  onClose: () => void;
  title: string;
};

const InvoiceCodes: FC<TInvoiceCodesProps> = ({ codes, onClose, title }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const codesList = codes ? codes : ([] as any[]);

  return (
    <div className={classes.cont}>
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <div className={classes.codesCont}>
          <div className={classes.blockTitle}>
            {t("fields.aggregationCodes")}({codesList.length})
          </div>
          <CollapseUI accordion bordered={false} className={classes.collapse}>
            {codesList.map((item, index: number) => (
              <>
                <div className={classes.codeCont} key={item.code}>
                  <div className={classes.index}>{index + 1}).</div>
                  <Tooltip title={item.errorMessage}>
                    <div className={item.errorMessage ? `${classes.code} ${classes.inValid}` : classes.code}>
                      {item.code}
                    </div>
                  </Tooltip>
                </div>
                {/* <Panel
                  collapsible={item.child ? "header" : "disabled"}
                  header={`${t("income.codesMark", { ns: namespaces.warehouse })} (${
                    item.child ? item.child.length : 0
                  })`}
                  key={item.code}
                >
                  {item.child &&
                    item.child.length &&
                    item.child.map((item: TInvoiceCodes, index: number) => (
                      <div className={classes.codeCont} key={item.code}>
                        <div className={classes.index}>{index + 1}).</div>
                        <Tooltip title={item.errorMessage}>
                          <div className={item.errorMessage ? `${classes.code} ${classes.inValid}` : classes.code}>
                            {item.code}
                          </div>
                        </Tooltip>
                      </div>
                    ))}
                </Panel> */}
              </>
            ))}
          </CollapseUI>
        </div>
        {!codesList.length && (
          <div className={classes.noData}>{t("register.product.empty", { ns: namespaces.warehouse })}</div>
        )}
      </div>
      <div className={classes.buttonCont}>
        <ButtonUI onClick={onClose}>{t("buttons.close")}</ButtonUI>
      </div>
    </div>
  );
};

type TCodeListUIProps = {
  markCodes?: string[];
  aggregationCodes?: string[];
  onClose: () => void;
  title: string;
  highlightedCode?: string;
};

type TCodeListUI = FC<TCodeListUIProps> & {
  ReadOnly: typeof CodeList;
  Invoice: typeof InvoiceCodes;
};

const CodeListUI: TCodeListUI = ({ markCodes, aggregationCodes, highlightedCode, onClose, title }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const markings = markCodes ? markCodes : [];

  const aggregations = aggregationCodes ? aggregationCodes : [];

  return (
    <div className={classes.cont}>
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <CodeList markCodes={markings} aggregationCodes={aggregations} highlightedCode={highlightedCode} />
        {!aggregations.length && !markings.length && (
          <div className={classes.noData}>{t("register.product.empty", { ns: namespaces.warehouse })}</div>
        )}
      </div>
      <div className={classes.buttonCont}>
        <ButtonUI onClick={onClose}>{t("buttons.close")}</ButtonUI>
      </div>
    </div>
  );
};

CodeListUI.ReadOnly = CodeList;
CodeListUI.Invoice = InvoiceCodes;

export { CodeListUI };
