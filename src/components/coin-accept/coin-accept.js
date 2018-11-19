import { mapActions, mapGetters } from 'vuex'
import putCoinImg from "../../assets/icons/svg/insert-coin.svg"
import cancelImg from "../../assets/icons/svg/cancel.svg"

/**
 * Provides interface for putting coins to the machine
 */
export default {
    name: 'CoffeeAccept',
    computed : {
        ...mapGetters([
          'coffeePayed', 'coffeeRequested', 'canAddCoin', 'coffee', 'received', 'rest' 
        ]),
        putCoinImg: () => "." + putCoinImg,
        cancelImg: () => "." + cancelImg
    },
    methods: {
        ...mapActions([
          'putCoin', 'returnMoney'
        ])
    }
}