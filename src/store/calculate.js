import coins from './coins'

/**
 * Return quotient and remainder of devision amount of money by coin value
 * @param {number} money - amount of money, that need to be changed by coins
 * @param {nUmber} coin - nominal of coin
 */
const div = (money, coin) => {
   return { 
        quotient : Math.floor(money / coin),
        remainder : money % coin
    }
}

/**
 * Calculates change in coins of certain nominal
 * Returns updated bank coins, change coins and the rest amount of money, that needs to be changed
 * @param {Object} state - current calculation state  
 * @param {Object} state.bank - availabe bank of coins
 * @param {Object} state.change - change in coins
 * @param {number} state.money - amount of money, that needs to be changed
 * @param {number} coinValue - nominal of coin, e.g. 1, 2, 5, 10
 * @param {stirng} coinName - name of the coin, e.g. oneCoin, twoCoin
 */
const changeByCoin = ({bank, change, money },  coinValue, coinName) => {
    if(money === 0){
        return {bank, change, money }
    }

    const md = div(money, coinValue);
    const currentCoins = bank[coinName];
    const enoughCoins = currentCoins >= md.quotient;

    let updatedBank = {
        ...bank
    }
    updatedBank[coinName] = enoughCoins? currentCoins - md.quotient : 0;

    let updatedChange = {
        ...change
    }

    const coinChange = enoughCoins? md.quotient : currentCoins;
    updatedChange[coinName] = coinChange;

    return {
        bank: updatedBank,
        change: updatedChange,
        money: money - coinChange * coinValue
    }

}

/**
 * Calculates change for coffee
 * Returns updated bank of coins and change in coins and flag, that indicates, whether bank contains enough coins to provide change
 * @param {Object} bank - available bank of coins 
 * @param {Object} cache - coins put by a client
 * @param {number} rest - amount of money, that needs to be changed by coins
 */
const calculate = (bank, cache, rest) => {  
    const initialState = {
        bank : {
            oneCoin : bank.oneCoin + cache.oneCoin,
            twoCoin : bank.twoCoin + cache.twoCoin,
            fiveCoin : bank.fiveCoin + cache.fiveCoin,
            tenCoin : bank.tenCoin + cache.tenCoin,
        },
        change : coins(0, 0, 0, 0),
        money : -rest
    }

    let finalState = initialState;

    if (rest !== 0) {
        const try10 = changeByCoin(initialState, 10, "tenCoin");
        const try5 = changeByCoin(try10, 5, "fiveCoin");
        const try2 = changeByCoin(try5, 2, "twoCoin");
        finalState = changeByCoin(try2, 1, "oneCoin");
    }

    return {
        updatedBank: finalState.bank,
        change: finalState.change,
        hasChange: finalState.money === 0
    };
}

export default calculate;