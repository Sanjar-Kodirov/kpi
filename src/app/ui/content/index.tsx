import React, { ReactNode } from "react";

import { ArrowRightSvg } from "#src/assets/svg";
import { ErrorResponseModel } from "#types/api";
import { BackBtn } from "#ui/backBtn";
import { Spinner } from "#ui/spinner";
import { formatNumber } from "#utils/formatters";
import { Alert } from "antd";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import { useStyles } from "./styles";

type HtmlElementPropsType = {
  className?: string;
  children?: ReactNode;
};

export type TotalListItemType = {
  name: string;
  value: number;
  unit?: string;
};

type HeaderPropsType = {
  className?: string;
  title: string | string[] | ReactNode | ReactNode[];
  total?: number | TotalListItemType[];
  showBackBtn?: boolean;
  backPath?: string;
  onBackClick?: () => void;
  children?: ReactNode;
};

export const Header: React.FC<HeaderPropsType> = (props) => {
  const { className = "", title, total, backPath, onBackClick } = props;

  useStyles();
  const navigate = useNavigate();

  const getTitle = () => {
    if (title && Array.isArray(title)) {
      return title.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span className="s1">{item}</span>
            {index < title.length - 1 && (
              <span className="custom-content__header__separator">
                <ArrowRightSvg />
              </span>
            )}
          </React.Fragment>
        );
      });
    } else {
      return title;
    }
  };

  const getTotal = () => {
    if (total === undefined) return null;

    if (Array.isArray(total)) {
      return total.map((item, index) => {
        return (
          <div
            key={index}
            className={cn("custom-content__header__total", { "custom-content__header__totalWithBackPath": !!backPath })}
          >
            {item.name}: <strong>{formatNumber(item.value)}</strong> <span>{item.unit}</span>
          </div>
        );
      });
    } else {
      return (
        <div
          className={cn("custom-content__header__total", { "custom-content__header__totalWithBackPath": !!backPath })}
        >
          <strong>({formatNumber(total)})</strong>
        </div>
      );
    }
  };

  return (
    <div className={cn("custom-content__header", className)}>
      <div className="custom-content__header__title">
        {(backPath || onBackClick) && (
          <div className="custom-content__header__backBtn">
            <BackBtn navigate={navigate} backPath={backPath} onBackClick={onBackClick} />
          </div>
        )}
        <div className="custom-content__header__title-withTotal">
          {getTitle()}
          {getTotal()}
        </div>
      </div>
      <div className="custom-content__header__contentHeaderActions">{props.children}</div>
    </div>
  );
};

type MiddlePropsType = HtmlElementPropsType & { content?: boolean };

