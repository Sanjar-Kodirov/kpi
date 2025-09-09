import React, { FC } from "react";
import { Layout } from "antd";

import { Outlet } from "react-router-dom";

import { MainAside } from "./mainAside";
import { HeaderUI } from "./header";
import { useStyles } from "./styles";
import { SideNavigation, TMenuList } from "#src/app/screens/main/sideNavigation";
import { useSiderCollapsed } from "#src/app/screens/main/mainAside/useSiderCollapsed";
import { useTranslation } from "react-i18next";
import { useQueryParams } from "#hooks/useQueryParams";

const { Content } = Layout;

type TProps = {
  useMenuList: () => TMenuList[];
};

export const MainScreen: FC<TProps> = ({ useMenuList }) => {
  // const customerSelectModalControl = useModalControl<ICustomerModalProps>();
  const { t } = useTranslation();
  const menuList = useMenuList();

  const { siderCollapsed, setSiderCollapsed, windowWidth } = useSiderCollapsed();

  const classes = useStyles();

  const { queryParams } = useQueryParams({
    queryParams: {},
  });

  // const getCustomerList = () => {
  //   $customersList.request({ ...queryParams });
  // };

  return (
    <div className={classes.siteWrapper}>
      <Layout className={classes.siteLayoutWrap}>
        <MainAside windowWidth={windowWidth} siderCollapsed={siderCollapsed} setSiderCollapsed={setSiderCollapsed}>
          <SideNavigation collapsed={siderCollapsed} menuList={menuList} />
          {/* {isAppTypeCabinet && (
            <div
              className={cn(classes.addCustomer, { [classes.addCustomerCollapsed]: siderCollapsed })}
              onClick={() => customerSelectModalControl.openModal()}
            >
              <WithPermission
                annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.SEATING_HALLS_TABLE_BTN_ADD_CLIENT }}
              >
                <AddUserSvgIcon
                  onClick={() => customerSelectModalControl.openModal()}
                  className={classes.addCustomerIcon}
                />
                <div className={classes.addCustomerText}>{t("fields.addClient", { ns: namespaces.clients })}</div>
              </WithPermission>
            </div>
          )} */}
        </MainAside>
        <Layout className={classes.contentLayout}>
          <HeaderUI />
          <Content>
            <div className={classes.contentInner}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* <ModalUI
        open={customerSelectModalControl.modalProps.visible}
        onCancel={() => customerSelectModalControl.closeModal()}
      >
        <AddEditCustomerModal modalControl={customerSelectModalControl} callBack={getCustomerList} />
      </ModalUI> */}
    </div>
  );
};
