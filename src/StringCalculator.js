import { ERROR_MESSAGE, DEFAULT_SEPARATOR, CONSTANT_CHAR } from './constants/index.js';
import { GENERATE_FIND_CUSTOM_SEPARATOR_REGEX, GENERATE_SEPARATOR_SPLIT_REGEX } from './utils.js';
import {
  isInputExist,
  isValueNumber,
  isValuePositiveNumber,
  hasInputSeparator,
  isCustomSeparatorExist,
  isCustomSeparatorChar,
  hasInputCustomSeparatorStartMarkOnly,
} from './validation.js';

class StringCalculator {
  add(inputString) {
    const trimmedInput = inputString.trim();
    if (!isInputExist(trimmedInput)) return 0;

    const { separators, numberString } = this.#parseSeparators(trimmedInput);

    this.#validateInputString(numberString, separators);

    const numbers = this.#getNumbers(numberString, separators);

    return numbers.reduce((acc, cur) => acc + cur, 0);
  }

  #parseSeparators(input) {
    const customSeparatorInfo = this.#findCustomSeparatorMark(input);

    if (customSeparatorInfo) {
      const customSeparator = customSeparatorInfo[1]?.trim();
      this.#validateCustomSeparator(customSeparator);

      const remainingInput = input.slice(customSeparator.length + 4);
      return {
        separators: [...DEFAULT_SEPARATOR, customSeparator],
        numberString: remainingInput,
      };
    }

    return { separators: DEFAULT_SEPARATOR, numberString: input };
  }

  #findCustomSeparatorMark(input) {
    const FIND_CUSTOM_SEPARATOR_REGEX = GENERATE_FIND_CUSTOM_SEPARATOR_REGEX(
      CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK,
      CONSTANT_CHAR.CUSTOM_SEPARATOR_END_MARK
    );
    return input.match(FIND_CUSTOM_SEPARATOR_REGEX);
  }

  #getNumbers(numberString, separators) {
    const SEPARATOR_SPLIT_REGEX = GENERATE_SEPARATOR_SPLIT_REGEX(separators);
    const splitList = numberString.split(SEPARATOR_SPLIT_REGEX).map((value) => value.trim());

    this.#validateNumberTypes(splitList);

    return splitList.map(Number);
  }

  #validateCustomSeparator(customSeparator) {
    if (!isCustomSeparatorExist(customSeparator)) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_EXIST);
    }
    if (!isCustomSeparatorChar(customSeparator)) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_BE_CHARACTER);
    }
  }

  #validateInputString(input, separators) {
    if (input.startsWith(CONSTANT_CHAR.CUSTOM_SEPARATOR_START_MARK) && hasInputCustomSeparatorStartMarkOnly(input)) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_BE_CLOSED);
    }
  }

  #validateNumberTypes(numberList) {
    if (!isValueNumber(numberList)) {
      throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_NUMBER);
    }
    if (!isValuePositiveNumber(numberList)) {
      throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_POSITIVE);
    }
  }
}

export default StringCalculator;
