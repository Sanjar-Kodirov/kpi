import React, { FC, useEffect, useState } from "react";

import { Checkbox, Radio, Form, Row, Col } from "antd";

import { useStyles } from "./styles";
import {
  $adminPermissionRolesByRoleId,
  $adminPermissions,
  $adminPermissionsRoles,
  $adminPermissionUsers,
  $createAdminPermissionsRole,
  $createAdminPermissionUser,
} from "#stores/permissions";
import { notificationSuccess } from "#ui/notifications";
import { findPermissionsInTree } from "#utils/findPermissionsInTree";
import { ContentUI } from "#ui/content";
import { Spinner } from "#ui/spinner";
import { ButtonUI } from "#ui/button";
import { CompanySelect } from "#pickers/companySelect";
import { CompanyBranchSelect } from "#pickers/branchSelect";
import { FormUI } from "#ui/form";
import { useWatch } from "antd/lib/form/Form";
// import { UserSelectLookup } from "#pickers/userSelect/index";

type TProps = {
  permissionType: string;
};

export const AdminPermissions: FC<TProps> = (props) => {
  const { permissionType } = props;

  const classes = useStyles();

  const adminEndpointsState = $adminPermissions.store();
  const adminRolePermissionsState = $adminPermissionsRoles.store();
  const adminUserPermissionsState = $adminPermissionUsers.store();
  const addAdminRolePermissionsState = $createAdminPermissionsRole.store();
  const addAdminUserPermissionsState = $createAdminPermissionUser.store();
  const adminPermissionRolesByRoleIdState = $adminPermissionRolesByRoleId.store();

  const [companyUserId, setCompanyUserId] = useState<number | undefined>(undefined);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [type, setType] = useState<string>("ROLE");

  const [form] = Form.useForm<{
    role: string;
    user: string;
    company: number;
    branch: string;
  }>();

  const company = useWatch("company", form);
  const branch = useWatch("branch", form);
  const userRoleCode = useWatch("user", form);
  const role = useWatch("role", form);

  const getEndpoints = () => {
    $adminPermissions.request({ type: permissionType });

    return () => {
      $adminPermissions.reset();
      $adminPermissionsRoles.reset();
      $adminPermissionUsers.reset();
    };
  };

  useEffect(() => {
    return () => {
      $adminPermissions.reset();
      $adminPermissionsRoles.reset();
      $adminPermissionUsers.reset();
      form.resetFields();
    };
  }, [permissionType]);

  useEffect(() => {
    if (addAdminRolePermissionsState.success) {
      notificationSuccess("Успешно!", "Права установлены");
      $createAdminPermissionsRole.reset();
    }
  }, [addAdminRolePermissionsState.success]);

  useEffect(() => {
    if (addAdminUserPermissionsState.success) {
      notificationSuccess("Успешно!", "Права установлены");
      $createAdminPermissionUser.reset();
    }
  }, [addAdminUserPermissionsState.success]);

  useEffect(() => {
    if (!adminEndpointsState.data.length) {
      getEndpoints();
    }
    return () => {
      $adminPermissionUsers.reset();
    };
  }, [permissionType]);

  useEffect(() => {
    if (adminRolePermissionsState.data && userRoleCode) {
      setSelectedPermissions(adminRolePermissionsState.data);
    }
  }, [adminRolePermissionsState.data]);

  useEffect(() => {
    if (adminPermissionRolesByRoleIdState.data) {
      setSelectedPermissions(adminPermissionRolesByRoleIdState.data);
    }
  }, [adminPermissionRolesByRoleIdState.data]);

  useEffect(() => {
    if (adminUserPermissionsState.data) {
      setSelectedPermissions(adminUserPermissionsState.data);
    }
  }, [adminUserPermissionsState.data]);

  const onUserChange = (id: any) => {
    if (id) {
      setCompanyUserId(id);
      $adminPermissionUsers.request(id);
    } else {
      $adminPermissionUsers.reset();
    }
  };

  const onTypeChange = (e: any) => {
    setSelectedPermissions([]);
    // setRoleCode(undefined);
    setCompanyUserId(undefined);
    setType(e.target.value);
    form.setFieldsValue({ role: undefined, user: undefined, branch: undefined, company: undefined });
    $adminPermissionsRoles.reset();
  };

  const onPermissionChange = (e: any, code: any) => {
    const checked = e.target.checked;

    if (checked) {
      const treePermissions = findPermissionsInTree(adminEndpointsState.data, code, [], true);
      if (treePermissions) {
        setSelectedPermissions([...selectedPermissions, ...treePermissions]);
      }
    } else {
      const treePermissions = findPermissionsInTree(adminEndpointsState.data, code, [], false);
      setSelectedPermissions(selectedPermissions.filter((v) => !treePermissions.includes(v)));
    }
  };

  const onRoleChange = (role: string) => {
    if (role === undefined) {
      $adminPermissionsRoles.reset();
    } else {
      $adminPermissionRolesByRoleId.request(role);
    }
  };

  let indexOfColumns = 0;
  const getMenu = (menu: any, level = 0) => {
    if (menu && menu.length) {
      return menu.map((item: any) => {
        ++indexOfColumns;
        return (
          <React.Fragment key={item.id}>
            <div
              className={`${classes.item} 
            ${item.section ? classes.section : ""} ${indexOfColumns % 2 ? classes.odd_child : ""}`}
            >
              <div className={`${classes.item_title}`} style={{ paddingLeft: level * 20 }}>
                {item.name}
              </div>
              <div>
                <Checkbox
                  className={classes.custom_checkbox}
                  onChange={(e: any) => onPermissionChange(e, item.code)}
                  checked={selectedPermissions.includes(item.code)}
                />
              </div>
            </div>
            {getMenu(item.children, level + 1)}
          </React.Fragment>
        );
      });
    }

    return null;
  };

  const onCompanyChange = () => {
    form.setFieldsValue({ branch: undefined, user: undefined });
  };

  const addPermissionsClick = () => {
    if (type === "ROLE") {
      $createAdminPermissionsRole.request({
        permissionType,
        role: role || "",
        permissions: selectedPermissions,
      });
    } else {
      if (!companyUserId) return;
      $createAdminPermissionUser.request({
        permissions: selectedPermissions,
        userId: companyUserId,
        permissionType,
      });
    }
  };

  return (
    <>
      <ContentUI.Header className={classes.header} title="Установка прав" total={0} />
      <div>
        <div className={classes.in}>
          <Radio.Group value={type} onChange={onTypeChange}>
            <Radio value="ROLE">Роли</Radio>
            <Radio value="USER">Пользователи</Radio>
          </Radio.Group>
          <div style={{ position: "relative" }}>
            <div className={classes.menu}>
              <FormUI layout="vertical" form={form}>
                {/* {type === "ROLE" && (
                  <FormUI.Item label="Роли" name="role">
                    <RoleSelect style={{ minWidth: "210px" }} onChange={(role: string) => onRoleChange(role)} />
                  </FormUI.Item>
                )} */}
                {type === "USER" && (
                  <Row gutter={[16, 16]}>
                    <Col>
                      <FormUI.Item label="Компании" name="company">
                        <CompanySelect style={{ minWidth: "210px" }} onChange={onCompanyChange} />
                      </FormUI.Item>
                    </Col>
                    <Col>
                      <FormUI.Item label="Филиалы" name="branch">
                        <CompanyBranchSelect
                          companyId={company}
                          value={branch}
                          disabled={!company}
                          style={{ minWidth: "210px" }}
                        />
                      </FormUI.Item>
                    </Col>
                    <Col>
                      <FormUI.Item label="Пользователи" name="role">
                        {/* <UserSelectLookup
                          disabled={!branch}
                          branchId={branch}
                          companyId={company}
                          style={{ minWidth: "210px" }}
                          onChange={onUserChange}
                        /> */}
                      </FormUI.Item>
                    </Col>
                  </Row>
                )}
              </FormUI>
            </div>
          </div>
          {((role && adminRolePermissionsState.data) || (companyUserId && adminUserPermissionsState.data) || role) && (
            <>
              <div className={classes.m_t_1}>
                <div className={classes.tree}>{getMenu(adminEndpointsState.data)}</div>
                <Spinner spinning={adminEndpointsState.loading || adminUserPermissionsState.loading} />
              </div>
              <div className={classes.saveActions}>
                <ButtonUI type="primary" onClick={addPermissionsClick} loading={false}>
                  Сохранить
                </ButtonUI>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
