import { ERROR_MESSAGE, CONSTANT_CHAR } from '../constants/index.js';
import {
  isAllNumber,
  isAllPositiveNumber,
  isCustomSeparatorExist,
  isCustomSeparatorChar,
  hasInputCustomSeparatorStartMarkOnly,
} from './conditions.js';

// 입력 문자열 검증
export function validateEmptyInput(input) {
  return input.length > 0;
}

export function validateInputString(input) {
  if (input.startsWith(CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK) && hasInputCustomSeparatorStartMarkOnly(input)) {
    throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_BE_CLOSED);
  }
}

// 커스텀 구분자 검증
export function validateCustomSeparator(customSeparator) {
  if (!isCustomSeparatorExist(customSeparator)) {
    throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_EXIST);
  }
  if (!isCustomSeparatorChar(customSeparator)) {
    throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_BE_CHARACTER);
  }
}

// 자료형 검증
export function validateNumberTypes(list) {
  if (!isAllNumber(list)) {
    throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_NUMBER);
  }

  if (!isAllPositiveNumber(list)) {
    throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_POSITIVE);
  }
}
