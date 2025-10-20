import { Console } from '@woowacourse/mission-utils';
import { INFORMATION_MESSAGE } from './constants/index.js';
import Calculator from './calculator/Calculator.js';

class App {
  async run() {
    try {
      const input = await Console.readLineAsync(INFORMATION_MESSAGE.START);

      const calculator = new Calculator();

      const result = calculator.calculate(input);

      Console.print(`${INFORMATION_MESSAGE.RESULT}${result}`);
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
