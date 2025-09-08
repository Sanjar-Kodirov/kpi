import React, {
  ChangeEvent,
  ClipboardEvent,
  ClipboardEventHandler,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
  MouseEvent,
  ReactNode,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { SearchSvgIcon } from "#src/assets/svg";
import { debounce } from "#utils/debounceLodash";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, InputNumber, InputProps, InputRef } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import { useStyles } from "./styles";
import { ButtonUI } from "#ui/button";
import { namespaces } from "#src/localization/i18n.constants";

const withDebounce = debounce(
  (action: () => void) => {
    action();
  },
  300,
  false,
);

interface Variants {
  variant?: "auth";
}

export type TInputUIProps = InputProps & Variants;
const InputUI = (props: TInputUIProps) => {
  const { className, readOnly, variant, ...restProps } = props;
  const classes = useStyles();
  let classesCompose = `${classes.input} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  return <Input autoComplete="off" className={classesCompose} disabled={readOnly} {...restProps} />;
};

const Password = (props: TInputUIProps) => {
  const { className, readOnly, variant, ...restProps } = props;
  const classes = useStyles();
  let classesCompose = `${classes.input} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  return (
    <Input.Password
      autoComplete="off"
      className={classesCompose}
      disabled={readOnly}
      {...restProps}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};

type TSearchProps = Omit<TInputUIProps, "onChange"> & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, search: string) => void;
  loading?: boolean;
};

