import React, { useEffect, useState } from "react";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { Spinner } from "#ui/spinner";

import { useStyles } from "./styles";

const CREATE_CLIENT_TT_SET_MAP_DATA = "CREATE_CLIENT_TT_SET_MAP_DATA";

const areEqual = (prevProps, nextProps) => {
  return prevProps.address === nextProps.address;
};

export type TMapDataIncome = {
  centerCoords: [number, number];
  pmCoords: [number, number];
};

export type TMapDataAddress = {
  region?: {
    mapValue: string;
  };
  district?: {
    mapValue: string;
  };
  street?: string;
  house?: string;
};

export type TMapProps = {
  address?: TMapDataAddress;
  mapData?: TMapDataIncome;
  onMapDataIncome?: (data: TMapDataIncome) => void;
  onClose?: () => void;
  height?: number;
};

export const Map = React.memo((props: TMapProps) => {
  const { address, mapData, onMapDataIncome, onClose, height = 600 } = props;

  useStyles();
  const [renderIframe, setRenderIframe] = useState(false);
  const [loadingIframe, setLoadingIframe] = useState(true);

  useEffect(() => {
    // @ts-ignore
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

    const onMessageCome = (e) => {
      if (e.data && e.data.action) {
        if (e.data.action.type === CREATE_CLIENT_TT_SET_MAP_DATA) {
          onMapDataIncome && onMapDataIncome(e.data.action.data);
        }
      }
    };
    eventer(messageEvent, onMessageCome, false);

    setTimeout(() => {
      // Решение проблемы с торможением всплытия модалки
      setRenderIframe(true);
    }, 200);

    return () => {
      window.removeEventListener(messageEvent, onMessageCome);
    };
  }, []);

  const { region, district, street, house } = address || {};
  const searchAddress = `Узбекистан, ${region ? region.mapValue : ""}${district ? ", " + district.mapValue : ""}${
    street ? ", " + street : ""
  }${house ? ", " + house : ""}`;

  let zoom = 10;
  if (district) {
    zoom = 13;
    if (street) {
      zoom = 15;
      if (house) {
        zoom = 17;
      }
    }
  }

  const pmCoords = mapData?.pmCoords ? mapData.pmCoords : "";
  const centerCoords = mapData?.centerCoords ? mapData.centerCoords : "";

  const onLoad = () => {
    setLoadingIframe(false);
  };

  return (
    <>
      {onMapDataIncome && (
        <ModalUI.Header>
          <ModalUI.Title>Укажите точку на карте</ModalUI.Title>
        </ModalUI.Header>
      )}
      <ModalUI.Middle>
        <div className={"mapContainer"}>
          {renderIframe && (
            <iframe
              onLoad={onLoad}
              src={`https://support24.uz/ya-map?search=${searchAddress}&zoom=${zoom}&pmCoords=${pmCoords}&centerCoords=${centerCoords}`}
              width="100%"
              height={`${height}px`}
            />
          )}
          {loadingIframe && (
            <div className="abs-loader">
              <Spinner size="large" />
            </div>
          )}
        </div>
      </ModalUI.Middle>
      {onClose && (
        <ModalUI.Footer>
          <ModalUI.Buttons>
            <ModalUI.Buttons.Col>
              <ButtonUI onClick={onClose} type="primary">
                Готово
              </ButtonUI>
            </ModalUI.Buttons.Col>
          </ModalUI.Buttons>
        </ModalUI.Footer>
      )}
    </>
  );
}, areEqual);
