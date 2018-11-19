<template>
  <div class='container'>       
    <div class="row billing-row" v-if="canAddCoin">
      <div class='message uppercase col-sm'>
        {{coffee.name}} {{coffee.cost}}&#8381;
      </div>
    </div>

    <div class="row billing-row" v-if="canAddCoin">
      <div class='col-sm'>
        <img class="coffee-img selected-coffee-img" :src="coffee.image" :alt="coffee.name">
      </div>
      <div class='col-sm'>
        <div class="put-coin" v-on:click="putCoin('twoCoin')">
          <img :src="putCoinImg" alt="1&#8381;">
          <div class='coin'>1&#8381;</div>
        </div>
      </div>
      <div class='col-sm'>
        <div class="put-coin" v-on:click="putCoin('twoCoin')">
          <img :src="putCoinImg" alt="2&#8381;">
          <div class='coin'>2&#8381;</div>
        </div>
      </div>
      <div class='col-sm'>
        <div class="put-coin" v-on:click="putCoin('fiveCoin')">
          <img :src="putCoinImg" alt="5&#8381;">
          <div class='coin'>5&#8381;</div>
        </div>
      </div>
      <div class='col-sm'>
        <div class="put-coin" v-on:click="putCoin('tenCoin')">
          <img :src="putCoinImg" alt="10&#8381;">
          <div class='coin'>10&#8381;</div>
        </div>
      </div>
      <div class='col-sm'>
        <div class="put-coin" v-on:click="returnMoney()">
          <img class="put-coin" :src="cancelImg" alt="Cancel">
        </div>
      </div>
    </div>

    <div class="row billing-row" v-if="canAddCoin">
      <div class='message col-sm'>
        Received {{received}}&#8381; Add {{rest}}&#8381;
      </div>
    </div>      
  </div>
</template>

<script>
  import './coin-accept.less'
  import coinAccept from "./coin-accept.js"
  export default coinAccept;
</script>