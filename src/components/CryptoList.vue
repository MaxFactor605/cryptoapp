<template>
    <div>
        <div v-if='!loadingGlobalStat'>
            <div class='mainfeatures'>
                <div class='mainfeatures__item'>
                    <p>Market Cap: <i class="fas fa-dollar-sign"></i> {{ parsePrice(globalStat.quote.USD.total_market_cap) }}</p>
                </div>
                <div class='mainfeatures__item'>
                    <p>Volume (24hr): <i class="fas fa-dollar-sign"></i> {{ parsePrice(globalStat.quote.USD.total_volume_24h) }}</p>
                </div>
                <div class='mainfeatures__item'>
                    <p>BTC dominance: {{ globalStat.btc_dominance }} <i class="fas fa-percent fa-xs"></i></p>
                </div>
            </div>
        </div>
        <div v-if='loadingGlobalStat'>
            <div class="lds-dual-ring"></div>
        </div>
        <div v-if='!loading'>
            <ul class='listheader'>
                <li class='listheader__el first'>#</li>
                <li class='listheader__el'>Name</li>
                <li class='listheader__el'>Symbol</li>
                <li class='listheader__el unnecessary'>Market Cap</li>
                <li class='listheader__el'>Price</li>
                <li class='listheader__el unnecessary'>Circulating Supply</li>
                <li class='listheader__el'><i class="fas fa-percent fa-xs"></i> 1h</li>
                <li class='listheader__el last unnecessary'><i class="fas fa-percent fa-xs"></i> 24h</li>
            </ul>
            <CryptoListItem v-for='[number, CryptoItem] in CryptoItems.entries()' 
            :key='CryptoItem.id'
            :cryptoItem='CryptoItem'
            :number='number'/>
        </div>
        <div v-if='loading'>
            <div class="lds-dual-ring"></div>
        </div>
    </div>    
</template>

<script>
import CryptoListItem from '@/components/CryptoListItem'
export default {
    name: 'CryptoList',
    components:{
        CryptoListItem
    }, 
    computed: {
        CryptoItems(){
            return this.$store.getters.cryptoСurrencyItems
        },
        loading(){
            return this.$store.getters.loading
        },
        globalStat(){
            return this.$store.getters.globalStat
        },
        loadingGlobalStat(){
            return this.$store.getters.loadingGlobalStat
        }
    },
    created(){
        this.$store.dispatch('fetchCrypto')
        this.$store.dispatch('fetchGlobalStat')
    },
    methods:{
        parsePrice(price){
            price = parseFloat(price)
            return price.toLocaleString('en-US', {style:'currency', currency:'USD'}).slice(1)
        },
    }
}
</script>

<style scoped>
.title{
    text-align: center;
    margin-top: 40px;
}
.listheader{
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 20px 15px;
    border-bottom: 1px solid #ccc;
    margin: 0;
}
.listheader__el{
    width: 14%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #bbb;
}
.first{
    width: fit-content;
}
.last{
    width: fit-content;
    
}
.mainfeatures{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
.mainfeatures__item{
    background: linear-gradient(to bottom right,#567ff3,#1153fc);
    color: #fff;
    height: 3rem;
    border-radius: 5px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 5px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0 47%;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #1153fc;
  border-color: #1153fc transparent #1153fc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media(max-width: 500px){
    .mainfeatures{
        flex-direction: column;
    }
    .mainfeatures__item{
        width: 100%;
        margin: 5px 0;
    }
    .unnecessary{
        display: none;
    }
    .listheader__el{
        width: 33%;
    }
    .first{
        width: 5%;
    }
    .lds-dual-ring{
        margin: 0 35%;
    }
}
</style>