import React, { ReactNode, useState } from "react";

import { ContextMenuDotsSvg } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { Popover } from "antd";
import { PopoverProps } from "antd/lib/popover";

import { useStyles } from "./styles";

type ItemProps = {
  children?: ReactNode;
};
export const Item = (props: ItemProps) => {
  const { children } = props;

  useStyles();

  return <div className="customContextPopover__item">{children}</div>;
};

type ContentPropsType = PopoverProps & { disabled?: boolean };
type ContextPopoverUIType = React.FC<ContentPropsType> & {
  Item: typeof Item;
};

const ContextPopoverUI: ContextPopoverUIType = (props) => {
  const { content, disabled, children, ...restProps } = props;
  useStyles();

  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <Popover
      overlayClassName="customContextPopover"
      trigger="click"
      placement="left"
      content={
        <div
          onClick={(event) => {
            event.stopPropagation();
            setPopoverVisible(false);
          }}
        >
          {content instanceof Function ? content() : content}
        </div>
      }
      open={popoverVisible}
      onOpenChange={(visible) => setPopoverVisible(disabled ? false : visible)}
      {...restProps}
    >
      {children ? (
        children
      ) : (
        <ButtonUI
          className="customContextPopover__contextBtn"
          onClick={(event) => event.stopPropagation()}
          disabled={disabled}
        >
          <ContextMenuDotsSvg />
        </ButtonUI>
      )}
    </Popover>
  );
};

ContextPopoverUI.Item = Item;

export { ContextPopoverUI };
