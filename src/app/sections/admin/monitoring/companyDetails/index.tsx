import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useStyles } from "./styles";
import { $adminCompanyDetails } from "src/app/stores/admin/adminCompany";
import { ContentUI } from "#ui/content";
import { AdminCompanyDetailsMenuList } from "#src/app/sections/admin/monitoring/companyDetails/menu";
import { Spinner } from "#ui/spinner";

export const CompanyDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { companyId } = useParams<{ companyId: string }>();

  // const { branchId } = $runtime();
  const { data: companyDetails, loading: companyDetailLoading } = $adminCompanyDetails.store();

  // const handleChangeBranch = (value: string | undefined) => {
  //   updateRuntimeState({ branchId: value });
  // };

  useEffect(() => {
    $adminCompanyDetails.request(Number(companyId));
  }, []);

  return (
    <ContentUI fixed>
      <ContentUI.Header title={companyDetails?.name} onBackClick={() => navigate(-1)}>
        {/* <CompanyBranchSelect
          className={classes.branchSelect}
          companyId={Number(companyId)}
          value={branchId}
          onChange={handleChangeBranch}
        /> */}
      </ContentUI.Header>
      <ContentUI.Middle>
        {/*<ContentUI.Stats stats={stats} />*/}
        <div className={classes.menuWrapper}>
          <AdminCompanyDetailsMenuList />
        </div>
        <Spinner spinning={companyDetailLoading}>{companyDetails && <Outlet />}</Spinner>
      </ContentUI.Middle>
    </ContentUI>
  );
};
