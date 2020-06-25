<template>
    <router-link class='cryptoitem__link' :to='cryptoItem.slug'>
        <div class='cryptoitem'>
            <div class='cryptoitem__feature number first'>{{ number+1 }}</div>
            <div class='cryptoitem__feature name'>{{ cryptoItem.name }}</div>
            <div class='cryptoitem__feature symbol'>{{ cryptoItem.symbol }}</div>
            <div class='cryptoitem__feature market unnecessary'><i class="fas fa-dollar-sign"></i> {{ parsePrice(cryptoItem.quote.USD.market_cap) }}</div>
            <div class='cryptoitem__feature price'><i class="fas fa-dollar-sign"></i> {{ parsePrice(cryptoItem.quote.USD.price) }}</div>
            <div class='cryptoitem__feature supply unnecessary'>{{ parsePrice(cryptoItem.circulating_supply) }} {{ cryptoItem.symbol }}</div>
            <div class='cryptoitem__feature 1h' :class='isNegOrPos(cryptoItem.quote.USD.percent_change_1h)'>{{ cryptoItem.quote.USD.percent_change_1h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></div>
            <div class='cryptoitem__feature 24h last unnecessary' :class='isNegOrPos(cryptoItem.quote.USD.percent_change_24h)'>{{ cryptoItem.quote.USD.percent_change_24h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'CryptoListItem',
    props: ['cryptoItem', 'number'],
    methods:{
        isNegOrPos(percent){
            if (percent >= 0){
                return 'pos'
            }else{
                return 'neg'
            }
        },
        parsePrice(price){
            price = parseFloat(price)
            return price.toLocaleString('en-US', {style:'currency', currency:'USD'}).slice(1)
        },
}}
</script>


<style scoped>
.cryptoitem{
    display: flex;
    justify-content: space-between;
    padding: 8px 15px; 
    border-bottom: 1px solid #ccc;
    height: 50px; 
    width: 100%;
    align-items: center;
    background-color: #fff;
}
.cryptoitem__feature{
    text-align: center;
    width: 14%;
}
.cryptoitem__link{
    display: flex;
    width: 100%;
    text-decoration: none;
    height: 100%;
    justify-content: space-between; 
    color: #000;
    transition: 0.2s;
}
.cryptoitem__link:hover{
    background-color: #ccc;
}
.first{
    width: fit-content;
    padding-right: 5px;
}
.last{
    width: fit-content;

}
.name, .price, .supply{
    font-weight: bold;
    color: #1153fc;
}
.neg{
    color: #ff0000;
}
.pos{
    color: #00ff00;
}
@media(max-width: 500px){
    .unnecessary{
        display: none;
    }
    .cryptoitem__feature{
        width:33%;
    }
    .number{
        width: 5%;
    }
}
</style>