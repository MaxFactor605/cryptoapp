<template>
    <router-link class='cryptoitem__link' :to='cryptoItem.slug'>
        <div class='cryptoitem'>
            <div class='cryptoitem__feature number first'>{{ number+1 }}</div>
            <div class='cryptoitem__feature name'>{{ cryptoItem.name }}</div>
            <div class='cryptoitem__feature symbol'>{{ cryptoItem.symbol }}</div>
            <div class='cryptoitem__feature market unnecessary'>{{ parsePrice(cryptoItem.quote[currency].market_cap) }}</div>
            <div class='cryptoitem__feature price'>{{ parsePrice(cryptoItem.quote[currency].price) }}</div>
            <div class='cryptoitem__feature supply unnecessary'>{{ parseSupply(cryptoItem.circulating_supply) }} {{ cryptoItem.symbol }}</div>
            <div class='cryptoitem__feature 1h' :class='isNegOrPos(cryptoItem.quote[currency].percent_change_1h)'>{{ cryptoItem.quote[currency].percent_change_1h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></div>
            <div class='cryptoitem__feature 24h last unnecessary' :class='isNegOrPos(cryptoItem.quote[currency].percent_change_24h)'>{{ cryptoItem.quote[currency].percent_change_24h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'CryptoListItem',
    props: ['cryptoItem', 'number', 'currency'],
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
            return price.toLocaleString('en-US', {style:'currency', currency:this.currency})
        },
        parseSupply(Supply){
            return Supply.toLocaleString('en-US')
        }
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
@media(min-width: 1300px){
    .last{
         padding-right: 35px;
    }
}
</style>