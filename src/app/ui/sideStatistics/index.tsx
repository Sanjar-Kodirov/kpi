import React, { ReactNode } from "react";

import { ContentUI } from "#ui/content";
import cn from "classnames";

import { useStyles } from "./styles";

type PropsTypes = {
  className?: string;
  children: ReactNode;
  loading?: boolean;
};

const SideStatisticsUI = (props: PropsTypes) => {
  const { className = "", children, loading } = props;

  useStyles();

  return (
    <div className={cn("sideStatistics", className)}>
      {children}

      <ContentUI.Loading show={!!loading} />
    </div>
  );
};

type SideStatisticsType = {
  children?: ReactNode;
};

const SideStatisticsBlock: React.FC<SideStatisticsType> = ({ children }) => (
  <div className="sideStatistics__block">{children}</div>
);

const SideStatisticsRow: React.FC<SideStatisticsType> = ({ children }) => (
  <div className="sideStatistics__row">{children}</div>
);

const SideStatisticsRowName: React.FC<SideStatisticsType> = ({ children }) => (
  <div className="sideStatistics__rowName">{children}</div>
);

const SideStatisticsRowValue: React.FC<SideStatisticsType> = ({ children }) => (
  <div className="sideStatistics__rowValue">{children}</div>
);

SideStatisticsUI.Block = SideStatisticsBlock;
SideStatisticsUI.Row = SideStatisticsRow;
SideStatisticsUI.RowName = SideStatisticsRowName;
SideStatisticsUI.RowValue = SideStatisticsRowValue;

export { SideStatisticsUI };
