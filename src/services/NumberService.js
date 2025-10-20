import { GENERATE_SEPARATOR_SPLIT_REGEX } from '../utils/regexUtils.js';
import { validateNumberTypes } from '../validate/validators.js';

export function extractNumbers(numberString, separators) {
  const SEPARATOR_SPLIT_REGEX = GENERATE_SEPARATOR_SPLIT_REGEX(separators);

  const splitList = numberString.split(SEPARATOR_SPLIT_REGEX).map((value) => value.trim());

  validateNumberTypes(splitList);

  return splitList.map(Number);
}

export function sumNumbers(numberList) {
  return numberList.reduce((acc, cur) => acc + cur, 0);
}