const Middle: React.FC<MiddlePropsType> = (props) => {
  const { className = "", content, children } = props;

  useStyles();

  let classesCompose = content
    ? "custom-content__middle-content content-block"
    : "custom-content__middle u-fancy-scrollbar";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={classesCompose}>
      {content ? (
        <div className={cn("custom-content__middle-content__inner", "u-fancy-scrollbar")}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

const TopNavigation: React.FC<HtmlElementPropsType> = (props) => {
  const { children } = props;

  return <div className="custom-content__navigation">{children}</div>;
};

type LoadingPropsType = {
  className?: string;
  show: boolean;
  size?: "small" | "large";
  fixed?: boolean;
};

const Loading: React.FC<LoadingPropsType> = (props) => {
  const { className, show, size, fixed } = props;

  if (show) {
    return (
      <div className={cn("abs-loader", className, { ["abs-loader-fixed"]: fixed })}>
        <Spinner size={size} />
      </div>
    );
  }

  return null;
};

type ErrorPropsType = {
  error?: ErrorResponseModel | string;
};

const Error: React.FC<ErrorPropsType> = (props) => {
  const { error } = props;
  useStyles();

  if (!error) return null;

  return (
    <Alert className="custom-content__error" message={typeof error === "string" ? error : error.detail} type="error" />
  );
};

const FilterRowExtra: React.FC<HtmlElementPropsType> = (props) => {
  return <div className="custom-content__filter-row__right">{props.children}</div>;
};

type FilterRowType = React.FC<HtmlElementPropsType> & {
  Extra: typeof FilterRowExtra;
};

const FilterRow: FilterRowType = (props) => {
  return <div className="custom-content__filter-row">{props.children}</div>;
};

FilterRow.Extra = FilterRowExtra;

const Table: React.FC<HtmlElementPropsType> = (props) => {
  return <div className="custom-content__table u-fancy-scrollbar">{props.children}</div>;
};

const StatsRowRight: React.FC<HtmlElementPropsType> = (props) => {
  return <div className="custom-content__stats-row__right">{props.children}</div>;
};

type StatsRowType = React.FC<HtmlElementPropsType> & {
  Right: typeof StatsRowRight;
};

const StatsRow: StatsRowType = (props) => {
  return <div className="custom-content__stats-row">{props.children}</div>;
};

StatsRow.Right = StatsRowRight;

type TStatItem = {
  label: string;
  value: string | number | ReactNode;
  unit?: string;
};
type TypeStatsProps = {
  stats: TStatItem[];
};

export const createStatItem = (label: string, value: string | number | ReactNode, unit?: string): TStatItem => ({
  label,
  value,
  unit,
});

const Stats: React.FC<TypeStatsProps> = (props) => {
  const { stats } = props;
  const classes = useStyles();
  return (
    <div className={classes.statsContainer}>
      {stats.map((item, index) => {
        return (
          <div key={index} className={classes.infoCard}>
            <div className={classes.infoCardLabel}>{item.label}:</div>
            <div className={classes.infoCardValueRow}>
              <div className={classes.infoCardValue}>{item.value}</div>
              {item.unit && <div className={classes.infoCardUnit}>{item.unit}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Footer: React.FC<HtmlElementPropsType> = (props) => {
  return <div className={`custom-content__footer`}>{props.children}</div>;
};

type ButtonsPropsType = HtmlElementPropsType & {
  align?: "right" | "center" | "space-between";
};

const Buttons: React.FC<ButtonsPropsType> = (props) => {
  const { children, align = "center" } = props;

  return <div className={`custom-content__buttons custom-content__buttons-${align}`}>{children}</div>;
};

const ContentOuterLeft: React.FC<HtmlElementPropsType> = (props) => {
  const { className = "" } = props;

  return <div className={cn("custom-content__outerLeft", className)}>{props.children}</div>;
};

const ContentOuterRight: React.FC<HtmlElementPropsType & { buttons?: ReactNode; loading?: boolean }> = (props) => {
  const { buttons, loading, className = "" } = props;

  return (
    <div
      className={cn("custom-content__outerRight", { "custom-content__outerRightWithButtons": !!buttons }, className)}
    >
      <div className="custom-content__outerRightInner">
        <div className={cn("custom-content__outerRightInnerScroll", "u-fancy-scrollbar")}>
          {props.children}
          {loading && (
            <div className="abs-loader">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      {!!buttons && <div className="custom-content__outerButtons">{buttons}</div>}
    </div>
  );
};

type TContentOuter = React.FC<HtmlElementPropsType> & {
  Left: typeof ContentOuterLeft;
  Right: typeof ContentOuterRight;
};

const ContentOuter: TContentOuter = (props) => {
  const { className = "" } = props;
  useStyles();

  return <div className={cn("custom-content__outer", className)}>{props.children}</div>;
};

ContentOuter.Left = ContentOuterLeft;
ContentOuter.Right = ContentOuterRight;

type TCardProps = {
  children?: ReactNode;
};
const Card = (props: TCardProps) => {
  useStyles();

  const { children } = props;

  return <div className="content-card">{children}</div>;
};

const CardRow = (props: TCardProps) => {
  useStyles();

  const { children } = props;

  return <div className="content-card-row">{children}</div>;
};

type ContentPropsType = HtmlElementPropsType & { fixed?: boolean; fullHeight?: boolean; destroy?: boolean };

type ContentUIType = React.FC<ContentPropsType> & {
  Header: typeof Header;
  Middle: typeof Middle;
  TopNavigation: typeof TopNavigation;

  Loading: typeof Loading;
  Error: typeof Error;
  FilterRow: typeof FilterRow;
  StatsRow: typeof StatsRow;
  Stats: typeof Stats;

  Table: typeof Table;
  Footer: typeof Footer;
  Buttons: typeof Buttons;

  ContentOuter: typeof ContentOuter;

  Card: typeof Card;
  CardRow: typeof CardRow;
};

const ContentUI: ContentUIType = (props) => {
  const { className = "", children, fixed, fullHeight, destroy } = props;

  useStyles();

  if (destroy) {
    return <>{children}</>;
  }

  let classesCompose = "custom-content";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={cn(classesCompose, { "custom-content-fixed": fixed, "custom-content-full-height": fullHeight })}>
      {children}
    </div>
  );
};

ContentUI.Header = Header;
ContentUI.Middle = Middle;
ContentUI.TopNavigation = TopNavigation;

ContentUI.Loading = Loading;
ContentUI.Error = Error;

ContentUI.FilterRow = FilterRow;
ContentUI.StatsRow = StatsRow;
ContentUI.Stats = Stats;

ContentUI.Table = Table;
ContentUI.Footer = Footer;
ContentUI.Buttons = Buttons;

ContentUI.Card = Card;
ContentUI.CardRow = CardRow;

ContentUI.ContentOuter = ContentOuter;

export { ContentUI };
