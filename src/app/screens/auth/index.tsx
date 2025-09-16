import React, { FC } from "react";

import { useTranslation } from "react-i18next";

import { HeaderAuthUI } from "./components/header";
import { useStyles } from "./styles";
import { Outlet } from "react-router-dom";

export const UserAuthScreen: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={`${classes.wrapper} u-fancy-scrollbar`}>
      <HeaderAuthUI />
      <div className={classes.content}>
        <Outlet />
        {/*<Switch>*/}
        {/*  <Route path={ROUTES.USER_SIGN_IN} component={SignIn} />*/}
        {/*  <Route path={ROUTES.USER_RESET_PASSWORD} component={ResetPassword} />*/}
        {/*  <Route path={ROUTES.USER_SIGN_UP} component={Registration} />*/}
        {/*  /!* <Route path='*' component={NotFound}/> *!/*/}
        {/*</Switch>*/}
      </div>
      <div className={classes.compInfo}>
        <div>{`© 2025-${new Date().getFullYear()}`}</div>
      </div>
    </div>
  );
};
