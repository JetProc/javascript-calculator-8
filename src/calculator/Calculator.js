import CalculatorParser from './CalculatorParser.js';
import { validateInputString, validateEmptyInput } from '../validate/validators.js';
import { sumNumbers } from '../services/NumberService.js';

class Calculator {
  calculate(inputString) {
    const trimmedInput = inputString.trim();
    if (!validateEmptyInput(trimmedInput)) return 0;

    validateInputString(trimmedInput);

    const numberList = CalculatorParser.parse(trimmedInput);

    return sumNumbers(numberList);
  }
}

export default Calculator;
