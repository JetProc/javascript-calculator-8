import { Console } from '@woowacourse/mission-utils';
import { INFORMATION_MESSAGE } from './constants/index.js';
import StringCalculator from './StringCalculator.js';

class App {
  async run() {
    try {
      const input = await Console.readLineAsync(INFORMATION_MESSAGE.START);
      const calculator = new StringCalculator();
      const result = calculator.add(input);
      Console.print(`${INFORMATION_MESSAGE.RESULT}${result}`);
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
