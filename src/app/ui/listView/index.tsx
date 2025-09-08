import React, { FC, useState } from "react";

import { TablesListViewMainLineIcon, TablesListViewTypeThumbIcon } from "#svgIcons/halls";
import { ButtonUI } from "#ui/button";
import cn from "classnames";
import { useStyles } from "./styles";

type TListViewProps = {
  onClick: (activeTab: E_LIST_VIEW_TYPE) => void;
  viewTypes: E_LIST_VIEW_TYPE[];
  className?: string;
};

export enum E_LIST_VIEW_TYPE {
  GRID_LINES = "GRID_LINES",
  TABLE_VIEW = "TABLE_VIEW",
}

const obj = {
  [E_LIST_VIEW_TYPE.GRID_LINES]: {
    icon: <TablesListViewTypeThumbIcon />,
  },
  [E_LIST_VIEW_TYPE.TABLE_VIEW]: {
    icon: <TablesListViewMainLineIcon />,
  },
};

export const ListView: FC<TListViewProps> = ({ onClick, viewTypes }) => {
  const [activeTab, setActiveTab] = useState<E_LIST_VIEW_TYPE>(E_LIST_VIEW_TYPE.TABLE_VIEW);

  const classes = useStyles();

  const handleTab = (p: E_LIST_VIEW_TYPE) => {
    onClick(p);
    setActiveTab(p);
  };

  return (
    <div className={cn(classes.viewButtons)}>
      {viewTypes.map((type) => {
        return (
          <ButtonUI
            key={type}
            type="light"
            icon={obj[type].icon}
            onClick={() => handleTab(type)}
            className={cn(classes.viewButton, {
              [classes.viewButtonActive]: activeTab === type,
            })}
          />
        );
      })}
    </div>
  );
};
