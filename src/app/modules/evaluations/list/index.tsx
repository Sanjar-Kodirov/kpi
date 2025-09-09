import React, { FC, useEffect, useMemo } from "react";

import {
  DEPARTMENT_STATUS,
  IPendingEvaluationsList,
  TPendingEvaluationsListAdditionalParams,
  TPendingEvaluationsListParams,
} from "#businessLogic/models/evaluations";
import { useModalControl } from "#hooks/useModalControl";
import { useQueryParams } from "#hooks/useQueryParams";
import { notificationSuccess } from "#src/app/ui";
import { $runtime } from "#stores/index";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { ContextPopoverUI } from "#ui/contextPopover";
import { DrawerModalUI } from "#ui/drawerModal";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { E_APP_TYPE, isAppTypeAdmin } from "#constants/index";
import { StatusTagUI } from "#ui/statusTag";
import { WithPermission } from "#src/hocs/withPermission";
import { PERMISSIONS } from "#src/hocs/withPermission/constants";
import { $evaluationsFilterProps, evaluationsFilterPropsDefault } from "../model";
import { $evaluationsList } from "#stores/department";
import { EvaluationsListFilter } from "../listFilter";

export const EvaluationsList: FC = () => {
  // const addEvaluationModalControl = useModalControl<AddEditEvaluationDrawerModalProps>();

  const evaluationsFilterState = $evaluationsFilterProps.store();
  const { branchId } = $runtime();
  const evaluationsState = $evaluationsList.store();
  // const deleteEvaluationState = $deleteEvaluation.store();
  // const updateEvaluationStatusState = $updateEvaluationStatus.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<
    TPendingEvaluationsListParams,
    TPendingEvaluationsListAdditionalParams
  >(
    evaluationsFilterPropsDefault,
    {
      queryParams: evaluationsFilterState.queryParams,
      additionalParams: evaluationsFilterState.additionalParams,
    },
    $evaluationsFilterProps.update,
    $evaluationsFilterProps.reset,
  );

  const { data: evaluationsData, loading: evaluationsLoading } = evaluationsState;
  const {
    content: evaluations,
    number: evaluationsPage,
    size: evaluationsSize,
    totalElements: evaluationsTotal,
  } = evaluationsData;

  const getEvaluationList = () => {
    $evaluationsList.request({ ...queryParams });
  };

  useEffect(() => {
    getEvaluationList();
  }, [branchId, queryParams]);

  // useEffect(() => {
  //   if (deleteEvaluationState.success) {
  //     getEvaluationList();

  //     notificationSuccess(t("notifications.success"), "Цех удален");
  //     $deleteEvaluation.reset();
  //   }
  // }, [deleteEvaluationState.success]);

  const tableColumns: ColumnsType<IPendingEvaluationsList> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{evaluationsSize * evaluationsPage + index + 1}</div>,
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
        title: t("fields.branch"),
        dataIndex: "branchName",
        key: "branchName",
        render: (_, row) => row.branch.name,
        sorter: false,
      },
      {
        dataIndex: "status",
        key: "status",
        sorter: false,
        render: (_, row) => {
          return (
            <>
              <StatusTagUI status={row.status.code}>{row.status?.name}</StatusTagUI>
            </>
          );
        },
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right",
        width: 60,
        render: (_, row) => (
          <WithPermission annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS_BTN_EDIT }}>
            <ContextPopoverUI
              content={
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
              }
            />
          </WithPermission>
        ),
      },
    ];
  }, [evaluationsSize, evaluationsPage, i18n.language, t]);

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
      <ContentUI.Header title="My evaluations" total={evaluationsTotal}>
        <WithPermission annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS_BTN_ADD }}>
          <ButtonUI type="primary" onClick={onAddEvaluation}>
            Add evaluation
          </ButtonUI>
        </WithPermission>
      </ContentUI.Header>
      <EvaluationsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={evaluations}
          loading={evaluationsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: evaluationsTotal,
            pageSize: evaluationsSize,
            current: evaluationsPage + 1,
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
