import calculate from "./calculate"
import { COFFEE_READY, COFFEE_BREWED} from "./messages"
import format from 'string-format'

/**
 * Getters of coffee machine vuex store 
 */
export default {
    
    /**
     * Returns amount of money that need to be put by client to get coffee
     * Can be negative, in this case, change must be returned 
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {Object} getters.coffee - chosen coffee
     * @param {number} getters.received - maney form client 
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     */
    rest(state, {coffee, received, coffeeRequested}) {
        if(coffeeRequested) {
            return coffee.cost - received;
        }
        else{
            return undefined;
        }
    },
    
    /**
     * Returns amount of money, put by client
     * @param {Object} state - app state
     * @param {Object} state.cache - coins, put by client
     */
    received({ cache }) {
        const {oneCoin, twoCoin, fiveCoin, tenCoin} = cache;
        return oneCoin + twoCoin * 2 + fiveCoin * 5 + tenCoin * 10;
    },
    
    /**
     * Indicates whether some coffee is requested
     * @param {Object} state - app state
     * @param {Object} state.coffees - all coffee positions in machine
     */
    coffeeRequested({ coffees }) {
        return coffees.filter(c => c.selected).length > 0
    },
    
    /**
     * Returns coffee, chosen by client
     * @param {Object} state - app state
     * @param {Object} state.coffees - all coffee positions in machine
     */
    coffee({ coffees }) { 
        return coffees.find(c => c.selected)
    },
    
    /**
     * Indicates, whether client put enouch money to get coffee
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     * @param {boolean} getters.rest - amount of money, need to get coffee
     */
    coffeePayed(state, { coffeeRequested, rest }) {
        if(coffeeRequested) {
            return rest <= 0;
        }
        else{
            return false;
        }
    },

    /**
     * Indicates, whether machine provided some change
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {Function} getters.hasCoinChange - is some change in certain coins
     */
    hasChange(state, { hasCoinChange }) {
        return hasCoinChange('oneCoin') || 
            hasCoinChange('twoCoin') || 
            hasCoinChange('fiveCoin') || 
            hasCoinChange('tenCoin');
    }, 
    
    /**
     * Indicates, whether machine contains enouch coins to provide change
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {Function} getters.calculateCoffee - calculate change method
     */
    canProvideChange(state, { calculateCoffee }) {
        return calculateCoffee().hasChange;
    },
    
    /**
     * Calculates change for coffee
     * Return updated state for bank and change
     * @param {Object} state - app state
     * @param {Object} state.cache - coins, put by client
     * @param {Object} state.bank - available coins in the machine
     * @param {Object} getters - store getters 
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     * @param {boolean} getters.coffeePayed - is there enough money to get coffee
     * @param {boolean} getters.rest - amount of money, need to get coffee
     */
    calculateCoffee({cache, bank}, { coffeeRequested, coffeePayed, rest }) {
        return () => {
            if(coffeeRequested && coffeePayed) {
                return calculate(bank, cache, rest);
            } else {
                return {
                    hasChange: false
                };
            }
        }
    },

    /**
     * Returns message, that certain coffee is ready
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     * @param {Object} getters.coffee - chosen coffee
     */
    coffeeReadyMessage(state, { coffeeRequested, coffee }) {
        return coffeeRequested? format(COFFEE_READY, coffee.name) : "";
    },

    /**
     * Returns message, that certain coffee will be ready soon
     * @param {Object} state - app state
     * @param {Object} getters - store getters 
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     * @param {Object} getters.coffee - chosen coffee
     */
    coffeeBrewedMessage(state, { coffee, coffeeRequested }) {
        return coffeeRequested? format(COFFEE_BREWED, coffee.name) : "";
    },
    
    /**
     * Returns function that indicates, whether machine provided change in certain coins
     */
    hasCoinChange: ({change}) => (coin) => {
        return change[coin] > 0;
    },   

    /**
     * Indicates, whether clien is allowed to put another coin
     * @param {Object} state - app state
     * @param {coffeeReady} getters.coffeeReady - is coffee ready
     * @param {coffeeBrewed} getters.coffeeBrewed - is coffee still brewed
     * @param {Object} getters - store getters  
     * @param {boolean} getters.coffeePayed - is there enough money to get coffee
     * @param {boolean} getters.coffeeRequested - is some coffee requested
     */
    canAddCoin({coffeeReady, coffeeBrewed}, {coffeePayed, coffeeRequested}) {
        return !coffeeReady && !coffeeBrewed && !coffeePayed && coffeeRequested;
    }
}