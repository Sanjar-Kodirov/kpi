import React, { FC } from "react";

import { DrawerModalUI, DrawerPropTypes } from "#ui/drawerModal";
import { DrawerProps } from "antd";

import { Map, TMapProps } from "./map";

type TProps = Omit<TMapProps & DrawerPropTypes & DrawerProps, "children">;

export const CoordsMapDrawer: FC<TProps> = (props) => {
  const { mapData, address, onMapDataIncome, ...restProps } = props;

  return (
    <DrawerModalUI width={800} {...restProps}>
      <Map onClose={restProps.onClose} mapData={mapData} address={address} onMapDataIncome={onMapDataIncome} />
    </DrawerModalUI>
  );
};
