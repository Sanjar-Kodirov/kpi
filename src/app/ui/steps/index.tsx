import React, { FC } from "react";

import { Steps, StepsProps } from "antd";
import RcSteps from "rc-steps";

import { useStyles } from "./styles";

type TStepsUIProps = FC<StepsProps> & {
  Step: typeof RcSteps.Step;
};

const StepsUI: TStepsUIProps = (props) => {
  const { className } = props;

  useStyles();

  let classesCompose = "custom-step";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return <Steps className={classesCompose} {...props} />;
};

StepsUI.Step = RcSteps.Step;

export { StepsUI };
