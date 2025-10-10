import React, { FC, useEffect, useMemo } from "react";

import {
  IEvaluationItem,
  TPendingEvaluationsListAdditionalParams,
  TPendingEvaluationsListParams,
} from "#businessLogic/models/evaluations";
import { useQueryParams } from "#hooks/useQueryParams";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { StatusTagUI } from "#ui/statusTag";
import { $evaluationsFilterProps, evaluationsFilterPropsDefault } from "../model";
import { $evaluationsList, $exportEvaluations, $rejectEvaluation } from "#stores/evaluations";
import { EvaluationsListFilter } from "../listFilter";
import { formatDate } from "#utils/formatters";
import { useModalControl } from "#hooks/useModalControl";
import { AddEditEvaluationDrawer, AddEditEvaluationDrawerModalProps } from "../addEditDrawer";
import { ModalUI } from "#ui/modal";
import { Col, Row } from "antd";
import { useStyles } from "./styles";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { notificationError, notificationSuccess } from "#ui/notifications";
import { downloadBlobResponse } from "#src/app/utils/download";
import { Link } from "react-router-dom";
import { ROUTES } from "#constants/index";

export const EvaluationsList: FC = () => {
  const addEvaluationModalControl = useModalControl<AddEditEvaluationDrawerModalProps>();

  const classes = useStyles();

  const evaluationsFilterState = $evaluationsFilterProps.store();
  const evaluationsState = $evaluationsList.store();
  const rejectEvaluationState = $rejectEvaluation.store();

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

  useEffect(() => {
    if (rejectEvaluationState.success) {
      notificationSuccess(t("notifications.success"), "Оценка отклонена");
      getEvaluationList();
    }
    return () => {
      $rejectEvaluation.reset();
    };
  }, [rejectEvaluationState.success]);

  const getEvaluationList = () => {
    $evaluationsList.request({ ...queryParams });
  };

  useEffect(() => {
    getEvaluationList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IEvaluationItem> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{index + 1}</div>,
        sorter: false,
      },
      {
        title: "Название",
        dataIndex: "name",
        key: "name",
        render: (_, row) => (
          <Link to={`${ROUTES.EVALUATIONS}/${row.id}`} state={{ ...row }}>
            {row.user_name}
          </Link>
        ),
        sorter: false,
      },
      {
        title: "Регион",
        dataIndex: "region_name",
        key: "region_name",
        render: (_, row) => row.region_name,
        sorter: false,
      },
      {
        title: "Тема оценки",
        dataIndex: "evaluation_text",
        key: "evaluation_text",
        render: (_, row) => row.evaluation_text,
        sorter: false,
      },
      {
        title: "Критерий оценки",
        dataIndex: "criteria_title",
        key: "criteria_title",
        render: (_, row) => row.criteria_title,
        sorter: false,
      },

      {
        title: "Дата оценки",
        dataIndex: "evaluated_date",
        key: "evaluated_date",
        render: (_, row) => <div>{formatDate(row.evaluated_date)}</div>,
        sorter: false,
      },
      // {
      //   title: "Статус",
      //   dataIndex: "status",
      //   key: "status",
      //   sorter: false,
      //   render: (_, row) => {
      //     return (
      //       <>
      //         <StatusTagUI status={row.status}>{row.status}</StatusTagUI>
      //       </>
      //     );
      //   },
      // },
      // {
      //   title: "Действие",
      //   dataIndex: "action",
      //   key: "action",
      //   sorter: false,
      //   render: (_, row) => {
      //     return (
      //       <div className={classes.flex}>
      //         <div>
      //           <ButtonUI onClick={() => onAddEvaluation(row.id)} size="extra-small" type="primary">
      //             Принять
      //           </ButtonUI>
      //         </div>
      //         <div>
      //           <ModalConfirmUI title="Отклонить оценку" onOk={() => onRejectEvaluation(row.id)}>
      //             <ButtonUI onClick={() => onRejectEvaluation(row.id)} size="extra-small" type="secondary">
      //               Отклонить
      //             </ButtonUI>
      //           </ModalConfirmUI>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
    ];
  }, [i18n.language, t]);

  const onFilterChange = (params: TPendingEvaluationsListParams) => {
    updateQueryParams({ page: undefined, ...params });
  };

  const onAddEvaluation = (evaluationId: string) => {
    addEvaluationModalControl.openModal({ evaluationId });
  };

  const onRejectEvaluation = (evaluationId: string) => {
    $rejectEvaluation.request({ evaluation_id: evaluationId });
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  const onExportEvaluations = async () => {
    const res = await $exportEvaluations.request({
      from_date: queryParams.from,
      to_date: queryParams.to,
    });

    try {
      await downloadBlobResponse(
        { data: (res as any).data, headers: (res as any).headers },
        `evaluations_${new Date().toISOString().slice(0, 10)}`,
      );
    } catch (e) {
      notificationError(t("notifications.error"), e instanceof Error ? e.message : "Failed to export file");
    }
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="Мои оценки" total={evaluationsData?.count}>
        <ButtonUI type="primary" onClick={onExportEvaluations}>
          Экспорт
        </ButtonUI>
      </ContentUI.Header>
      <EvaluationsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={evaluationsData?.evaluations}
          loading={evaluationsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
        />
      </ContentUI.Middle>
      <ModalUI open={addEvaluationModalControl.modalProps.visible} onCancel={addEvaluationModalControl.closeModal}>
        <AddEditEvaluationDrawer modalControl={addEvaluationModalControl} callBack={getEvaluationList} />
      </ModalUI>
    </ContentUI>
  );
};
