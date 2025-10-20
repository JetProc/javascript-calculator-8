import CalculatorParser from './CalculatorParser.js';
import { validateEmptyInput } from '../validate/validators.js';
import { sumNumbers } from '../services/NumberService.js';

class Calculator {
  calculate(inputString) {
    const trimmedInput = inputString.trim();
    if (!validateEmptyInput(trimmedInput)) return 0;

    const numberList = CalculatorParser.parse(trimmedInput);

    return sumNumbers(numberList);
  }
}

export default Calculator;
