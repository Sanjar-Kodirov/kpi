import React, { ReactNode } from "react";

import "./styles.scss";

type FormFieldUIProps = {
  title?: string;
  aside?: ReactNode;
  children?: ReactNode;
  desc?: ReactNode;
  error?: string;
  className?: string;
};

export const FormFieldUI = (props: FormFieldUIProps) => {
  const { title, aside, children, desc, error, className } = props;

  return (
    <div
      className={`form-field-item ${className ? className : ""} ${
        error ? "form-field-item-error ant-form-item-has-error" : ""
      }`}
    >
      {title && (
        <div className="form-field-title">
          <div>{title}</div>
          {aside}
        </div>
      )}
      {children}
      {desc && <div className="form-field-item__desc">{desc}</div>}
      {error && <div className="form-field-item__error">{error}</div>}
    </div>
  );
};
