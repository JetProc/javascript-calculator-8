export const INFORMATION_MESSAGE = {
  START: `덧셈할 문자열을 입력해 주세요.\n`,
  RESULT: `결과 : `,
};

export const ERROR_MESSAGE = {
  CUSTOM_SEPERATOR_MUST_BE_CLOSED: '[ERROR] 커스텀 구분자의 닫는 문자열이 필요합니다.',
  SEPERATOR_MUST_EXIST: '[ERROR] 구분자는 최소 한 개 이상 있어야 합니다.',
  VALUE_MUST_BE_NUMBER: '[ERROR] 구분자를 제외하고 숫자가 아닌 값이 포함되어 있습니다.',
  VALUE_MUST_BE_POSITIVE: '[ERROR] 숫자는 양수만 입력되어야 합니다.',
  CUSTOM_SEPARATOR_MUST_EXIST: '[ERROR] 커스텀 구분자는 비어있을 수 없습니다.',
  CUSTOM_SEPARATOR_MUST_BE_CHARACTER: '[ERROR] 커스텀 구분자는 문자만 입력되어야 합니다.',
};

export const DEFAULT_SEPRATOR = [',', ':'];

export const CONSTANT_CHAR = {
  CUSTOM_SEPERATOR_START_MARK: '//',
  CUSTOM_SEPARATOR_END_MARK: '\\n',
};
