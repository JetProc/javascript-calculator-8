const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function GENERATE_FIND_CUSTOM_SEPARATOR_REGEX(startMark, endMark) {
  const ESCAPED_START_MARK = escapeRegExp(startMark);
  const ESCAPED_END_MARK = escapeRegExp(endMark);

  const REGEX = `^${ESCAPED_START_MARK}(.*?)${ESCAPED_END_MARK}`;
  return new RegExp(REGEX);
}

export function GENERATE_FIND_CUSTOM_SEPARATOR_START_MARK_ONLY_REGEX(startMark, endMark) {
  const ESCAPED_START_MARK = escapeRegExp(startMark);
  const ESCAPED_END_MARK = escapeRegExp(endMark);

  const REGEX = `^${ESCAPED_START_MARK}[^${ESCAPED_END_MARK}]*$`;
  return new RegExp(REGEX);
}

export function GENERATE_SEPARATOR_SPLIT_REGEX(SEPARATORList) {
  const escapedSeparators = SEPARATORList.map(escapeRegExp);
  const REGEX_STRING = escapedSeparators.join('|');
  return new RegExp(REGEX_STRING);
}
