import { mapActions, mapState } from 'vuex'

/**
 * Lets client choose coffee position
 */
export default {
    name: 'CoffeeSelect',
    computed : {
        ...mapState([
          'coffeeBrewed', 'coffees'
        ])
    },
    methods: {
        ...mapActions([
          'chooseCoffee'
        ])
    }
}
