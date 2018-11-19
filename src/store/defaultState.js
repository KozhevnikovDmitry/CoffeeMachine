import espresso from '../assets/icons/svg/espresso.svg'
import cappuccino from '../assets/icons/svg/cappuccino.svg'
import latte from '../assets/icons/svg/latte.svg'
import milk from '../assets/icons/svg/milk.svg'
import americano from '../assets/icons/svg/americano.svg'
import coins from '../store/coins'
import { CHOOSE_YOUR_CUP } from "./messages"

/**
 * Default state for coffee machine vuex store
 */
const defaultState = {
    coffeeReady: false,
    coffeeBrewed: false,
    outputMessage: CHOOSE_YOUR_CUP,
    lastActivity: new Date(),
    outputCoffee: { 
        name: '',
        image: ''
    },

    bank: coins(50, 25, 10, 5),
    cache: coins(0, 0, 0, 0),
    change: coins(0, 0, 0, 0),

    coffees: [
        {
            name: "Espresso",
            image: "." + espresso,
            cost: 23,
            selected: false
        },
        {
            name: "Cappuccino",
            image: "." + cappuccino,
            cost: 40,
            selected: false
        },
        {
            name: "Latte",
            image: "." + latte,
            cost: 45,
            selected: false
        },
        {
            name: "Americano",
            image: "." + americano,
            cost: 37,
            selected: false
        },
        {
            name: "Milk",
            image: "." + milk,
            cost: 11,
            selected: false
        }
    ]    
}

export { defaultState }
