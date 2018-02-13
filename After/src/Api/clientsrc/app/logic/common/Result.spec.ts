import { GenericResult,  Result } from '../common/Result';

// describe('ResultCommonLogic  Test ', () => {
//     it('should create a success instance', () => {
//         const result: ResultCommonLogic = new ResultCommonLogic(false, null);
//         expect(result.IsSuccess).toBe(true);
//     });
//     it('should create a failed instance', () => {
//         const result: ResultCommonLogic = new ResultCommonLogic(true, 'Error');
//         expect(result.IsFailure).toBe(true);
//     });
// });
describe('GenericResult string Test ', () => {
    it('should create a failed result', () => {
        const result: GenericResult<string> = GenericResult.Fail<string>('Failed');
        console.log(result);
        expect(result.Error).toBe('Failed');
        expect(result.IsFailure).toBe(true);
    });
    it('should create an Ok result', () => {
        const result: GenericResult<string> = GenericResult.Ok<string>('Passed');
        console.log(result);
        expect(result.IsSuccess).toBe(true);
    });
});

describe('Result string Test ', () => {
    it('should create a failed result', () => {
        const result: Result = Result.Fail('Failed');
        console.log(result);
        expect(result.Error).toBe('Failed');
        expect(result.IsFailure).toBe(true);
    });
    it('should create an Ok result', () => {
        const result: Result = Result.Ok();
        console.log(result);
        expect(result.IsSuccess).toBe(true);
    });
});

