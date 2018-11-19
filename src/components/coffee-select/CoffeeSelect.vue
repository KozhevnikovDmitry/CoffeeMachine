<template>
    <div>
        <div class="container coffees">
            <div class="row">
                <div class="coffee-position col-sm"
                    v-bind:class="{ selected: coffee.selected, disabled: coffeeBrewed}"   
                    v-for="(coffee, index) in coffees" :key="index"
                    v-on:click="chooseCoffee(index)">
                    <div class="coffee-img" >                        
                        <img :src="coffee.image" :alt="coffee.name"> 
                    </div>                   
                    <div class="coffee-text coffee-name" align='center'>{{coffee.name}}</div>                 
                    <div class="coffee-text coffee-cost">{{coffee.cost}}&#8381;</div>                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import './coffee-select.less'
  import coffeeSelect from "./coffee-select.js"
  export default coffeeSelect;
</script>