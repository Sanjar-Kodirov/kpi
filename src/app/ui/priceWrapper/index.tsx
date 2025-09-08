import React from "react";

import { UZS_CURRENCY } from "#constants/index";
import { formatPrice } from "#utils/formatters";

import { useStyles } from "./styles";

export const PriceWrapper = ({ price, hideCurrency }: { price: number; hideCurrency?: boolean }) => {
  const classes = useStyles();

  if (price === undefined || price === null) {
    return null;
  }

  return (
    <span className={`${classes.price} w-s-n`}>
      <strong>
        {/*{price.toLocaleString("ru")}*/}
        {formatPrice(price, true)}
      </strong>{" "}
      {!hideCurrency && (
        <>
          <span>{UZS_CURRENCY}</span>
        </>
      )}
    </span>
  );
};
