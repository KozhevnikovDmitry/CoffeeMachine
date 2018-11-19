import { mapState, mapGetters, mapActions } from 'vuex'
import spinner from '../../assets/spinner.gif'

/**
 * Returns coffee, change and messages to client
 */
export default {
    name: 'CoffeeOutput',
    computed : {
        ...mapGetters([
            'hasChange', 'hasCoinChange'
        ]),
        ...mapState([
            'outputMessage', 'outputCoffee', 'change', 'coffeeReady', 'coffeeBrewed'
        ]),
        spinner: () => "." + spinner
    },
    methods: {
        ...mapActions([
          'takeMoney', 'takeCoffee'
        ])
    }
}