import React, { useState, useEffect } from "react";
import PinInput from "react-pin-input";
import { Statistic, Alert } from "antd";

import { useStyles } from "./styles";
import { $colors } from "#styles/variables";
import { SMS_CODE_SIZE } from "#constants/index";

const { Countdown } = Statistic;

export const SmsCodeField = (props) => {
  const {
    className = "",
    codeSize = SMS_CODE_SIZE,
    timerSeconds = 60,
    onChange,
    error,
    countDownActive,
    onTimerFinish,
    onResendClick,
    $resendKey,
    inputStyle = {},
    smsSentText = false,
  } = props;

  const classes = useStyles(props);

  const [pinCodeComplete, setPinCodeComplete] = useState(false);

  const [deadline, setDeadline] = useState<{ time: number | null }>({
    time: null,
  });

  useEffect(() => {
    if (countDownActive) {
      setDeadline({
        time: Date.now() + ((2000 * timerSeconds) / 60) * 10 * 6,
      });
    }
  }, [countDownActive]);

  const onSmsCodeChange = (value) => {
    onChange(value);

    if (value.length === codeSize) {
      setPinCodeComplete(true);
    } else {
      setPinCodeComplete(false);
    }
  };

  const onComplete = (value) => {
    onSmsCodeChange(value);
  };

  const onResendHandler = () => {
    if (!$resendKey || !$resendKey.loading) {
      onResendClick();
    }
  };

  return (
    <>
      <div
        className={`${classes.pinCode} ${pinCodeComplete ? classes.pinCodeComplete : ""} ${
          error ? classes.pinCodeError : ""
        } ${className}`}
      >
        <PinInput
          length={codeSize}
          initialValue=""
          type="numeric"
          inputStyle={{
            borderColor: "#d9d9d9",
            width: "52px",
            height: "48px",
            margin: "0 16px 0 0",
            ...inputStyle,
          }}
          inputFocusStyle={{ borderColor: $colors.primary }}
          onChange={onSmsCodeChange}
          onComplete={onComplete}
        />
      </div>
      {smsSentText && (
        <Alert
          className={classes.alert}
          message={
            <>
              <div>{smsSentText}</div>
              {deadline.time !== null && (
                <Countdown
                  className={classes.pinCodeTime}
                  title="Срок действия кода"
                  value={deadline.time}
                  format="mm:ss"
                  onFinish={onTimerFinish}
                />
              )}
            </>
          }
          type="info"
          showIcon
        />
      )}
    </>
  );
};
