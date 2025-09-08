import React, { FC } from "react";
import { useStyles } from "./styles";
import cn from "classnames";

type TypeProps = {
  title: string;
  value: string | number | JSX.Element;
};
export const InfoCardUI: React.FC<TypeProps> = (props) => {
  const classes = useStyles();
  const { title, value } = props;
  return (
    <div>
      <div className={classes.infoCardTitle}>{title}</div>
      <div className={classes.infoCardValue}>{value}</div>
    </div>
  );
};

type TInfoCardListUIProps = {
  data: TypeProps[];
  className?: string;
};

export const InfoCardListUI: FC<TInfoCardListUIProps> = (props) => {
  const { data, className } = props;
  const classes = useStyles();

  return (
    <div className={cn(classes.infoCardListCont, className)}>
      {data.map((restItem) => (
        <InfoCardUI {...restItem} key={restItem.title} />
      ))}
    </div>
  );
};
