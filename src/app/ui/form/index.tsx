import React, { ReactNode } from "react";

import { Button, Form } from "antd";
import { FormProps } from "antd/lib/form";

import { useStyles } from "./styles";

type TFormUI = React.FC<
  {
    phantomSubmit?: boolean;
    children?: ReactNode;
  } & FormProps
> & {
  Item: typeof Form.Item;
  List: typeof Form.List;
};

const FormUI: TFormUI = (props) => {
  const { phantomSubmit = false, children, className, ...restProps } = props;

  const classes = useStyles();

  let classesCompose = classes.form;

  if (className) {
    classesCompose += ` ${className}`;
  }

  return (
    <Form className={classesCompose} layout="vertical" requiredMark={false} autoComplete="off" {...restProps}>
      <>
        {children}
        {phantomSubmit && (
          <div style={{ width: 0, height: 0, overflow: "hidden" }}>
            <Button htmlType="submit">Save</Button>
          </div>
        )}
      </>
    </Form>
  );
};

FormUI.Item = Form.Item;
FormUI.List = Form.List;

export { FormUI };
