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
  test('기본 구분자(,)로 합산', async () => {
    const inputs = ['1,2,3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('기본 구분자(:)로 합산', async () => {
    const inputs = ['4:5:6'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 15'));
  });

  test('기본 구분자 혼합', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('공백 입력시 0 반환', async () => {
    const inputs = ['   '];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 0'));
  });

  test('숫자 하나만 입력', async () => {
    const inputs = ['7'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 7'));
  });

  test('여러 자리 수 입력', async () => {
    const inputs = ['10,20,30'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 60'));
  });

  test('숫자 사이에 공백 포함', async () => {
    const inputs = [' 1 , 2 : 3 '];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\n1;2;3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('커스텀 구분자와 기본 구분자 혼합', async () => {
    const inputs = ['//;\n1;2,3:4'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 10'));
  });

  test('커스텀 구분자 여러 자리(문자만 허용)', async () => {
    const inputs = ['//a\n1a2a3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('커스텀 구분자에 숫자 사용시 예외', async () => {
    const inputs = ['//1\n1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자 미닫힘 예외', async () => {
    const inputs = ['//;1;2;3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자 비어있음 예외', async () => {
    const inputs = ['//\n1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('숫자가 아닌 값 포함 예외', async () => {
    const inputs = ['1,2,a'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('음수 포함 예외', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('0 포함 예외', async () => {
    const inputs = ['0,1,2'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
