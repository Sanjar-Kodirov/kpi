import { IFullNameModel } from "#businessLogic/models";
import { debounce } from "#utils/debounceLodash";

export const calculateVat = (sum: number, rate?: number) => {
  if (!rate) return 0;

  return Number(((sum * rate) / 100).toFixed(2));
};

export const allocateVat = (priceWithVat: number, rate = 0) => {
  return (priceWithVat * rate) / (100 + rate);
};

export const getAllocateVat = (price: number, vat = 0) => {
  const vatFormula = vat / 100 + 1;
  const res = price - price / vatFormula;

  return Number(res.toFixed(2));
};

export const wrapWithCode = <T extends string>(code: T) => {
  return { code };
};

export const wrapWithId = <T extends string | number>(id: T) => {
  return { id };
};

export const formDebounce = debounce(
  (action: () => void) => {
    action();
  },
  500,
  { leading: true, trailing: false },
);

export const getRestStr = (str: string, subStr: string) => {
  if (str.indexOf(subStr) > -1) {
    return str.slice(subStr.length);
  } else {
    return "";
  }
};

export const getFullName = (fullName?: IFullNameModel) => {
  if (!fullName) return "";

  return `${fullName.lastName} ${fullName.firstName} ${fullName.patronymic}`;
};

export const insertToArray = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

export const truncateString = (text: string, size: number) => {
  if (text.length > size + 3) {
    return text.substring(0, size).concat("...");
  }

  return text;
};

export const cn = (blockName: string) => {
  return (elemNames: any, modifierNames?: any, singles?: any) => {
    let base = blockName;

    if (elemNames) {
      base = `${base}__${elemNames.split(" ").join("__")}`;
    }

    if (modifierNames) {
      let resultWithModifiers = "";

      for (const prop in modifierNames) {
        let show = false;
        let single = false;

        if (typeof modifierNames[prop] == "object") {
          show = modifierNames[prop].show;
          single = modifierNames[prop].single;
        } else {
          show = modifierNames[prop];
        }

        if (show) {
          if (single) {
            resultWithModifiers += ` ${prop}`;
          } else {
            resultWithModifiers += ` ${base}_${prop}`;
          }
        }
      }

      base = `${base}${resultWithModifiers}`;
    }

    if (singles) {
      base = `${base} ${singles}`;
    }

    return base;
  };
};
