import { mapState } from 'vuex'
import CoffeeSelect from './coffee-select/CoffeeSelect.vue'
import CoinAccept from './coin-accept/CoinAccept.vue'
import CoffeeOutput from './coffee-output/CoffeeOutput.vue'

/**
 * Root component of coffee machine app
 */
export default {
    components: { CoffeeSelect, CoinAccept, CoffeeOutput },
    name: 'CoffeeMachine',
    computed: {        
        ...mapState([
          'coffees'
        ])
      }
}