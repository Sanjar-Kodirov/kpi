import React, { FC, memo, useState } from "react";

import { CurrentUserModel } from "#businessLogic/models/account";
import { ROUTES } from "#constants/index";
import { useLogOut } from "#hooks/useLogOut";
import { ArrowBackSvgIcon, LogoutSvgIcon, ProfileSvgIcon, UserDropdownArrowSvgIcon } from "#src/assets/svg";
import * as accountEffector from "#stores/account";
import { Popover, Spin } from "antd";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
type DropdownMenuPropsType = {
  setPopoverOpen: (open: boolean) => void;
};

const DropdownMenu: FC<DropdownMenuPropsType> = memo((props) => {
  const { setPopoverOpen } = props;
  const { i18n } = useTranslation();

  const classes = useStyles();
  const logOut = useLogOut();

  const [isOpenLangOptions, setIsOpenLangOptions] = useState(false);

  return (
    <div className={classes.dropdown}>
      <div className={`${classes.firstBlock} ${isOpenLangOptions && classes.inactiveFirstBlock}`}>
        <Link to={ROUTES.SETTINGS_PROFILE} onClick={() => setPopoverOpen(false)}>
          <div className={classes.dropdownItem}>
            <ProfileSvgIcon />
            Pro'fil
          </div>
        </Link>

        <div className={classes.dropdownItem} onClick={() => logOut()}>
          <LogoutSvgIcon /> Chiqish
        </div>
      </div>

      <div className={classes.secondBlock}>
        <div className={classes.dropdownItemBack} onClick={() => setIsOpenLangOptions(false)}>
          <ArrowBackSvgIcon />
        </div>
      </div>
    </div>
  );
});

export const CurrentUserDropdown = memo(() => {
  const { $currentUser } = accountEffector;

  const currentUserState = $currentUser.store();
  const { loading: currentUserLoading } = currentUserState;

  const currentUserData = currentUserState.data as CurrentUserModel;

  const classes = useStyles();

  const [popoverOpen, setPopoverOpen] = useState(false);

  const renderUserDetails = () => {
    if (currentUserLoading) {
      return (
        <div>
          <Spin />
        </div>
      );
    } else if (currentUserData) {
      return (
        <div>
          <div className={classes.userName}>{currentUserData.full_name}</div>
        </div>
      );
    }
  };

  return (
    <div className={classes.userBlockWr}>
      <Popover
        overlayClassName={classes.popoverWrap}
        placement="bottomRight"
        content={<DropdownMenu setPopoverOpen={setPopoverOpen} />}
        trigger="click"
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        destroyTooltipOnHide
      >
        <div className={classes.userRow}>
          <div className={classes.userPhoto}>
            <div className={classes.userPhotoPlaceholder}>
              {/* {currentUserData.profileImage ? (
                <img className={classes.userImg} src={currentUserData.profileImage?.url} alt="" />
              ) : ( */}
              <span className={classes.noUserImg}>
                <ProfileSvgIcon />
              </span>
              {/* )} */}
            </div>
          </div>
          <div className={classes.userDetails}>{renderUserDetails()}</div>
          <div className={classes.userRight}>
            <UserDropdownArrowSvgIcon />
          </div>
        </div>
      </Popover>
    </div>
  );
});
