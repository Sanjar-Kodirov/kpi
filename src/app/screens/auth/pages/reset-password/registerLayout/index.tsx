import React, { FC, ReactNode } from "react";
import { useStyles } from "./styles";
import { BackBtn } from "#ui/backBtn";
import { useNavigate } from "react-router-dom";
import { ButtonUI } from "#ui/button";

const RegisterLayout = (props) => {
  const classes = useStyles(props);

  return <div className={classes.registerLayout}>{props.children}</div>;
};

type TProps = {
  children: ReactNode;
  backPath?: string;
};

export const Title: FC<TProps> = (props) => {
  const { children, backPath } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <h1 className={classes.title}>
      {backPath && (
        <div className={classes.backBtnWr}>
          <BackBtn backPath={backPath} navigate={navigate} />
        </div>
      )}
      {children}
    </h1>
  );
};

export const BottomButtons: FC<TProps> = (props) => {
  const classes = useStyles();
  return <div className={classes.bottomButtons}>{props.children}</div>;
};

export const TitleDesc: FC<TProps> = (props) => {
  const classes = useStyles();

  return <div className={classes.titleDesc}>{props.children}</div>;
};

const Inner = (props) => {
  const classes = useStyles(props);

  return <div className={classes.registerLayoutInner}>{props.children}</div>;
};

RegisterLayout.Title = Title;
RegisterLayout.TitleDesc = TitleDesc;
RegisterLayout.Inner = Inner;
RegisterLayout.BottomButtons = BottomButtons;

export { RegisterLayout };
