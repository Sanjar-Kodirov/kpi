import React from "react";

import { dateFormatWithTime } from "#ui/datePickerPeriod";
import { EForwardPropsCastType } from "#ui/filterBlock/index";
import moment from "moment";

type TProps = {
  children: React.ReactElement[];
  queryParams: any; // fix me
  filterUpdateCallBack: (args: [a: any, b: any]) => void; // fix me
  numberOfElements?: number;
};

export const OverriddenChildrenElements = (props: TProps) => {
  const { children, queryParams, filterUpdateCallBack, numberOfElements } = props;

  return (
    <>
      {children.map((child, index) => {
        if (numberOfElements && index >= numberOfElements) return;

        const childrenProps: any = {
          onTrigger: filterUpdateCallBack,
          key: index,
          ...(child.props.label && !numberOfElements ? { label: child.props.label } : { label: undefined }),
        };
        const additionalValues: Record<string, any> = {};
        const forwardProps: Record<string, string> = child.props.forwardProps;

        if (forwardProps.value && child.props.passTheValue === false) {
          delete forwardProps.value;
        }

        for (const key in forwardProps) {
          if (forwardProps.hasOwnProperty(key)) {
            if (Array.isArray(forwardProps[key])) {
              const castType = forwardProps[key][0];
              const queryParamsKey = forwardProps[key][1];

              switch (castType) {
                case EForwardPropsCastType.NUMBER:
                  additionalValues[key] = queryParams?.[queryParamsKey]
                    ? Number(queryParams?.[queryParamsKey])
                    : undefined;
                  break;
                case EForwardPropsCastType.STRING:
                  additionalValues[key] = String(queryParams?.[queryParamsKey]);
                  break;
                case EForwardPropsCastType.BOOLEAN:
                  additionalValues[key] = !Boolean(queryParams?.[queryParamsKey]);
                  break;
                case EForwardPropsCastType.MOMENT:
                  additionalValues[key] = queryParams?.[queryParamsKey]
                    ? moment(queryParams?.[queryParamsKey], dateFormatWithTime)
                    : undefined;
                  break;
                default:
                  additionalValues[key] = queryParams?.[queryParamsKey];
              }
            } else {
              additionalValues[key] = queryParams?.[forwardProps[key]];
            }
          }
        }

        childrenProps.additionalValues = additionalValues;

        return child.props.getFilterParams ? React.cloneElement(child, childrenProps) : child;
      })}
    </>
  );
};
