let $colors = {
  primary: "#6b6b88",
  primaryBlue: "#155EEF",
  primaryLight: "#7e7e99",
  purple: "#7A5AF8",
  secondary: "#F8F9FC",
  aPay: "#00BFDA",
  dark: "#1D1B33",
  info: "#00BFDA",
  grey: "#667085",
  success: "#16B364",
  textColor: "#344054",
  inputColor: "#000",
  inputBorderColor: "#D0D5DD",
  danger: "#d11919",
  bodyColor: "#F9FAFB",
  orange: "#e3a008",
  readOnlyBg: "#FCFCFC",
  gradientAuth:
    "linear-gradient(95.08deg, #155EEF 2.49%, #165EEF 10.13%, #175FEF 17.2%, #1860F0 23.79%, #1A62F0 29.99%, #1D64F1 35.88%, #2066F2 41.55%, #2469F3 47.09%, #296CF4 52.58%, #2D70F5 58.12%, #3274F7 63.8%, #3878F8 69.69%, #3E7DFA 75.88%, #4481FB 82.47%, #4B86FD 89.54%, #528BFF 97.19%)",
};

let $variables = {
  borderRadius: "8px",
  borderRadiusLarge: "12px",
  borderRadiusLargePlus: "18px",
};

let modifyVars = {
  "primary-color": $colors.primary,
  "info-color": $colors.info,
  "text-color": $colors.textColor,
  "input-color": $colors.inputColor,
  "heading-color": $colors.textColor,
  // "label-color":  $colors.textColor,
  "link-color": $colors.primary,
  "error-color": $colors.danger,
  "input-placeholder-color": "#8F92A8",
  "disabled-color": "#97A6BA",
  "alert-info-bg-color": "#EFF8FF",
  "alert-info-border-color": $colors.info,
  "alert-info-icon-color": $colors.primary,

  "height-base": "44px",
  "height-sm": "36px",
  "height-lg": "52px",

  "border-radius-base": $variables.borderRadius,

  "font-size-base": "14px",
  "form-item-label-font-size": "12px",
  "form-item-margin-bottom": "16px",

  "btn-font-weight": "600",
  "btn-text-shadow": "none",

  "border-color-base": $colors.inputBorderColor,
  "input-padding-horizontal": "14px",

  // "switch-height": "31px",
  // "switch-min-width": "56px",
  // "radio-size": "20px",
};

module.exports.modifyVars = modifyVars;
module.exports.$colors = $colors;
module.exports.$variables = $variables;
