import { useParams } from "react-router-dom";
import { isAppTypeAdmin } from "#constants/index";

/**
   @description - Хук будет работать в админке внутри одной компании
 */
export const useAdminCompanyId = () => {
  const { companyId } = useParams<{ companyId: string }>();

  return isAppTypeAdmin && companyId ? Number(companyId) : undefined;
};
