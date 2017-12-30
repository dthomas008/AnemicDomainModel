import { Dollars } from './Dollars';
import { GenericResult } from '../common/Result';

describe('Dollars Test ', () => {
    it('should create one dollar', () => {
        const dollar: GenericResult<Dollars> = Dollars.Create(1.00);
        expect(dollar.IsSuccess).toBe(true);
        expect(dollar.Value.Value).toBe(1.00);
    });
    // it('should fail to create invalid amount of cents ', () => {
    //     const dollar: GenericResult<Dollars> = Dollars.Create(1.11111);
    //     expect(dollar.IsFailure).toBe(true);

    // });
    it('should fail to create negative dollars ', () => {
        const dollar: GenericResult<Dollars> = Dollars.Create(-1.0);
        expect(dollar.IsFailure).toBe(true);
    });
    it('should create two dollars ', () => {
        const dollar: Dollars = Dollars.Of(2.0);
        expect(dollar.Value).toBe(2.0);
    });
});
