import React, { FC, ReactNode, useMemo, useState } from "react";

import {ArrowDownSvg, ClearSvgIcon, DoneSvgIcon, EditPencilSvg} from '#svgIcons/index';
import { InputUI, TInputUIProps } from "#ui/input";
import { ButtonUI } from "..";
import { Pagination, Table, TablePaginationConfig, TableProps } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import cn from "classnames";

import { useStyles } from "./styles";

type TEditableCommonProps = {
  editableColumns: string[];
  columnKey: string;
};

type TEditableItemProps = {
  value: TInputUIProps["value"];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} & TEditableCommonProps;

const EditableItem: FC<TEditableItemProps> = (props: TEditableItemProps) => {
  const { value, editableColumns, columnKey, onChange } = props;

  const classes = useStyles();

  if (editableColumns.includes(columnKey)) {
    return (
      <div className={classes.editableItemCont}>
        <InputUI min={0} value={value || 0} type={"number"} name={columnKey} onChange={onChange} />
      </div>
    );
  } else {
    return ((value as unknown as ReactNode) || 0) as JSX.Element;
  }
};

type TEditableColumnProps = {
  title: string;
  onEdit: (key: string) => void;
  onClose: (arg: { columnKey: string; save: boolean }) => void;
  onEditGeneral?: React.ChangeEventHandler<HTMLInputElement>;
  generalValues?: {
    markupPercent: number;
    markupSum: number;
  };
} & TEditableCommonProps;

const EditableColumn: FC<TEditableColumnProps> = (props) => {
  const { editableColumns, title, columnKey, onEdit, onClose, onEditGeneral, generalValues } = props;

  const classes = useStyles();

  if (editableColumns.includes(columnKey)) {
    return (
      <div className={classes.cont}>
        <div className={classes.editActionsCont}>
          <div className={classes.title}>{title}</div>
          <div className={classes.cont}>
            <ButtonUI onClick={() => onClose({ columnKey, save: true })}>
              <DoneSvgIcon />
            </ButtonUI>
            <ButtonUI onClick={() => onClose({ columnKey, save: false })}>
              <ClearSvgIcon />
            </ButtonUI>
          </div>
          {onEditGeneral && (
            <InputUI
              min={0}
              value={
                generalValues && generalValues[columnKey as keyof typeof generalValues]
                  ? generalValues[columnKey as keyof typeof generalValues]
                  : 0
              }
              type={"number"}
              name={columnKey}
              onChange={onEditGeneral}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.cont}>
        <div className={classes.editActionsCont}>
          <div className={classes.title}>{title}</div>
          <ButtonUI onClick={() => onEdit(columnKey)}>
            <EditPencilSvg />
          </ButtonUI>
        </div>
      </div>
    );
  }
};

export enum SortOrderFromAntMap {
  ascend = "asc",
  descend = "desc",
}

enum SortOrderToAntMap {
  asc = "ascend",
  desc = "descend",
}

type TQueryParams = {
  orderBy?: string;
  sortOrder?: SortOrderFromAntMap;
};

export const checkSortOrder = (filedName: string, queryParams: TQueryParams) => {
  if (queryParams.sortOrder) {
    return queryParams.orderBy === filedName ? SortOrderToAntMap[queryParams.sortOrder] : null;
  }
};

// type TTableUIProps<T> = TableProps<T> & {
type TTableUIProps = TableProps<any> & {
  onSortChange?: (field: string, order?: SortOrderFromAntMap, sorter?: SorterResult<any>) => void;
  pagination?: TablePaginationConfig;
};

type TTableUI = FC<TTableUIProps> & {
  EditableColumn: typeof EditableColumn;
  EditableItem: typeof EditableItem;
};

// type TTableUI<T> = TTableUIProps<T> & {
//   EditableColumn: TEditableColumnProps;
//   EditableItem: TEditableItemProps;
// };

// const TableUI = <T extends {}>(props: TTableUI<T>) => {
const TableUI: TTableUI = (props) => {
  const { pagination, onSortChange, className, dataSource, expandable, ...restProps } = props;
  // const [localPagination, setLocalPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useStyles();

  const { onChange, ...restPagination } = pagination || {};

  // useEffect(() => {
  //   if (dataSource
  //     && pagination
  //     && pagination.pageSize
  //     && dataSource.length > pagination.pageSize
  //   ) {
  //     setLocalPagination(true)
  //   }
  // }, [pagination?.pageSize])

  const localPagination = useMemo(() => {
    if (dataSource && pagination && pagination.pageSize) {
      if (!pagination.total && dataSource?.length > pagination.pageSize) {
        return true;
      }
    }
  }, [dataSource?.length, pagination?.total, pagination?.pageSize]);

  const splitDataSource = useMemo(() => {
    const returnedValue: any[] = [];
    const pageSize = pagination?.pageSize as number;
    if (localPagination && dataSource && pageSize) {
      for (let index = 0; index < dataSource.length; index = index + pageSize) {
        returnedValue.push(dataSource.slice(index, index + pageSize));
      }
    }
    return returnedValue;
  }, [localPagination, dataSource]);

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    // sorter: SorterResult<T> | SorterResult<T>[],
    // extra: TableCurrentDataSource<T>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => {
    if (extra.action === "sort" && onSortChange && !Array.isArray(sorter) && sorter.order) {
      onSortChange(sorter.field as string, SortOrderFromAntMap[sorter.order], sorter);
    }
  };

  const onPaginationChange = (page, size) => {
    if (localPagination) {
      setCurrentPage(page);
    }

    onChange && onChange(page, size);

    // localPagination ? setCurrentPage : pagination.onChange
  };

  return (
    <div className="customTableContainer">
      <div className="customTableOuter u-fancy-scrollbar">
        <Table
          showSorterTooltip={false}
          rowKey={"id"}
          className={cn("customTable", className)}
          pagination={false}
          dataSource={localPagination ? splitDataSource[currentPage - 1] : dataSource}
          onChange={!!onSortChange ? onTableChange : undefined}
          expandable={expandable ? {
            ...expandable,
            expandIcon: ({ expanded, onExpand, record }) => (
              <div className="customTableExpandedIcon" onClick={e => onExpand(record, e)}>
                <ArrowDownSvg rotateDeg={expanded ? 180 : 0} />
              </div>
            )
          } : undefined}
          {...restProps}
        />
      </div>
      {pagination && (
        <div className="customTablePagination">
          <Pagination
            pageSizeOptions={["20", "50", "100", "150", "250", "500"]}
            size="small"
            total={dataSource?.length}
            current={localPagination ? currentPage : pagination.current}
            onChange={onPaginationChange}
            {...restPagination}
          />
        </div>
      )}
    </div>
  );
};

TableUI.EditableColumn = EditableColumn;
TableUI.EditableItem = EditableItem;

export { TableUI };
