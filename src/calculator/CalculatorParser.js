import { parseCustomSeparator } from '../services/SeparatorService.js';
import { extractNumbers } from '../services/NumberService.js';

export function parse(inputString) {
  const { separators, numberString } = parseCustomSeparator(inputString);
  const numberList = extractNumbers(numberString, separators);
  return numberList;
}

export default { parse };
