import { E_GRANULARITY_TYPES, E_MOMENT_TYPES } from "#types/common";
import { dateFormatWithoutTime } from "#ui/datePickerPeriod";
import moment from "moment";
import numeral from "numeral";

const oneWeek = 604800000;
const oneMonth = 2629746000;
const day = 86400000;

export const formatPrice = (incomeNumber?: number, withFloat = false, hard = true): string => {
  const number = incomeNumber || 0;
  if (withFloat) {
    const calc = number.toString();

    if (hard) {
      return numeral(calc).format("0,0.00").replace(/,/g, " ");
    }

    return numeral(calc)
      .format(calc.includes(".") ? "0,0.00" : "0,0")
      .replace(/,/g, " ");
  } else {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }
};

// format input price
export const priceFormatter = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const priceParser = (value) => value?.replace(/\s?/g, "") as unknown as number;

export const formatPriceProduct = (price) => {
  const n = String(price),
    p = n.indexOf(".");

  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => (p < 0 || i < p ? `${m} ` : m));
};

export const formatWeight = (number = 0, withFloat = false, hard = true): string => {
  if (withFloat) {
    const calcArr = number.toString().match(/^-?\d+(?:\.\d{0,3})?/);
    if (calcArr) {
      if (hard) {
        return numeral(calcArr[0]).format("0,0.000").replace(/,/g, " ");
      }

      return numeral(calcArr[0])
        .format(calcArr[0].includes(".") ? "0,0.000" : "0,0")
        .replace(/,/g, " ");
    } else {
      return "";
    }
  } else {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }
};

export const formatNumber = (number = 0, withFloat = false): string => {
  if (withFloat) {
    return numeral(number).format("0,0.00").replace(/,/g, " ");
  } else {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }
};

export const getDigitsNums = (value: string) => {
  if (!value) return "";

  return value.replace(/[^\d]/g, "");
};

export const formatDate = (date: string) => {
  if (!date) return "";

  return moment(date).format("DD.MM.YYYY / HH:mm:ss");
};

export const formatDateWithoutSeconds = (date: string) => {
  if (!date) return "";

  return moment(date).format("DD.MM.YYYY / HH:mm");
};

export const formatOnlyDate = (date: string) => {
  return moment(date).format("DD.MM.YYYY");
};

export const formatOnlyTime = (date: string) => {
  return moment(date).format("HH:mm:ss");
};

export const replaceSpaces = (str: string, newChar = ""): string => {
  return str.replace(/\s/g, newChar);
};

export const cutMarkCode = (code: string): string => {
  return code.split(" ")[0];
};

const parseRightSide = (str: string) => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // @ts-ignore
    if (!isNaN(str[i])) {
      result = result + str[i];
    } else {
      break;
    }
  }

  return result;
};

export const formatPhoneNumber = (str: string) => {
  const cleaned = ("" + str).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }

  return null;
};

export const formatTin = (str: string) => {
  const cleaned = ("" + str).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return "";
};

export const formatBankAccountNumber = (str: string) => {
  const cleaned = ("" + str).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }

  return null;
};

export const safeParseDate = (date?: string) => {
  return typeof date === "string" ? moment(date) : date;
};

/* eslint-disable */
export const numberToString = (_number: number | string) => {
  var _arr_numbers: any = [];
  _arr_numbers[1] = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  _arr_numbers[2] = [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  _arr_numbers[3] = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  function number_parser(_num: string | number, _desc: number) {
    var _string = "";
    var _num_hundred = "";
    if (_num.toString().length == 3) {
      _num_hundred = _num.toString().substr(0, 1);
      _num = _num.toString().substr(1, 3);
      _string = _arr_numbers[3][_num_hundred] + " ";
    }
    if (Number(_num) < 20) _string += _arr_numbers[1][parseFloat(_num.toString())] + " ";
    else {
      var _first_num = _num.toString().substr(0, 1);
      var _second_num = _num.toString().substr(1, 2);
      _string += _arr_numbers[2][_first_num] + " " + _arr_numbers[1][_second_num] + " ";
    }
    switch (_desc) {
      case 0:
        var _last_num = parseFloat(_num.toString().substr(-1));
        if (_last_num == 1) _string += "сум";
        else if (_last_num > 1 && _last_num < 5) _string += "сума";
        else _string += "сумов";
        break;
      case 1:
        var _last_num = parseFloat(_num.toString().substr(-1));
        if (_last_num == 1) _string += "тысяча ";
        else if (_last_num > 1 && _last_num < 5) _string += "тысячи ";
        else _string += "тысяч ";
        _string = _string.replace("один ", "одна ");
        _string = _string.replace("два ", "две ");
        break;
      case 2:
        var _last_num = parseFloat(_num.toString().substr(-1));
        if (_last_num == 1) _string += "миллион ";
        else if (_last_num > 1 && _last_num < 5) _string += "миллиона ";
        else _string += "миллионов ";
        break;
      case 3:
        var _last_num = parseFloat(_num.toString().substr(-1));
        if (_last_num == 1) _string += "миллиард ";
        else if (_last_num > 1 && _last_num < 5) _string += "миллиарда ";
        else _string += "миллиардов ";
        break;
    }
    _string = _string.replace("  ", " ");
    return _string;
  }

  function decimals_parser(_num: number) {
    console.log("_num", _num);
    const _arr_numbers_with_null = _arr_numbers;
    _arr_numbers_with_null[1][0] = "ноль";
    _arr_numbers_with_null[2][0] = "ноль";

    // return (`${_arr_numbers_with_null[2][_num[0]]} ${_arr_numbers_with_null[1][_num[0]]}`)
    var _first_num = _num.toString().substr(0, 1);
    var _second_num = parseFloat(_num.toString().substr(1, 2));
    // var _string = " " + _first_num + _second_num;
    let _string = "";
    if (_num < 20) {
      _string += ` ${_arr_numbers[1][parseFloat(_num.toString())]}`;
    } else {
      _string =
        " " + `${_arr_numbers_with_null[2][_num.toString()[0]]} ${_arr_numbers_with_null[1][_num.toString()[1]]}`;
    }
    if (_second_num == 1) _string += " тийин";
    else if (_second_num > 1 && _second_num < 5) _string += " тийина";
    else _string += " тийин";
    return _string;
  }

  if (!_number || _number == 0) return false;

  if (typeof _number !== "number") {
    _number = (_number as string).toString().replace(",", ".");
    _number = parseFloat(_number.toString());
    if (isNaN(_number)) return false;
  }
  _number = _number.toFixed(2);
  if (_number.indexOf(".") != -1) {
    var _number_arr = _number.split(".");
    var _number: string | number = _number_arr[0];
    var _number_decimals = _number_arr[1];
  }
  var _number_length = _number.length;
  var _string = "";
  var _num_parser = "";
  var _count = 0;
  for (var _p = _number_length - 1; _p >= 0; _p--) {
    var _num_digit = _number.substr(_p, 1);
    _num_parser = _num_digit + _num_parser;
    if ((_num_parser.length == 3 || _p == 0) && !isNaN(parseFloat(_num_parser))) {
      _string = number_parser(_num_parser, _count) + _string;
      _num_parser = "";
      _count++;
    }
  }
  // @ts-ignore
  if (_number_decimals) _string += decimals_parser(_number_decimals);
  return _string;
};

export const inputNumberFormatter = (price = 0) => {
  const n = String(price),
    p = n.indexOf(".");

  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => (p < 0 || i < p ? `${m} ` : m));
};
/* eslint-enable */

