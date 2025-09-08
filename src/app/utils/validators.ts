export const validateBarcodeCode = (code: string) => {
  const codeLength = code.length;

  return codeLength >= 5 && codeLength <= 14;
};

export const validateAggregationCode = (code: string) => {
  const codeLength = code.length;

  return codeLength >= 18 && codeLength <= 22;
};
export const validateMarkCode = (code: string) => {
  const codeLength = code.length;

  return codeLength >= 28;
};

export const validatePhoneNumber = (phoneNumber: string) => phoneNumber.length === 12;
export const validatePan = (num: string) => num.length === 16;
export const validateExpiry = (num: string) => num.length === 4;

export const validateBarcode = (barcode: number) => !isNaN(barcode);
export const validateVatBarcode = (barcode: string) => barcode.length === 17;

export const validateCommittentTin = (tin: string) => tin.length === 9 || tin.length === 14;
