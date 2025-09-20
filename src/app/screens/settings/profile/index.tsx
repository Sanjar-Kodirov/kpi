import React, { FC, memo } from "react";

import { useCurrentUser } from "#hooks/useCurrentUser";
import { $currentUser } from "#stores/account";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { ProfileSvgIcon } from "#src/assets/svg";

import { InfoCardListUI } from "#ui/infoCard";
import { BackBtn } from "#ui/backBtn";

import { useStyles } from "#src/app/screens/settings/profile/styles";
import { ContentUI } from "#ui/content";

export const ProfilePage: FC = memo(() => {
  const { t } = useTranslation();
  const classes = useStyles();

  const currentUserState = $currentUser.store();
  const { loading: currentUserLoading } = currentUserState;

  let currentUser;
  try {
    currentUser = useCurrentUser();
  } catch (error) {
    currentUser = null;
  }

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: t("fields.admin"),
      owner: t("fields.owner"),
      warehouseManager: t("fields.warehouseManager"),
      intern: t("fields.intern"),
      auditor: t("fields.auditor"),
      operator: t("fields.operator"),
    };
    return roleMap[role] || role;
  };

  const getMembershipTypeDisplayName = (membershipType: string) => {
    const membershipMap: Record<string, string> = {
      city: "Городской",
      regional: "Региональный",
      national: "Национальный",
    };
    return membershipMap[membershipType] || membershipType;
  };

  const profileData = currentUser
    ? [
        {
          title: t("fields.fullNameShort"),
          value: currentUser.full_name,
        },
        {
          title: t("fields.phoneNumber"),
          value: currentUser.phone_number,
        },
        {
          title: t("fields.region"),
          value: currentUser.region_name,
        },
        {
          title: "Роль",
          value: getRoleDisplayName(currentUser.role),
        },
        {
          title: "Тип членства",
          value: getMembershipTypeDisplayName(currentUser.membership_type),
        },
      ]
    : [];

  if (currentUserLoading) {
    return (
      <div className={classes.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={classes.errorContainer}>
        <h2>{t("notifications.error")}</h2>
        <p>{t("notifications.userNotFound")}</p>
      </div>
    );
  }

  return (
    <ContentUI fixed>
      {/* <div className={classes.header}>
        <BackBtn />
        <h1 className={classes.title}>{t("heads.profile")}</h1>
      </div> */}

      <ContentUI.Middle>
        <div className={classes.content}>
          <div className={classes.avatarSection}>
            <div className={classes.avatarContainer}>
              <div className={classes.avatarPlaceholder}>
                <ProfileSvgIcon />
              </div>
            </div>
            <div className={classes.userInfo}>
              <h2 className={classes.userName}>{currentUser.full_name}</h2>
              <p className={classes.userRole}>{getRoleDisplayName(currentUser.role)}</p>
            </div>
          </div>

          <div className={classes.infoSection}>
            <h3 className={classes.sectionTitle}>{t("fields.general")}</h3>
            <InfoCardListUI data={profileData} className={classes.infoCards} />
          </div>
        </div>
      </ContentUI.Middle>
    </ContentUI>
  );
});
