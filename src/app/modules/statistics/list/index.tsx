import React, { FC, useEffect, useMemo } from "react";

import {
  IPendingEvaluationsList,
  TPendingEvaluationsListAdditionalParams,
  TPendingEvaluationsListParams,
} from "#businessLogic/models/evaluations";
import { useQueryParams } from "#hooks/useQueryParams";
import { $runtime } from "#stores/index";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $statisticsFilterProps, statisticsFilterPropsDefault } from "../model";
import { $statisticsList } from "#stores/statistics";
import { StatisticsListFilter } from "../listFilter";
import {
  IStatisticsList,
  TStatisticsListParams,
  TStatisticsListAdditionalParams,
} from "#businessLogic/models/statistics";

export const StatisticsList: FC = () => {
  // const addEvaluationModalControl = useModalControl<AddEditEvaluationDrawerModalProps>();

  const statisticsFilterState = $statisticsFilterProps.store();
  const { branchId } = $runtime();
  const statisticsState = $statisticsList.store();
  // const deleteEvaluationState = $deleteEvaluation.store();
  // const updateEvaluationStatusState = $updateEvaluationStatus.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<
    TStatisticsListParams,
    TStatisticsListAdditionalParams
  >(
    statisticsFilterPropsDefault,
    {
      queryParams: statisticsFilterState.queryParams,
      additionalParams: statisticsFilterState.additionalParams,
    },
    $statisticsFilterProps.update,
    $statisticsFilterProps.reset,
  );

  const { data: statisticsData, loading: statisticsLoading } = statisticsState;
  const {
    content: statistics,
    number: statisticsPage,
    size: statisticsSize,
    totalElements: statisticsTotal,
  } = statisticsData;

  const getStatisticsList = () => {
    $statisticsList.request({ ...queryParams });
  };

  useEffect(() => {
    getStatisticsList();
  }, [branchId, queryParams]);

  // useEffect(() => {
  //   if (deleteEvaluationState.success) {
  //     getEvaluationList();

  //     notificationSuccess(t("notifications.success"), "Цех удален");
  //     $deleteEvaluation.reset();
  //   }
  // }, [deleteEvaluationState.success]);

  const tableColumns: ColumnsType<IStatisticsList> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{statisticsSize * statisticsPage + index + 1}</div>,
        sorter: false,
      },
      {
        title: t("fields.title"),
        dataIndex: "name",
        key: "name",
        sorter: false,
      },
      // {
      //   title: t("fields.evaluation"),
      //   dataIndex: "type",
      //   key: "type",
      //   render: (_, row) => row.type.name,
      //   sorter: false,
      // },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right",
        width: 60,
        render: (_, row) => (
          // <WithPermission annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS_BTN_EDIT }}>
          // <ContextPopoverUI
          // content={
          <>
            {/* <ContextPopoverUI.Item>
                    <ButtonUI onClick={() => addEvaluationModalControl.openModal({ evaluationId: row.id })}>
                      {t("buttons.edit")}
                    </ButtonUI>
                  </ContextPopoverUI.Item> */}
            {/*<ContextPopoverUI.Item>*/}
            {/*  <ModalConfirmUI*/}
            {/*    title={"Вы уверены что хотите удалить цех?"}*/}
            {/*    onOk={() => $deleteEvaluation.request(row.id)}*/}
            {/*  >*/}
            {/*    <ButtonUI danger loading={deleteEvaluationState.loading}>*/}
            {/*      {t("buttons.delete")}*/}
            {/*    </ButtonUI>*/}
            {/*  </ModalConfirmUI>*/}
            {/*</ContextPopoverUI.Item>*/}

            {/* <ContextPopoverUI.Item>
                    <ButtonUI
                      disabled={row.status.code === DEPARTMENT_STATUS.ACTIVE}
                      loading={updateEvaluationStatusState.loading}
                      onClick={() => updateStatus(row.id, DEPARTMENT_STATUS.ACTIVE)}
                    >
                      {t("buttons.activate")}
                    </ButtonUI>
                  </ContextPopoverUI.Item>
                  <ContextPopoverUI.Item>
                    <ButtonUI
                      disabled={row.status.code === DEPARTMENT_STATUS.IN_ACTIVE}
                      loading={updateEvaluationStatusState.loading}
                      onClick={() => updateStatus(row.id, DEPARTMENT_STATUS.IN_ACTIVE)}
                    >
                      {t("buttons.deactivate")}
                    </ButtonUI>
                  </ContextPopoverUI.Item> */}
          </>
          // }
          // />
          // </WithPermission>
        ),
      },
    ];
  }, [statisticsSize, statisticsPage, i18n.language, t]);

  const onFilterChange = (params: TPendingEvaluationsListParams) => {
    updateQueryParams({ page: undefined, ...params });
  };

  const onChangePagination = (page: number, size: number) => {
    onFilterChange({ page: page - 1, size });
  };

  const onAddEvaluation = () => {
    // addEvaluationModalControl.openModal();
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="My statistics" total={statisticsTotal}>
        <ButtonUI type="primary" onClick={onAddEvaluation}>
          Add statistics
        </ButtonUI>
      </ContentUI.Header>
      <StatisticsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={statistics}
          loading={statisticsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: statisticsTotal,
            pageSize: statisticsSize,
            current: statisticsPage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>
      {/* <DrawerModalUI open={addEvaluationModalControl.modalProps.visible} onClose={addEvaluationModalControl.closeModal}>
        <AddEditEvaluationDrawer
          adminBranchId={String(queryParams.branchId)}
          modalControl={addEvaluationModalControl}
          callBack={getEvaluationList}
        />
      </DrawerModalUI> */}
    </ContentUI>
  );
};
