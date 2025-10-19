import { GENERATE_FIND_CUSTOM_SEPARATOR_START_MARK_ONLY_REGEX } from './utils.js';
import { CONSTANT_CHAR } from './constants/index.js';

export function isInputExist(inputString) {
  return inputString.length > 0;
}

export function isValueNumber(numberList) {
  return numberList.every((value) => value !== '' && !isNaN(value));
}

export function isValuePositiveNumber(numberList) {
  return numberList.every((value) => Number(value) > 0);
}

export function hasInputSeparator(inputString, separatorList) {
  return separatorList.some((separator) => inputString.includes(separator));
}

export function isCustomSeparatorExist(customseparator) {
  return customseparator?.length > 0;
}

export function isCustomSeparatorChar(customseparator) {
  return isNaN(customseparator);
}

export function hasInputCustomSeparatorStartMarkOnly(inputString) {
  const REGEX = GENERATE_FIND_CUSTOM_SEPARATOR_START_MARK_ONLY_REGEX(
    CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK,
    CONSTANT_CHAR.CUSTOM_SEPARATOR_END_MARK
  );
  return REGEX.test(inputString);
}
