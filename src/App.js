import { Console } from '@woowacourse/mission-utils';

import { INFORMATION_MESSAGE, ERROR_MESSAGE } from './constants.js';

class App {
	async run() {
		try {
			const INPUT_STRING = await Console.readLineAsync(INFORMATION_MESSAGE.START);
		} catch (error) {
			Console.print(error);
		}
	}
}

export default App;
