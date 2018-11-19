import * as m from './mutation-types'
import { defaultState } from './defaultState'
import { CHOOSE_YOUR_CUP, SORRY_NO_CHANGE, TAKE_YOUR_MONEY} from "./messages"

/**
 * Actions for coffee machine vuex store
 */
export default {
    /**
     * Sets certain cofee as chosen to buy
     * @param {Object} store - app vuex store 
     * @param {number} index - index of chosen coffee position 
     */
    chooseCoffee ({ commit, dispatch }, index) {
        commit(m.ACTIVITY);
        commit(m.CHOOSE_COFFEE, index)
        commit(m.EMPTY_CHANGE);
        commit(m.SET_OUTPUT_MESSAGE, '');
        commit(m.SET_COFFEE_READY, false); 
        dispatch('checkPayment');
        dispatch('autoReset');
    },

    /**
     * Perform putting coin into machine
     * @param {Object} store - app vuex store 
     * @param {string} coin - name of the put coin, e.g. oneCoin, twoCoin 
     */
    putCoin ({ commit, dispatch }, coin) {
        commit(m.ACTIVITY);
        commit(m.PUT_COIN, coin);
        commit(m.EMPTY_CHANGE);
        dispatch('checkPayment');
    },

    /**
     * Performs checking whether there is enough money to get coffee
     * If is it so, performs calculation and providing coffee and change
     * @param {Object} store - app vuex store 
     */
    async checkPayment({ commit, getters }) {
        if (getters.coffeePayed) {
            if (getters.canProvideChange) {
                const brewCoffee = m => new Promise(r => setTimeout(r, m));
                commit(m.SET_COFFEE_BREWED, true);
                commit(m.SET_OUTPUT_MESSAGE, getters.coffeeBrewedMessage)
                commit(m.SET_OUTPUT_COFFEE, { 
                    name: getters.coffee.name,
                    image: getters.coffee.image
                })
                await brewCoffee(3000);  
                commit(m.ACCEPT_PAYMENT, getters.calculateCoffee());   
                commit(m.SET_COFFEE_BREWED, false);
                commit(m.SET_COFFEE_READY, true);
                commit(m.SET_OUTPUT_MESSAGE, getters.coffeeReadyMessage)
            }
            else {
                commit(m.RETURN_MONEY);
                commit(m.SET_OUTPUT_MESSAGE, SORRY_NO_CHANGE)
            }
            commit(m.CHOOSE_COFFEE, -1)
        }
    },

    /**
     * Returns put coins and cancel coffee order
     * @param {Object} store - app vuex store 
     */
    returnMoney ({ commit, getters }) {
        commit(m.ACTIVITY);
        if(getters.received > 0)
        {
            commit(m.RETURN_MONEY);        
            commit(m.CHOOSE_COFFEE, -1)
            commit(m.SET_OUTPUT_MESSAGE, TAKE_YOUR_MONEY)
        }
    },

    /**
     * Removes output coffee 
     * @param {Object} store - app vuex store  
     */
    takeCoffee ({ commit }) {
        commit(m.ACTIVITY);        
        commit(m.SET_OUTPUT_MESSAGE, defaultState.outputMessage); 
        commit(m.SET_OUTPUT_COFFEE, defaultState.outputCoffee)
        commit(m.SET_COFFEE_READY, false); 
    },

    /**
     * Removes provided change
     * @param {Object} store - app vuex store  
     */
    takeMoney ({ state, commit }) {   
        commit(m.ACTIVITY);     
        commit(m.EMPTY_CHANGE);
        if(!state.coffeeReady) {            
            commit(m.SET_OUTPUT_MESSAGE, defaultState.outputMessage); 
        }
    },

    /**
     * Perform reset of machine state after timeout
     * @param {Object} store - app vuex store  
     */
    async autoReset({ state, commit, dispatch, getters }) {
        const timeout = 120;
        const secs = ((new Date()).getTime() - state.lastActivity.getTime()) / 1000;
        if (secs < timeout)          
        { 
            const activity = m => new Promise(r => setTimeout(r, m));
            await activity((timeout - secs) * 1000)
            dispatch('autoReset')
        } 
        else {           
            commit(m.SET_COFFEE_READY, false);   
            commit(m.CHOOSE_COFFEE, -1)    
            commit(m.SET_OUTPUT_COFFEE, { 
                name: '',
                image: ''
            })
            if (getters.received > 0){
                dispatch(m.RETURN_MONEY);
                dispatch('autoReset')
            }
            else {              
                commit(m.EMPTY_CHANGE);    
                commit(m.SET_OUTPUT_MESSAGE, defaultState.outputMessage); 
            }            
        }
    }
}