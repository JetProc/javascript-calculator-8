import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  let logSpy;
  let app;

  beforeEach(() => {
    logSpy = getLogSpy();
    app = new App();
  });

  const successCases = [
    { inputs: ['1,2,3'], output: '결과 : 6', name: '기본 구분자(,)로 합산' },
    { inputs: ['4:5:6'], output: '결과 : 15', name: '기본 구분자(:)로 합산' },
    { inputs: ['1,2:3'], output: '결과 : 6', name: '기본 구분자 혼합' },
    { inputs: ['   '], output: '결과 : 0', name: '공백 입력시 0 반환' },
    { inputs: [''], output: '결과 : 0', name: '공백 입력시 0 반환' },
    { inputs: ['7'], output: '결과 : 7', name: '숫자 하나만 입력' },
    { inputs: ['0.4,0.6,0.25'], output: '결과 : 1.25', name: '소수점 입력' },
    { inputs: [' 1 , 2 : 3 '], output: '결과 : 6', name: '숫자 사이에 공백 포함' },
    { inputs: ['//;\\n1;2;3'], output: '결과 : 6', name: '커스텀 구분자 사용' },
    { inputs: ['//;\\n1;2,3:4'], output: '결과 : 10', name: '커스텀 구분자와 기본 구분자 혼합' },
    { inputs: ['//a\\n1a2a3'], output: '결과 : 6', name: '한 글자 커스텀 구분자(문자만)' },
    { inputs: ['//abc\\n1abc2abc3'], output: '결과 : 6', name: '여러 글자 커스텀 구분자(문자만)' },
    { inputs: ['//!@\\n1!@2!@3'], output: '결과 : 6', name: '커스텀 구분자 특수문자' },
    { inputs: ['//\\\\\\n1\\\\2\\\\3'], output: '결과 : 6', name: '커스텀 구분자 역슬래시' },
    { inputs: ['123'], output: '결과 : 123', name: '구분자 없이 여러 자리수' },
    { inputs: ['1.23'], output: '결과 : 1.23', name: '구분자 없이 소수점' },
  ];

  successCases.forEach(({ inputs, output, name }) => {
    test(name, async () => {
      mockQuestions([...inputs]);
      await app.run();
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  const errorCases = [
    {
      inputs: ['//1\\n1,2,3'],
      name: '커스텀 구분자에 숫자 사용시 예외',
      message: '[ERROR] 커스텀 구분자는 문자만 입력되어야 합니다.',
    },
    {
      inputs: ['//;1;2;3'],
      name: '커스텀 구분자 미닫힘 예외',
      message: '[ERROR] 커스텀 구분자의 닫는 문자열이 필요합니다.',
    },
    {
      inputs: ['//\\n1,2,3'],
      name: '커스텀 구분자 비어있음 예외',
      message: '[ERROR] 커스텀 구분자는 비어있을 수 없습니다.',
    },
    {
      inputs: ['//  \\n'],
      name: '커스텀 구분자 비어있음 예외',
      message: '[ERROR] 커스텀 구분자는 비어있을 수 없습니다.',
    },
    {
      inputs: ['//\\n\\n1\\n2\\n3'],
      name: '커스텀 구분자에 이스케이프 문자(\\n) 포함',
      message: '[ERROR] 커스텀 구분자는 비어있을 수 없습니다.',
    },
    {
      inputs: ['1,2,a'],
      name: '숫자가 아닌 값 포함 예외',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
    { inputs: ['-1,2,3'], name: '음수 포함 예외', message: '[ERROR] 숫자는 양수만 입력되어야 합니다.' },
    { inputs: ['0,1,2'], name: '0 포함 예외', message: '[ERROR] 숫자는 양수만 입력되어야 합니다.' },
    {
      inputs: ['//a1\\n1a12a13'],
      name: '커스텀 구분자에 숫자 포함',
      message: '[ERROR] 커스텀 구분자는 문자만 입력되어야 합니다.',
    },
    {
      inputs: ['1,,2::3'],
      name: '구분자 연속',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
    {
      inputs: [',,,'],
      name: '구분자만 입력',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
    {
      inputs: ['1,2,3,'],
      name: '구분자로 끝남',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
    {
      inputs: [',1,2,3'],
      name: '구분자로 시작',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
    {
      inputs: ['a,b,c'],
      name: '숫자 아닌 문자만 입력',
      message: '[ERROR] 잘못된 입력값입니다.',
    },
  ];

  errorCases.forEach(({ inputs, name, message }) => {
    test(name, async () => {
      mockQuestions([...inputs]);
      await expect(app.run()).rejects.toThrow(message);
    });
  });
});
