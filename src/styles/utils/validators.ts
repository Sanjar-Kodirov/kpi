import { UZB_PHONE_LENGTH } from "#constants/index";

export const validatePinfl = (pin) => pin.length === 14;
export const validatePhoneNumber = (phoneNumber) => phoneNumber?.length === UZB_PHONE_LENGTH;
export const validateBankAccountNumber = (number) => number.length === 20;
export const validateOked = (number) => number.length === 5;