const Search = (props: TSearchProps) => {
  const { className, onChange, value, type, ...restProps } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(value);
  const { t } = useTranslation();

  useEffect(() => {
    if (value !== searchValue) {
      setSearchValue(value);
    }
  }, [value]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    const search = type === "number" ? (event as string) : (event as React.ChangeEvent<HTMLInputElement>).target.value;
    setSearchValue(search);

    withDebounce(() => {
      onChange?.(event as React.ChangeEvent<HTMLInputElement>, search);
    });
  };

  let classesCompose = `${classes.search} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (type === "number") {
    return (
      <InputUI.Number
        className={classesCompose}
        placeholder={t("fields.search")}
        value={searchValue as string}
        prefix={
          <div className={classes.searchIcon}>
            <SearchSvgIcon />
          </div>
        }
        // allowClear
        {...(restProps as NumberInputProps)}
        onChange={(v) => onSearchChange(`${v}`)}
      />
    );
  }

  return (
    <InputUI
      className={classesCompose}
      placeholder={t("fields.search")}
      value={searchValue}
      onChange={onSearchChange}
      prefix={
        <div className={classes.searchIcon}>
          <SearchSvgIcon />
        </div>
      }
      allowClear
      {...restProps}
    />
  );
};

type SplitProps = Omit<TInputUIProps, "size"> & {
  value?: string[];
  size?: 4 | 5 | 6;
};

const Split: FC<SplitProps> = ({ className, readOnly, variant, value, size = 6, onChange, ...restProps }) => {
  const classes = useStyles();

  let classesCompose = `${classes.input} custom-input ${classes["split-input"]}`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  const inputOne = useRef<HTMLInputElement | null>(null);

  const inputTwo = useRef<HTMLInputElement | null>(null);

  const inputThree = useRef<HTMLInputElement | null>(null);

  const inputFour = useRef<HTMLInputElement | null>(null);

  const inputFive = useRef<HTMLInputElement | null>(null);

  const inputSix = useRef<HTMLInputElement | null>(null);

  const [focused, setFocused] = useState(false);

  const handleFocus = (value: string) => {
    switch (value.length) {
      // case 0: {
      //   inputOne.current.focus()
      // }
      case 1:
        {
          inputTwo?.current?.focus();
        }
        break;
      case 2:
        {
          inputThree?.current?.focus();
        }
        break;
      case 3:
        {
          inputFour?.current?.focus();
        }
        break;
      case 4:
        {
          inputFive?.current?.focus();
        }
        break;
      case 5:
        {
          inputSix?.current?.focus();
        }
        break;
    }
    if (value.length === 0) {
      inputOne?.current?.focus();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = "";
    if (e.target.value && onChange) {
      newValue = (value + e.target.value) as string;
      onChange({ ...e, target: { ...e.target, value: newValue } });
      handleFocus(value + e.target.value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const copyValue = value as string;
    let newValue = "";
    if (e.key === "Backspace" && onChange) {
      newValue = copyValue.slice(0, copyValue.length - 1);
      onChange({
        ...e,
        //@ts-ignore
        target: {
          value: newValue,
        },
      });
    }
  };

  const handleOnFocus = () => {
    setFocused((prevState) => !prevState);
  };

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newValue =
      "originalEvent" in e
        ? (e.originalEvent as ClipboardEvent).clipboardData.getData("text/plain")
        : e.clipboardData.getData("text/plain");
    if (onChange) {
      onChange({
        ...e,
        target: {
          value: newValue,
        } as EventTarget & HTMLInputElement,
      });
    }
  };

  useEffect(() => {
    handleFocus(value as string);
  }, [value, focused]);

  return (
    <div className={classes.splitCont}>
      <Input
        ref={inputOne as unknown as RefObject<InputRef>}
        className={classesCompose}
        disabled={readOnly}
        maxLength={1}
        onPaste={handlePaste}
        name="1"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleOnFocus}
        value={value ? value[0] : undefined}
        {...restProps}
      />
      <Input
        ref={inputTwo as unknown as RefObject<InputRef>}
        className={classesCompose}
        disabled={readOnly}
        maxLength={1}
        onPaste={handlePaste}
        name="2"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleOnFocus}
        value={value ? value[1] : undefined}
        {...restProps}
      />
      <Input
        ref={inputThree as unknown as RefObject<InputRef>}
        className={classesCompose}
        disabled={readOnly}
        maxLength={1}
        onPaste={handlePaste}
        name="3"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleOnFocus}
        value={value ? value[2] : undefined}
        {...restProps}
      />
      <Input
        ref={inputFour as unknown as RefObject<InputRef>}
        className={classesCompose}
        disabled={readOnly}
        maxLength={1}
        onPaste={handlePaste}
        name="4"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleOnFocus}
        value={value ? value[3] : undefined}
        {...restProps}
      />
      <Input
        ref={inputFive as unknown as RefObject<InputRef>}
        className={classesCompose}
        disabled={readOnly}
        maxLength={1}
        onPaste={handlePaste}
        name="5"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleOnFocus}
        value={value ? value[4] : undefined}
        {...restProps}
      />
      {size > 5 && (
        <Input
          ref={inputSix as unknown as RefObject<InputRef>}
          className={classesCompose}
          disabled={readOnly}
          maxLength={1}
          onPaste={handlePaste}
          name="6"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocusCapture={handleOnFocus}
          value={value ? value[5] : undefined}
          {...restProps}
        />
      )}
    </div>
  );
};

type NumberInputProps = Omit<InputNumberProps, "onChange"> & {
  hideArrows?: boolean;
  suffix?: string;
  whole?: boolean;
  onChange?: (value: number | null) => void;
};

const NumberInput = React.forwardRef((props: NumberInputProps, ref) => {
  const { className, hideArrows, suffix, whole, onChange, ...restProps } = props;

  const classes = useStyles();

  const classesCompose = cn(classes.inputNumber, {
    [className as string]: !!className,
    [classes.inputNumberDisabled]: props.disabled,
    [classes.hideArrows]: hideArrows,
  });

  const onChangeLocal = (value: number | null) => {
    if (whole) {
      onChange?.(value ? parseInt(`${value}`) : value);
    } else {
      onChange?.(value);
    }
  };

  return (
    <div className={classesCompose}>
      <InputNumber
        onChange={(v) => onChangeLocal(v as number | null)}
        ref={ref as Ref<HTMLInputElement>}
        parser={(value) => {
          return value?.replace(",", ".") || "";
        }}
        {...restProps}
      />
      {!!props.suffix && <div className={classes.inputNumber__suffix}>{suffix}</div>}
    </div>
  );
});

export const Phone: FC<TInputUIProps> = (props) => {
  return (
    <InputMask mask="+\9\9\8 99 999 99 99" placeholder="+998 __ ___ __ __" maskChar="_" {...props}>
      {/*@ts-ignore*/}
      {(inputProps: TInputUIProps) => <InputUI {...props} {...inputProps} />}
    </InputMask>
  );
};

type TMaskedInputProps = {
  mask: string | (string | RegExp)[];
  maskChar?: string;
} & TInputUIProps;

export const Masked: FC<TMaskedInputProps> = (props) => {
  const { mask, maskChar, ...rest } = props;
  return (
    <InputMask mask={mask} maskChar={maskChar ? maskChar : "_"} {...rest}>
      {/*@ts-ignore*/}
      {(inputProps: TInputUIProps) => <InputUI {...rest} {...inputProps} />}
    </InputMask>
  );
};

export const CardPan: FC<TInputUIProps> = (props) => {
  return (
    <InputMask mask="9999 9999 9999 9999" placeholder="---- ---- ---- ----" maskChar="-" {...props}>
      {/*@ts-ignore*/}
      {(inputProps: TInputUIProps) => <InputUI {...inputProps} />}
    </InputMask>
  );
};

export const CardExpiry: FC<TInputUIProps> = (props) => {
  return (
    <InputMask mask="99 / 99" placeholder="-- / --" maskChar="-" {...props}>
      {/*@ts-ignore*/}
      {(inputProps: TInputUIProps) => <InputUI {...inputProps} />}
    </InputMask>
  );
};

type UploadFileProps = InputHTMLAttributes<HTMLInputElement> & {
  acceptFile?: string;
  error?: ReactNode;
  oldFile?: {
    name: string;
    url: string;
  };
  value?: File;
};

export const UploadFile = memo(({ name, acceptFile, disabled, error, oldFile, ...props }: UploadFileProps) => {
  const styles = useStyles();

  const ref = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();

  const onClickUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (ref.current) {
      ref.current?.click();
    }
  };

  const filename = ref.current?.files
    ? Array.from(ref.current?.files)
        .map((file) => file.name)
        .join(", ")
    : "";

  return (
    <div
      className={
        error
          ? `${styles.inputUploadCont} ${styles.errorInput}`
          : `${disabled ? `${styles.inputUploadCont} ${styles.disabledCont}` : styles.inputUploadCont}`
      }
    >
      <div className={styles.inputCont}>
        <input
          accept={acceptFile}
          className={styles.inputNone}
          id={name}
          name={name}
          type="file"
          disabled={disabled}
          style={{ display: "none" }}
          ref={ref}
          {...props}
        />
        <label htmlFor={name} className={styles.uploadLabel}>
          <ButtonUI type="bordered" onClick={onClickUpload}>
            {t("buttons.upload", { ns: namespaces.catalog })}
          </ButtonUI>
          {filename && (
            <div className={error ? `${styles.inputUploadTitle} ${styles.errorTitle}` : styles.inputUploadTitle}>
              {filename}
            </div>
          )}
        </label>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {oldFile && (
        <a className={styles.fileName} target="blank" href={oldFile.url}>
          {oldFile.name}
        </a>
      )}
    </div>
  );
});

InputUI.TextArea = Input.TextArea;
InputUI.Password = Password;
InputUI.Search = Search;
InputUI.Split = Split;
InputUI.Number = NumberInput;
InputUI.Phone = Phone;
InputUI.CardPan = CardPan;
InputUI.CardExpiry = CardExpiry;
InputUI.UploadFile = UploadFile;
InputUI.Masked = Masked;

export { InputUI };
