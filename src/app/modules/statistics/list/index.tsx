import React, { FC, useEffect, useMemo } from "react";

import { TPendingEvaluationsListParams } from "#businessLogic/models/evaluations";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $statisticsFilterProps, statisticsFilterPropsDefault } from "../model";
import { $statisticsList, $exportStatistics } from "#stores/statistics";
import { StatisticsListFilter } from "../listFilter";
import {
  TStatisticsListParams,
  TStatisticsListAdditionalParams,
  IStatisticsUser,
} from "#businessLogic/models/statistics";
import { ButtonUI } from "#ui/button";
import { downloadBlobResponse } from "#src/app/utils/download";
import { notificationError } from "#ui/notifications";

export const StatisticsList: FC = () => {
  const statisticsFilterState = $statisticsFilterProps.store();
  const statisticsState = $statisticsList.store();

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
  const getStatisticsList = () => {
    $statisticsList.request({ ...queryParams });
  };

  useEffect(() => {
    getStatisticsList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IStatisticsUser> = useMemo(() => {
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
        title: "F.I.O.",
        dataIndex: "name",
        key: "name",
        render: (_, row) => row.full_name,
        sorter: false,
      },

      {
        title: "Viloyat",
        dataIndex: "region",
        key: "region",
        render: (_, row) => row.region,
        sorter: false,
      },
      {
        title: "Rol",
        dataIndex: "type",
        key: "type",
        render: (_, row) => row.role,
        sorter: false,
      },

      {
        title: "Baholashlar soni",
        dataIndex: "count",
        key: "count",
        render: (_, row) => row.approved_count,
        sorter: false,
      },
      {
        title: "Baholash",
        dataIndex: "score",
        key: "score",
        render: (_, row) => row.average_score,
        sorter: false,
      },
      {
        title: "Umumiy ball",
        dataIndex: "total_score",
        key: "total_score",
        render: (_, row) => row.total_score,
        sorter: false,
      },
    ];
  }, [statisticsState, i18n.language, t]);

  const onFilterChange = (params: TPendingEvaluationsListParams) => {
    updateQueryParams({ ...params });
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  const onExportStatistics = async () => {
    const res = await $exportStatistics.request({
      ...queryParams,
    });

    try {
      await downloadBlobResponse(
        { data: (res as any).data, headers: (res as any).headers },
        `statistics_${new Date().toISOString().slice(0, 10)}`,
      );
    } catch (e) {
      notificationError(t("notifications.error"), e instanceof Error ? e.message : "Failed to export file");
    }
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="Statistika" total={statisticsData?.total_users}>
        <ButtonUI type="primary" onClick={onExportStatistics}>
          Экспорт
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
          dataSource={statisticsData?.users}
          loading={statisticsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
        />
      </ContentUI.Middle>
    </ContentUI>
  );
};
