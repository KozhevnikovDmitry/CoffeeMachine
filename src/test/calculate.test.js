import calculate from '../store/calculate'
import coins from '../store/coins'
import each from 'jest-each';

test("coins return correct set of coins", () => {
    // arrange              
    const oneCoin = 1;
    const twoCoin = 2;
    const fiveCoin = 3;
    const tenCoin = 4;

    // act
    const bank = coins(oneCoin, twoCoin, fiveCoin, tenCoin);

    // assert
    expect(bank.oneCoin).toBe(oneCoin);
    expect(bank.twoCoin).toBe(twoCoin);
    expect(bank.fiveCoin).toBe(fiveCoin);
    expect(bank.tenCoin).toBe(tenCoin);
});

test("calculate returns hasChange true and empty change, when rest equals 0", () => {
    // arrange
    const bank = coins(0, 0, 0, 0)
    const cache = coins(0, 0, 0, 0)

    // act
    const result = calculate(bank, cache, 0)

    // assert
    expect(result.change.oneCoin).toBe(0);
    expect(result.change.twoCoin).toBe(0);
    expect(result.change.fiveCoin).toBe(0);
    expect(result.change.tenCoin).toBe(0);
    expect(result.hasChange).toBe(true);

});

test("calculate returns sum of bank and change, when rest equals 0", () => {
    // arrange
    const bank = coins(1, 2, 3, 4)
    const cache = coins(5, 6, 7, 8)

    // act
    const result = calculate(bank, cache, 0)

    // assert
    expect(result.updatedBank.oneCoin).toBe(6);
    expect(result.updatedBank.twoCoin).toBe(8);
    expect(result.updatedBank.fiveCoin).toBe(10);
    expect(result.updatedBank.tenCoin).toBe(12);
    expect(result.hasChange).toBe(true);
});

each([
    [-10, /*bank*/coins(0, 0, 2, 1), /*cache*/coins(0, 0, 0, 0), /*change*/coins(0, 0, 0, 1)],
    [-10, /*bank*/coins(0, 0, 2, 0), /*cache*/coins(0, 0, 0, 1), /*change*/coins(0, 0, 0, 1)],
    [-20, /*bank*/coins(0, 0, 2, 1), /*cache*/coins(0, 0, 0, 0), /*change*/coins(0, 0, 2, 1)],
    [-20, /*bank*/coins(0, 0, 1, 0), /*cache*/coins(0, 0, 1, 1), /*change*/coins(0, 0, 2, 1)],
    [10, /*bank*/coins(10, 0, 0, 0), /*cache*/coins(0, 0, 0, 1), /*change*/coins(10, 0, 0, 0)]
]).test("calculate returns change with most valuable coins from bank and cache", 
    (money, bank, cache, change) => {
        // act
        const result = calculate(bank, cache, money)

        // assert
        expect(result.change.oneCoin).toBe(change.oneCoin);
        expect(result.change.twoCoin).toBe(change.twoCoin);
        expect(result.change.fiveCoin).toBe(change.fiveCoin);
        expect(result.change.tenCoin).toBe(change.tenCoin);        
        expect(result.hasChange).toBe(true);
    });

each([
    [-10, /*bank*/coins(1, 1, 2, 1), /*cache*/coins(1, 1, 0, 0), /*updatedBank*/coins(2, 2, 2, 0)],
    [-10, /*bank*/coins(1, 1, 2, 0), /*cache*/coins(1, 1, 0, 1), /*updatedBank*/coins(2, 2, 2, 0)],
    [-10, /*bank*/coins(0, 0, 5, 0), /*cache*/coins(0, 0, 5, 0), /*updatedBank*/coins(0, 0, 8, 0)],
]).test("calculate returns consolidated bank ,that includes given bank and cache, but excludes change", 
    (money, bank, cache, updatedBank) => {
        // act
        const result = calculate(bank, cache, money)

        // assert
        expect(result.updatedBank.oneCoin).toBe(updatedBank.oneCoin);
        expect(result.updatedBank.twoCoin).toBe(updatedBank.twoCoin);
        expect(result.updatedBank.fiveCoin).toBe(updatedBank.fiveCoin);
        expect(result.updatedBank.tenCoin).toBe(updatedBank.tenCoin);
    });

each([
    [-10, /*bank*/coins(0, 0, 0, 0), /*cache*/coins(0, 0, 0, 0)],
    [-10, /*bank*/coins(1, 1, 1, 0), /*cache*/coins(0, 0, 0, 0)],
    [-20, /*bank*/coins(1, 0, 0, 0), /*cache*/coins(0, 1, 1, 0)]
]).test("calculate returns hasChange false, when there are not enough coins to pay change", 
    (money, bank, cache) => {
        // act
        const result = calculate(bank, cache, money)

        // assert
        expect(result.hasChange).toBe(false);
    });
