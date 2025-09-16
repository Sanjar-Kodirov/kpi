import React, { Children, ReactElement, ReactNode, useCallback } from "react";

import { useModalControl } from "#hooks/useModalControl";
import { ButtonUI, DrawerModalUI } from "#src/app/ui";
import { FilterOnChangeType } from "#types/common";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { OverriddenChildrenElements } from "./OverriddenChildrenElements";
import { FilterDrawerContent } from "./filterDrawerContent";
import { getFilterItemsFromChild } from "./getFilterItemsFromChild";
import { useStyles } from "./styles";

export type PropsTypes<P, R> = {
  className?: string;
  children: ReactNode;
  onFilterChange?: FilterOnChangeType<P, R>;
  updateQueryParams?: FilterOnChangeType<P, R> | FilterOnChangeType<P>; // Fix me any
  clearQueryParams?: () => void;
  queryParams?: P;
  numberOfFilterItemsToRender?: number;
};

const FilterBlockUI = <P extends {}, R = undefined>(props: PropsTypes<P, R>) => {
  const {
    className = "",
    children,
    queryParams,
    onFilterChange,
    updateQueryParams,
    clearQueryParams,
    numberOfFilterItemsToRender = 2,
  } = props;
  const { t } = useTranslation();
  const extendedFilterDrawerController = useModalControl();

  useStyles();

  let classesCompose = "filterBlock";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  const onExternalFiltersChange = useCallback(
    ([params, additionalParams]) => {
      onFilterChange && onFilterChange(params, additionalParams);
    },
    [onFilterChange],
  );

  const arrayChildren = Children.toArray(children);
  const childrenElements: ReactElement[] = [];

  if (queryParams) {
    Children.forEach(arrayChildren, (child) => {
      if (React.isValidElement(child)) {
        const filterItems = getFilterItemsFromChild(child);

        childrenElements.push(...filterItems.reverse());
      }
    });
  }

  return (
    <div className={classesCompose}>
      {queryParams ? (
        <OverriddenChildrenElements
          queryParams={queryParams}
          filterUpdateCallBack={onExternalFiltersChange}
          numberOfElements={numberOfFilterItemsToRender}
        >
          {childrenElements}
        </OverriddenChildrenElements>
      ) : (
        children
      )}

      {queryParams && childrenElements.length > numberOfFilterItemsToRender ? (
        <ButtonUI onClick={() => extendedFilterDrawerController.openModal()} type="primary">
          {t("fields.advancedFilter")}
        </ButtonUI>
      ) : (
        ""
      )}

      {(clearQueryParams || updateQueryParams) && (
        <div className="filterBlock__buttons">
          {clearQueryParams && (
            <ButtonUI type="secondary" onClick={() => clearQueryParams()} size="small">
              {t("buttons.drop")}
            </ButtonUI>
          )}
          {updateQueryParams && (
            <ButtonUI type="primary" onClick={() => updateQueryParams({} as P)} size="small">
              {t("buttons.update")}
            </ButtonUI>
          )}
        </div>
      )}

      {queryParams && childrenElements.length > numberOfFilterItemsToRender ? (
        <>
          <DrawerModalUI
            open={extendedFilterDrawerController.modalProps.visible}
            onClose={extendedFilterDrawerController.closeModal}
            afterClose={extendedFilterDrawerController.resetModal}
          >
            <FilterDrawerContent
              modalController={extendedFilterDrawerController}
              queryParams={queryParams}
              onFilterChange={onFilterChange}
              modifiedChildrenElements={childrenElements}
            />
          </DrawerModalUI>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export enum EFieldType {
  DEFAULT = "DEFAULT",
  SEARCH = "SEARCH",
}

export enum ETriggerType {
  ONCHANGE = "onChange",
  ONTRIGGER = "onTrigger",
}

export enum EForwardPropsCastType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  MOMENT = "MOMENT",
}

type FilterBlockItemTypes<P, R> = {
  children: React.ReactElement;
  getFilterParams?: (...args: any[]) => (P | R)[];
  onTrigger?: (args: (P | R)[]) => void;
  fieldType?: EFieldType;
  value?: string | number;
  passTheValue?: boolean;
  triggerType?: ETriggerType;
  valueToNumber?: boolean;
  additionalValues?: Record<string, string | number | undefined>;
  forwardProps: Record<string, string | [castType: EForwardPropsCastType, queryParamsKey: string]>;
  label?: string;
};

const FilterBlockItem = <P = {}, R = undefined>(props: FilterBlockItemTypes<P, R>) => {
  const {
    children,
    onTrigger,
    triggerType = ETriggerType.ONCHANGE,
    getFilterParams,
    fieldType = EFieldType.DEFAULT,
    additionalValues,
    label,
  } = props;
  const classes = useStyles();

  const additionalClasses = React.useMemo(() => {
    return {
      [classes.search]: fieldType === EFieldType.SEARCH,
    };
  }, [fieldType]);

  const childrenProps: any = { ...(additionalValues && additionalValues) };

  childrenProps[triggerType] = (...args) => {
    getFilterParams && onTrigger?.(getFilterParams(...args));
  };

  return (
    <div className={cn("filterBlock__item", additionalClasses)}>
      {label ? <div className={classes.filterBlock_item_label}>{label}</div> : ""}
      {getFilterParams ? React.cloneElement(children, childrenProps) : children}
    </div>
  );
};

FilterBlockUI.Item = FilterBlockItem;

export { FilterBlockUI };
