import React, { FC } from "react";

import { ROUTES } from "#constants/index";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";

export const HeaderAuthUI: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerAuth}>
      <div className={classes.headerAuthLogo}>
        <Link to={ROUTES.USER_SIGN_IN}></Link>
      </div>
      <div>
        {/* <div>
          <SelectUI dropdownMatchSelectWidth placeholder = 'trade' >
            <SelectUI.Option>
              {'TRADE'}
            </SelectUI.Option>
          </SelectUI>
        </div> */}
      </div>
    </div>
  );
};
