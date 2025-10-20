import { SEPARATORS, CONSTANT_CHAR } from '../constants/index.js';
import { GENERATE_FIND_CUSTOM_SEPARATOR_REGEX } from '../utils/regexUtils.js';
import { validateInputString, validateCustomSeparator } from '../validate/validators.js';

export function parseCustomSeparator(input) {
  validateInputString(input);

  const customSeparatorInfo = findCustomSeparatorMark(input);

  if (customSeparatorInfo) {
    const fullMatchString = customSeparatorInfo[0];
    const customSeparator = customSeparatorInfo[1]?.trim();

    validateCustomSeparator(customSeparator);

    const remainingInput = input.slice(fullMatchString.length);

    return {
      separators: [...SEPARATORS, customSeparator],
      numberString: remainingInput,
    };
  }

  return { separators: SEPARATORS, numberString: input };
}

export function findCustomSeparatorMark(input) {
  const FIND_CUSTOM_SEPARATOR_REGEX = GENERATE_FIND_CUSTOM_SEPARATOR_REGEX(
    CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK,
    CONSTANT_CHAR.CUSTOM_SEPARATOR_END_MARK
  );
  return input.match(FIND_CUSTOM_SEPARATOR_REGEX);
}
