const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function GENERATE_FIND_CUSTOM_separator_REGEX(startMark, endMark) {
  const ESCAPED_START_MARK = escapeRegExp(startMark);
  const ESCAPED_END_MARK = escapeRegExp(endMark);

  const REGEX = `^${ESCAPED_START_MARK}(.*?)${ESCAPED_END_MARK}`;
  return new RegExp(REGEX);
}

export function GENERATE_FIND_CUSTOM_separator_START_MARK_ONLY_REGEX(startMark, endMark) {
  const ESCAPED_START_MARK = escapeRegExp(startMark);
  const ESCAPED_END_MARK = escapeRegExp(endMark);

  const REGEX = `^${ESCAPED_START_MARK}[^${ESCAPED_END_MARK}]*$`;
  return new RegExp(REGEX);
}

export function GENERATE_separator_SPLIT_REGEX(separatorList) {
  const JOINED_separator = separatorList.join('');
  return new RegExp(`[${JOINED_separator}]`);
}
