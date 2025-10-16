import { Console } from '@woowacourse/mission-utils';

import { INFORMATION_MESSAGE, ERROR_MESSAGE, DEFAULT_SEPRATOR, CONSTANT_CHAR } from './constants.js';

import { GENERATE_FIND_CUSTOM_SEPERATOR_REGEX, GENERATE_SEPERATOR_SPLIT_REGEX } from './utils.js';

import {
  isInputExist,
  isValueNumber,
  isValuePositiveNumber,
  hasInputSeparator,
  isCustomSeperatorExist,
  isCustomSeperatorChar,
  hasInputCustomSeparatorStartMarkOnly,
} from './validation.js';

class App {
  constructor() {
    this.input = '';
    this.seperatorList = DEFAULT_SEPRATOR;
    this.sum = 0;
  }

  async run() {
    try {
      await this.enterInput();
      this.main();
      this.printResult();
    } catch (error) {
      Console.print(error);
    }
  }

  async enterInput() {
    this.input = await Console.readLineAsync(INFORMATION_MESSAGE.START);
  }

  main() {
    //공백만 입력했을 때도 0이 출력 되게
    this.input = this.input.trim();

    // 입력 문자열 예외처리 1
    if (!isInputExist(this.input)) return;

    this.findCustomSeperator();

    this.validateInputString();

    const NUMBER_LIST = this.getNumberList();

    this.sum = NUMBER_LIST.reduce((acc, cur) => acc + cur, 0);
  }

  printResult() {
    Console.print(`${INFORMATION_MESSAGE.RESULT}${this.sum}`);
  }

  findCustomSeperator() {
    const CUSTOM_SEPERATOR_INFORMATION = this.findCustomSeperatorMark();

    if (CUSTOM_SEPERATOR_INFORMATION) {
      // 구분자 예외처리 3 (trim)
      const CUSTOM_SEPERATOR = CUSTOM_SEPERATOR_INFORMATION[1]?.trim();

      this.validateCustomSeperator(CUSTOM_SEPERATOR);

      this.seperatorList.push(CUSTOM_SEPERATOR);

      this.input = this.input.slice(CUSTOM_SEPERATOR.length + 4);
    }
  }

  findCustomSeperatorMark() {
    const FIND_CUSTOM_SEPERATOR_REGEX = GENERATE_FIND_CUSTOM_SEPERATOR_REGEX(
      CONSTANT_CHAR.CUSTOM_SEPERATOR_START_MARK,
      CONSTANT_CHAR.CUSTOM_SEPARATOR_END_MARK
    );
    return this.input.match(FIND_CUSTOM_SEPERATOR_REGEX);
  }

  getNumberList() {
    const SPLIT_LIST = this.seperateInputString();
    this.validateType(SPLIT_LIST);
    return SPLIT_LIST.map(Number);
  }

  seperateInputString() {
    const SEPERATOR_SPLIT_REGEX = GENERATE_SEPERATOR_SPLIT_REGEX(this.seperatorList);
    const SPLIT_LIST = this.input.split(SEPERATOR_SPLIT_REGEX);

    return SPLIT_LIST.map((value) => value.trim());
  }

  validateCustomSeperator(customSeperator) {
    // 구분자 예외처리 1
    if (!isCustomSeperatorExist(customSeperator)) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_EXIST);
    }

    // 구분자 예외처리 2
    if (!isCustomSeperatorChar(customSeperator)) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_MUST_BE_CHARACTER);
    }
  }

  validateInputString() {
    // 입력 문자열 예외처리 2
    if (
      this.input.startsWith(CONSTANT_CHAR.CUSTOM_SEPERATOR_START_MARK) &&
      hasInputCustomSeparatorStartMarkOnly(this.input)
    ) {
      throw new Error(ERROR_MESSAGE.CUSTOM_SEPERATOR_MUST_BE_CLOSED);
    }
    // 입력 문자열 예외처리 3
    if (!hasInputSeparator(this.input, this.seperatorList)) {
      throw new Error(ERROR_MESSAGE.SEPERATOR_MUST_EXIST);
    }
  }

  validateType(numberList) {
    // 자료형 예외처리 1 && 2
    if (!isValueNumber(numberList)) {
      throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_NUMBER);
    }

    // 자료형 예외처리 3
    if (!isValuePositiveNumber(numberList)) {
      throw new Error(ERROR_MESSAGE.VALUE_MUST_BE_POSITIVE);
    }
  }
}

export default App;
