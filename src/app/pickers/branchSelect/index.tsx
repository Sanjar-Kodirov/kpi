import React, { FC, useEffect, useMemo, useState } from "react";

import { namespaces } from "#src/localization/i18n.constants";
// import { $branchItems } from "#stores/branch";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { useTranslation } from "react-i18next";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import { $runtime, updateRuntimeState } from "#stores/index";
import { appType } from "#constants/index";

interface IBranchSelect extends SelectUIPropTypes {
  filterById?: number;
}

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

const getBranchesItems: HandlerType<any, any> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/branches/lookup`,
    params,
  });
};

export const ALL_BRANCHES = "ALL_BRANCHES";

const $branchItems = createXHRStore(getBranchesItems, new XHRDataStoreState<any>([]));

export const BranchSelect: FC<IBranchSelect> = (props) => {
  const { filterById, ...restProps } = props;
  const branchItemsState = $branchItems.store();
  const { t } = useTranslation();

  const runtimeState = $runtime();

  const filteredData = useMemo(() => {
    let { data } = branchItemsState;
    if (filterById) {
      data = data.filter((v) => v.id !== filterById);
    }
    return data;
  }, [branchItemsState.data, filterById]);

  useEffect(() => {
    if (!branchItemsState.data.length) {
      $branchItems.request({});
    }
  }, []);

  useEffect(() => {
    if (branchItemsState.fulfilled) {
      if (filteredData.length) {
        if (runtimeState.branchId) {
          const filteredBranch = filteredData.find((item) => item.id === runtimeState.branchId);
          if (filteredBranch) {
            return;
          }
        }

        updateRuntimeState({ branchId: filteredData[0].id || undefined });
      } else {
        if (runtimeState.branchId) {
          updateRuntimeState({ branchId: undefined });
        }
      }
    }
  }, [runtimeState.branchId, filteredData, branchItemsState.fulfilled]);

  return (
    <SelectUI
      showSearch
      filterOption={(input, option) => (option?.search ?? "").includes(input)}
      loading={branchItemsState.loading}
      placeholder={t("placeholders.selectBranch", { ns: namespaces.common })}
      // value={value || (isGeneralBranchSelect && ALL_BRANCHES)}
      // value={value || (isGeneralBranchSelect ? filteredData[0]?.id : undefined)}
      {...restProps}
    >
      {filteredData.map((item) => (
        <SelectUI.Option key={item.id} value={item.id} search={item.name}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};

type TBranchesSelect = {
  excludeBranchId?: string;
} & SelectUIPropTypes;

export const BranchesSelect: FC<TBranchesSelect> = (props) => {
  const { excludeBranchId, ...restProps } = props;
  const branchItemsState = $branchItems.store();
  const { t } = useTranslation();

  useEffect(() => {
    if (!branchItemsState.data.length) {
      $branchItems.request({});
    }
  }, []);

  const items = useMemo(() => {
    if (excludeBranchId) {
      return branchItemsState.data.filter((item) => item.id !== excludeBranchId);
    }

    return branchItemsState.data;
  }, [excludeBranchId, branchItemsState.data]);

  const onChange = (e, b) => {
    console.log(e, b);
    props.onChange && props.onChange(e, b);
  };
  console.log("props.value", props.value);

  return (
    <SelectUI
      mode="multiple"
      loading={branchItemsState.loading}
      placeholder={t("placeholders.selectBranches")}
      {...restProps}
      onChange={onChange}
    >
      {items.map((item) => (
        <SelectUI.Option key={item.id} value={item.id}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};

type TCompanyBranchSelect = IBranchSelect & {
  companyId: number;
  onChange?: (value: string | undefined) => void;
};

export const CompanyBranchSelect: FC<TCompanyBranchSelect> = (props) => {
  const { companyId, onChange, value, ...restProps } = props;
  const branchItemsState = $branchItems.store();
  const { t } = useTranslation();

  const [firstDefaultValue, setFirstDefaultValue] = useState(null);

  useEffect(() => {
    if (!branchItemsState.data.length || companyId) {
      $branchItems.request({ companyId });
    }

    return () => {
      $branchItems.reset();
      // onChange && onChange(undefined);
    };
  }, [companyId]);

  useEffect(() => {
    if (branchItemsState.data.length && !value) {
      setFirstDefaultValue(branchItemsState.data[0].id);
      onChange && onChange(branchItemsState.data[0].id);
    }
  }, [branchItemsState.data]);

  return (
    <SelectUI
      showSearch
      filterOption={(input, option) => (option?.search ?? "").includes(input)}
      loading={branchItemsState.loading}
      placeholder={t("placeholders.selectBranch", { ns: namespaces.common })}
      // value={value || (isGeneralBranchSelect && ALL_BRANCHES)}
      // value={value || (isGeneralBranchSelect ? filteredData[0]?.id : undefined)}
      value={value || firstDefaultValue}
      onChange={onChange}
      {...restProps}
    >
      {branchItemsState.data.map((item) => (
        <SelectUI.Option key={item.id} value={item.id} search={item.name}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
