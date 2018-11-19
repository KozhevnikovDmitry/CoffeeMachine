<template>
  <div id="app">
    <div>
        <h1>
          COFFEE
        </h1>
        <CoffeeSelect/>
        <CoinAccept/>
        <CoffeeOutput/>
    </div>      
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import './app.less'
  import app from "./app.js"
  import CoffeeSelect from './coffee-select/CoffeeSelect.vue'
  import CoinAccept from './coin-accept/CoinAccept.vue'
  import CoffeeOutput from './coffee-output/CoffeeOutput.vue'
  export default app;
</script>