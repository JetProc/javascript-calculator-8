import { Console } from '@woowacourse/mission-utils';

import { INFORMATION_MESSAGE, ERROR_MESSAGE } from './constants.js';

class App {
	async run() {
		try {
			let seperatorList = [',', ':'];

			const INPUT_STRING = await Console.readLineAsync(INFORMATION_MESSAGE.START);

			const FIND_CUSTOM_SEPERATOR_REGEX = /^\/\/(.*?)\\n/;
			const CUSTOM_SEPERATOR = INPUT_STRING.match(FIND_CUSTOM_SEPERATOR_REGEX)?.[1];

			let originalString = INPUT_STRING;

			if (CUSTOM_SEPERATOR) {
				const CUSTOM_SEPERATOR_LENGTH = CUSTOM_SEPERATOR.length;
				seperatorList.push(CUSTOM_SEPERATOR);
				originalString = INPUT_STRING.slice(CUSTOM_SEPERATOR_LENGTH + 4);
			}

			const JOINED_SEPERATOR = seperatorList.join('');
			const SEPERATOR_SPLIT_REGEX = new RegExp(`[${JOINED_SEPERATOR}]`);

			const SPLIT_LIST = originalString.split(SEPERATOR_SPLIT_REGEX);
		} catch (error) {
			throw error;
		}
	}
}

export default App;