export const defineGranularity = ({ from, to }: { from?: Date | string; to?: Date | string }) => {
  if (!from || !to) return E_GRANULARITY_TYPES.DAY;
  // @ts-ignore
  const diff = to.getTime() - from.getTime();
  if (diff <= 4 * day) return E_GRANULARITY_TYPES.HOUR;
  if (diff <= 8 * oneWeek) return E_GRANULARITY_TYPES.DAY;
  if (diff <= 5 * oneMonth) return E_GRANULARITY_TYPES.WEEK;
  return E_GRANULARITY_TYPES.MONTH;
};

export const cleanStringFromCharacters = (str: string): string => {
  return str.replace(/[^a-zA-Zа-яА-Я ]/g, "");
};

export const removeEmptyArrays = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return null;
    } else {
      return obj.map((element) => removeEmptyArrays(element));
    }
  } else if (typeof obj === "object" && obj !== null) {
    if (obj.hasOwnProperty("children")) {
      // @ts-ignore
      obj.children = removeEmptyArrays(obj.children);
    }
    return obj;
  } else {
    return obj;
  }
};

export const isNumeric = (x: string | number) => {
  if (typeof x == "string") {
    return false;
  }
  return !isNaN(x);
};

export const formatLocaleDateString = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatForGranularity = (granularity: string) => {
  switch (granularity) {
    case E_GRANULARITY_TYPES.HOUR:
      return "HH:mm";
    case E_GRANULARITY_TYPES.WEEK:
      return "YYYY WW";
    case E_GRANULARITY_TYPES.MONTH:
      return "MMMMMM";
    default:
      return dateFormatWithoutTime;
  }
};

export const getMomentTimeType = (granularity: string) => {
  return granularity === E_GRANULARITY_TYPES.HOUR ? E_MOMENT_TYPES.HOURS : E_MOMENT_TYPES.DAYS;
};

export const roundPrice = (number = 0): number => {
  return Number(number.toFixed(2));
};

export const DOT_DATE_FORMAT = "DD/MM/YYYY";
export const getFormattedDate = (date, dateFormat = DOT_DATE_FORMAT) => {
  if (!date) {
    return "-";
  }

  return moment(date).format(dateFormat);
};

export const inputFormatNumber = (number: number = 0): string => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export const formatStringNumber = (str = "") => {
  let newStr = "";

  str = str.replace(/,/g, ".");

  if (str.length) {
    const strWithoutSpaces = replaceSpaces(str);
    const sides = strWithoutSpaces.split(".");

    const leftSide = sides[0];
    const rightSide = sides[1];

    newStr = formatNumber(Number(leftSide) || 0);

    if (str.includes(".")) {
      newStr = newStr + ".";
    }

    if (rightSide) {
      const rightSideFormatted = parseRightSide(rightSide);

      if (rightSideFormatted) {
        newStr = newStr + rightSideFormatted;
      }
    }
  }

  return newStr;
};

export const formatDateWithTime = (date: string) => {
  if (!date) return "";

  return moment(date).format("DD.MM.YYYY / HH:mm:ss");
};

export const getUtcDate = (data?: string) => {
  return typeof data === "string" ? moment(data).utc(true) : moment().utc(true);
};
