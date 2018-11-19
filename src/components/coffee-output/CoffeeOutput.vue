<template>
    <div class="container">
      <div class="row">
        <div class="col-sm message uppercase">          
          {{outputMessage}}
        </div>
      </div>

      <div class="row" v-if="coffeeReady" v-on:click="takeCoffee">
        <div class="col-sm message">          
          <img class="coffee-img selected-coffee-image" :src="outputCoffee.image" :alt="outputCoffee.name">
          <span class="">{{outputCoffee.name}}</span>
        </div>
      </div>

      <div class="row" v-if="coffeeBrewed">
        <div class="col-sm coffee-brewed">    
          <img class="spinner" :src="spinner">
        </div>
      </div>      

      <div class="row" v-if="hasChange" v-on:click="takeMoney">
        <div class="col-sm message">          
           Your change:
          <span v-if="hasCoinChange('tenCoin')">{{change.tenCoin}}x10&#8381; </span>
          <span v-if="hasCoinChange('fiveCoin')">{{change.fiveCoin}}x5&#8381; </span>
          <span v-if="hasCoinChange('twoCoin')">{{change.twoCoin}}x2&#8381; </span>
          <span v-if="hasCoinChange('oneCoin')">{{change.oneCoin}}x1R&#8381;</span>
        </div>
      </div>

    </div>
</template>

<script>
  import './coffee-output.less'
  import coffeeOutput from "./coffee-output.js"
  export default coffeeOutput;
</script>