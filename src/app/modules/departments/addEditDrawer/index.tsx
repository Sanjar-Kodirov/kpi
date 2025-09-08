import React, { FC, useEffect, useMemo } from "react";

import { DEPARTMENT_TYPE, IDepartmentDetailsModel } from "#businessLogic/models/department";
import { isAppTypeAdmin, requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $createDepartment, $departmentDetails, $updateDepartment } from "#stores/department";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { InputUI } from "#ui/input";
import { ModalUI } from "#ui/modal";
import { notificationSuccess } from "#ui/notifications";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { DepartmentTypeSelect } from "#pickers/departmentTypeSelect";
import { $runtime } from "#stores/index";

export type AddEditDepartmentDrawerModalProps = {
  departmentId: string;
};

type TProps = {
  modalControl: ModalControlType<AddEditDepartmentDrawerModalProps>;
  departmentDetails?: IDepartmentDetailsModel;
  adminBranchId?: string;
  callBack?: () => void;
};

type TInitialValues = {
  branchId: string;
  type: DEPARTMENT_TYPE;
  name: string;
};

export const AddEditDepartmentDrawer: FC<TProps> = (props) => {
  const { modalControl, adminBranchId, departmentDetails, callBack } = props;
  const { modalProps } = modalControl;

  const [form] = Form.useForm<TInitialValues>();
  const { t } = useTranslation();

  const runtimeState = $runtime();

  const createDepartmentState = $createDepartment.store();
  const updateDepartmentState = $updateDepartment.store();
  const departmentDetailsState = $departmentDetails.store();

  const departmentDetailsData = useMemo(() => {
    return departmentDetails || departmentDetailsState.data;
  }, [departmentDetails, departmentDetailsState.data]);

  useEffect(() => {
    if (modalProps.departmentId) {
      $departmentDetails.request(modalProps.departmentId);
    }
  }, [modalProps.departmentId]);

  useEffect(() => {
    return () => {
      $departmentDetails.reset();
    };
  }, []);

  useEffect(() => {
    if (createDepartmentState.success) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Цех добавлен");
      modalControl.closeModal();
      $createDepartment.reset();
    }
  }, [createDepartmentState.success]);

  useEffect(() => {
    if (updateDepartmentState.success) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Цех обновлен");
      modalControl.closeModal();
      $updateDepartment.reset();
    }
  }, [updateDepartmentState.success]);

  useEffect(() => {
    if (departmentDetailsData) {
      form.setFieldsValue({
        branchId: departmentDetailsData.branch?.id,
        type: departmentDetailsData.type?.code,
        name: departmentDetailsData.name,
      });
    }
  }, [departmentDetailsData]);

  const onSubmit = (values: TInitialValues) => {
    const data = {
      branchId: isAppTypeAdmin && adminBranchId ? adminBranchId : runtimeState.branchId!,
      type: values.type,
      name: values.name,
    };

    if (departmentDetailsData) {
      $updateDepartment.request({ ...data, id: departmentDetailsData.id });
    } else {
      $createDepartment.request(data);
    }
  };

  return (
    <>
      <ModalUI.Loading
        show={createDepartmentState.loading || updateDepartmentState.loading || departmentDetailsState.loading}
      />
      <ModalUI.Header>
        <ModalUI.Title>
          {modalProps.departmentId || departmentDetailsData ? t("modals.updateDepartment") : t("buttons.addDepartment")}
        </ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Error
        error={createDepartmentState.error || updateDepartmentState.error || departmentDetailsState.error}
      />
      <ModalUI.Middle>
        <FormUI form={form} initialValues={{ branchId: runtimeState.branchId }} onFinish={onSubmit} phantomSubmit>
          <FormUI.Item label={t("fields.departmentType")} name="type" rules={requiredRules}>
            <DepartmentTypeSelect placeholder={t("fields.departmentType")} />
          </FormUI.Item>

          <FormUI.Item label={t("fields.title")} name="name" rules={requiredRules}>
            <InputUI placeholder={t("fields.title")} />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={() => modalControl.closeModal()} fullWidth>
              {t("buttons.cancel")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              {departmentDetailsData ? t("buttons.save") : t("buttons.add")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
