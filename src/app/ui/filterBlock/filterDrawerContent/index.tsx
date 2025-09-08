import React, { ReactElement, useCallback, useState } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { PropsTypes } from "#ui/filterBlock";
import { ModalUI } from "#ui/modal";
import { useTranslation } from "react-i18next";

import { OverriddenChildrenElements } from "../OverriddenChildrenElements";

import { useStyles } from "./styles";

interface FilterDrawerPropsTypes<P, R> extends Partial<PropsTypes<P, R>> {
  modifiedChildrenElements: ReactElement[];
  modalController: ModalControlType<object>;
}
export const FilterDrawerContent = <P = {}, R = undefined>(props: FilterDrawerPropsTypes<P, R>) => {
  const { modifiedChildrenElements, onFilterChange, modalController, queryParams } = props;

  const [filterParams, setFilterParams] = useState<P>(queryParams!);
  const [filterAdditionalParams, setFilterAdditionalParams] = useState<R>();
  const classes = useStyles();
  const { t } = useTranslation();

  const localFilterUpdate = useCallback(
    ([params, additionalParams]) => {
      setFilterParams({ ...filterParams, ...params });
      setFilterAdditionalParams({ ...filterAdditionalParams, ...additionalParams });
    },
    [filterParams],
  );

  const onFilterSubmit = useCallback(() => {
    if (filterParams || filterAdditionalParams) onFilterChange?.(filterParams, filterAdditionalParams);
    modalController.closeModal();
  }, [filterParams, filterAdditionalParams]);

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>{t("heads.advancedFilter")}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div className={classes.groupContaienr}>
          <OverriddenChildrenElements queryParams={filterParams} filterUpdateCallBack={localFilterUpdate}>
            {modifiedChildrenElements}
          </OverriddenChildrenElements>
        </div>
      </ModalUI.Middle>
      <ModalUI.Footer>
        {/* <div className={classes.modalFooterButtons}> */}
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={() => modalController.closeModal()} size="large">
              {t("buttons.close")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" size="large" onClick={onFilterSubmit}>
              {t("buttons.apply")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>

        {/* </div> */}
      </ModalUI.Footer>
    </>
  );
};
