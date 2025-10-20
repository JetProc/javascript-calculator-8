import { CONSTANT_CHAR } from '../constants/index.js';
import {
  GENERATE_FIND_CUSTOM_SEPARATOR_START_MARK_ONLY_REGEX,
  GENERATE_CUSTOM_SEPARATOR_IS_CHAR_REGEX,
} from '../utils/regexUtils.js';

// 자료형 관련 조건 확인
export function isAllNumber(list) {
  return list.every((value) => value !== '' && !isNaN(value));
}

export function isAllPositiveNumber(list) {
  return list.every((value) => Number(value) > 0);
}

// 커스텀 구분자 관련 조건 확인
export function hasInputCustomSeparatorStartMarkOnly(input) {
  const REGEX = GENERATE_FIND_CUSTOM_SEPARATOR_START_MARK_ONLY_REGEX(
    CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK,
    CONSTANT_CHAR.CUSTOM_SEPARATOR_END_MARK
  );
  return REGEX.test(input);
}

export function isCustomSeparatorExist(customSeparator) {
  return customSeparator?.length > 0;
}

export function isCustomSeparatorChar(customSeparator) {
  const REGEX = GENERATE_CUSTOM_SEPARATOR_IS_CHAR_REGEX();
  return REGEX.test(customSeparator);
}
