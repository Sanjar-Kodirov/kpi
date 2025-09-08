import React, { FC, useEffect } from "react";

import { Checkbox, Form, Input, TreeSelect } from "antd";
import { $createAdminPermissions, $updateAdminPermissions } from "#stores/permissions";
import { ModalControlType } from "#hooks/useModalControl";
import { notificationSuccess } from "#ui/notifications";
import { ModalUI } from "#ui/modal";
import { FormUI } from "#ui/form";
import { requiredRules } from "#constants/index";
import { ButtonUI } from "#ui/button";

const getCategoriesTreeData = (tree: any, editableEndpointId: string) => {
  return tree.map((item: any) => {
    return {
      title: item.name,
      value: item.id,
      children: item.id === editableEndpointId ? [] : getCategoriesTreeData(item.children, editableEndpointId),
      disabled: item.id === editableEndpointId,
    };
  });
};

export type AddAndEditEndpointPropTypes = {
  id?: number;
  parentIdOfCreatingItem?: number;
  endpoint?: any;
};

type PropTypes = {
  modalControl: ModalControlType<AddAndEditEndpointPropTypes>;
  callBack?: () => void;
  companyId?: string;
  endpoints?: any;
  permissionType: string;
};

export const AddAndEditAminEndpoint: FC<PropTypes> = ({ callBack, endpoints, modalControl, permissionType }) => {
  const { endpoint, parentIdOfCreatingItem } = modalControl.modalProps;

  const editableEndpointId = endpoint ? endpoint.id : undefined;
  const [form] = Form.useForm();
  const createEndpointState = $createAdminPermissions.store();
  const updateEndpointState = $updateAdminPermissions.store();

  useEffect(() => {
    if (editableEndpointId && endpoint) {
      form.setFieldsValue({
        name: endpoint.name,
        code: endpoint.code,
        section: endpoint.section,
        parentId: endpoint.parentId ? endpoint.parentId : undefined,
      });
    }

    return () => {
      $updateAdminPermissions.reset();
    };
  }, []);

  useEffect(() => {
    if (createEndpointState.success) {
      form.resetFields();
      notificationSuccess("Успешно!", "Эндпоинт создан");
      $createAdminPermissions.reset();
      callBack && callBack();
      modalControl.closeModal();
    }
  }, [createEndpointState.success]);

  useEffect(() => {
    if (updateEndpointState.success) {
      form.resetFields();
      notificationSuccess("Успешно!", "Эндпоинт обновлен");
      $updateAdminPermissions.reset();
      callBack && callBack();
      modalControl.closeModal();
    }
  }, [updateEndpointState.success]);

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = () => {
    const formData = form.getFieldsValue(true);
    const currentEditableEndpointId = endpoint ? endpoint.id : undefined;

    const data: any = {
      name: formData.name,
      code: formData.code,
      permissionType: permissionType,
      parentId: parentIdOfCreatingItem,
      section: formData.section,
    };

    if (currentEditableEndpointId) {
      data.id = editableEndpointId;
      data.parentId = parentIdOfCreatingItem ? parentIdOfCreatingItem : undefined;

      $updateAdminPermissions.request(data);
    } else {
      $createAdminPermissions.request(data);
    }
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    form.submit();
    modalControl.openModal({
      ...values,
      endpoint,
      parentIdOfCreatingItem,
    });
  };

  return (
    <>
      <ModalUI.Loading show={createEndpointState.loading || updateEndpointState.loading} />
      <ModalUI.Error error={updateEndpointState.error} />

      <ModalUI.Header>
        <ModalUI.Title>{endpoint ? "Редактировать эндпоинт" : "Добавить эндпоинт"}</ModalUI.Title>
      </ModalUI.Header>

      <ModalUI.Middle>
        <FormUI onFinish={onFinish} form={form} layout="vertical">
          {editableEndpointId && endpoint?.parentId && (
            <FormUI.Item label="Категория" name="parentId" rules={requiredRules}>
              <TreeSelect
                showSearch
                allowClear
                placeholder="Выберите категорию"
                filterTreeNode={(search, item) => {
                  return String(item.title).toLowerCase().indexOf(search.toLowerCase()) >= 0;
                }}
                treeData={getCategoriesTreeData(endpoints, editableEndpointId)}
                dropdownMatchSelectWidth={500}
              />
            </FormUI.Item>
          )}
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <Input placeholder="Введите название" />
          </FormUI.Item>
          <FormUI.Item label="Аннотация" name="code" rules={requiredRules}>
            <Input placeholder="Введите аннотацию" />
          </FormUI.Item>
          <FormUI.Item name="section" valuePropName="checked">
            <Checkbox>Раздел</Checkbox>
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>

      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="bordered" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" htmlType="submit" onClick={handleSubmit}>
              {editableEndpointId ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
