import coins from "./coins";
import * as m from './mutation-types'

export default {
    /**
     * Sets chosen coffee
     * @param {Object} state - app state
     * @param {number} index - index of chosen coffee position 
     */
    [m.CHOOSE_COFFEE] (state, index) {
        for (let i = 0; i < state.coffees.length; i++) {
            state.coffees[i].selected = i === index
        }
    },

    /**
     * Sets name and image of coffee, provided to client
     * @param {Object} state - app state
     * @param {Object} coffee - coffee for client
     * @param {string} coffee.name - name of the provided coffee
     * @param {string} coffee.image - path to image for provided coffee
     */
    [m.SET_OUTPUT_COFFEE] (state, {name, image}){
        state.outputCoffee = {
            name,
            image
        }
    },

    /**
     * Removes output coffee
     * @param {Object} state - app state
     */
    [m.TAKE_COFFEE] (state){
        state.outputCoffee = undefined
    },

    /**
     * Adds coin to set of coins, provided by client
     * @param {Object} state - app state
     * @param {string} coin - name of the put coin, e.g. oneCoin, twoCoin
     */
    [m.PUT_COIN] (state, coin) {
        state.cache[coin]++;
    },

    /**
     * Moves coins from cache to change
     * @param {Object} state - app state
     */
    [m.RETURN_MONEY] (state) {
        state.change = { ...state.cache };
        state.cache = coins(0, 0, 0, 0);
    },

    /**
     * Removes all coins from change
     * @param {Object} state - app state
     */
    [m.EMPTY_CHANGE] (state) {
        state.change =  coins(0, 0, 0, 0);
    },

    /**
     * Sets flag, that indicates whether coffee is ready
     * @param {Object} state - app state
     * @param {boolean} ready - whether coffee is ready
     */
    [m.SET_COFFEE_READY] (state , ready) {
        state.coffeeReady = ready;    
    },

    /**
     * Sets flag, that indicates whether coffee is being brewed
     * @param {Object} state - app state
     * @param {boolean} ready - whether coffee is being brewed
     */
    [m.SET_COFFEE_BREWED] (state, brewed) {
        state.coffeeBrewed = brewed;
    },

    /**
     * Sets output message of the machins
     * @param {Object} state - app state
     * @param {string} message - message, that must be displayed to client
     */
    [m.SET_OUTPUT_MESSAGE] (state, message) {
        state.outputMessage = message;        
    },

    /**
     * Moves money for coffee to bank and provides changes
     * @param {Object} state - app state
     * @param {Object} money - new state of bank and change
     * @param {Object} money.updatedBank - bank with client's money
     * @param {Object} money.change - change for client
     */
    [m.ACCEPT_PAYMENT] (state, {updatedBank, change}) {
        state.bank = updatedBank;
        state.cache = coins();
        state.change = change;        
    },

    /**
     * Sets time of last client activity
     * @param {Object} state - app state
     */
    [m.ACTIVITY] (state) {
        state.lastActivity = new Date();
    }
}