import { GenericResult, ResultCommonLogic, Result } from '../common/Result';

describe('GenericResult string Test ', () => {
  it('should create an Ok result', () => {
      const result: GenericResult<String> = GenericResult.Ok<string>('test');
    expect( result.IsSuccess).toBeTruthy();
  });
  it('should create a failed result', () => {
    const result: GenericResult<String> = GenericResult.Fail<string>('test');
  expect( result.IsFailure).toBeTruthy();
});
});


describe('ResultCommonLogic  Test ', () => {
    // it('should throw error', () => {
    //     // const result: ResultCommonLogic = new ResultCommonLogic(false, null);
    //     expect(new ResultCommonLogic(true, 'No error allowed on success!')).toThrowError('There should be no error message for success.');
    // });
    it('should create an instance', () => {
        const result: ResultCommonLogic = new ResultCommonLogic(false, null);
        expect(result).toBeTruthy();
    });
});
describe('GenericResult  Test ', () => {
    it('should create a failed result', () => {
        const result: GenericResult<string> = GenericResult.Fail<string>('Failed');
        console.log(result);
        expect(result.Error).toBe('Failed');
    });
});

