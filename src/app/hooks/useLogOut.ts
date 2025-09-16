import { ACCESS_TOKEN_KEY_FOR_COOKIE, REFRESH_TOKEN_KEY_FOR_COOKIE, ROUTES } from "#constants/index";
import { globalReset } from "#core/store";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const navigate = useNavigate();

  return () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY_FOR_COOKIE);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY_FOR_COOKIE);
    navigate(ROUTES.USER_SIGN_IN, {
      replace: true,
    });

    globalReset();
  };
};
