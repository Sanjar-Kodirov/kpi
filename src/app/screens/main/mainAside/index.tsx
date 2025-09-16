import React, { ReactNode, useEffect } from "react";
import { ASIDE_SETTINGS } from "#constants/index";
import { BurgerArrowSvgIcon } from "#svgIcons/index";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { useStyles } from "./styles";
import { SiderTheme } from "antd/es/layout/Sider";
import cn from "classnames";

const { Sider } = Layout;

type TProps = {
  windowWidth: number;
  siderCollapsed: boolean;
  setSiderCollapsed: (collapsed: boolean) => void;
  children: ReactNode;
  siderTheme?: SiderTheme;
  drawBottomInfo?: boolean;
  asideInnerClassName?: string;
};

export const MainAside: React.FC<TProps> = (props) => {
  const {
    windowWidth,
    siderCollapsed,
    setSiderCollapsed,
    children,
    siderTheme,
    drawBottomInfo = true,
    asideInnerClassName,
  } = props;
  const classes = useStyles({
    sideInnerBg: siderTheme || "dark",
  });
  const { t } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    if (windowWidth <= ASIDE_SETTINGS.BREAK) {
      setSiderCollapsed(true);
    }
  }, [location, windowWidth]);

  const onSiderToggle = () => {
    const value = !siderCollapsed;
    setSiderCollapsed(value);
    localStorage.setItem(ASIDE_SETTINGS.LOCAL_COLLAPSED_NAME, value ? "1" : "0");
  };

  return (
    <Sider
      className={classes.aside}
      trigger={null}
      collapsible
      collapsed={siderCollapsed}
      width={ASIDE_SETTINGS.EXPANDED}
      collapsedWidth={ASIDE_SETTINGS.COLLAPSED}
      theme={siderTheme}
    >
      <div className={classes.logoWrapper}>
        <Link to="/">
          <div className={classes.logoIcon}>{/* <Logo /> */}</div>
          <div className={classes.logoLabel}>{/* <Logo /> */}</div>
        </Link>
      </div>
      <div className={cn(classes.asideInner, asideInnerClassName)}>
        <div className={`${classes.navigation} u-fancy-scrollbar u-fancy-scrollbar-dark`}>{children}</div>
        {drawBottomInfo ? (
          <div className={classes.asideBottom}>
            <div className={classes.layoutAsideTriggerWr}>
              <div></div>
              <div className={classes.layoutAsideTrigger} onClick={onSiderToggle}>
                <span className={classes.layoutAsideTriggerText}>{t("fields.hide")}</span>
                <BurgerArrowSvgIcon />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Sider>
  );
};
