<template>
    <div>
        <div v-if='!loadingGlobalStat'>
            <div class='mainfeatures'>
                <div class='mainfeatures__item'>
                    <p>Market Cap: {{ parsePrice(globalStat.quote[currency].total_market_cap) }}</p>
                </div>
                <div class='mainfeatures__item'>
                    <p>Volume (24hr): {{ parsePrice(globalStat.quote[currency].total_volume_24h) }}</p>
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
                <div class='listheader__main'>
                    <li class='listheader__el' @click='filterByName()'>Name</li>
                    <li class='listheader__el' @click='filterBySymbol()'>Symbol</li>
                    <li class='listheader__el unnecessary' @click='filterByCap()'>Market Cap</li>
                    <li class='listheader__el' @click='filterByPrice()'>Price</li>
                    <li class='listheader__el unnecessary' @click='filterBySupply()'>Circulating Supply</li>
                    <li class='listheader__el' @click="filterBy1h()"><i class="fas fa-percent fa-xs"></i> 1h</li>
                </div>
                <li class='listheader__el last unnecessary' @click="filterBy24h()"><i class="fas fa-percent fa-xs"></i> 24h</li>
            </ul>
            <CryptoListItem v-for='[number, CryptoItem] in CryptoItems.entries()' 
            :key='CryptoItem.id'
            :cryptoItem='CryptoItem'
            :number='number'
            :currency='currency'/>
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
    props: ['currency'],
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
        this.$store.dispatch('fetchCrypto', this.currency)
        this.$store.dispatch('fetchGlobalStat', this.currency)
    },
    watch:{
        currency(){
            this.$store.dispatch('fetchCrypto', this.currency)
            this.$store.dispatch('fetchGlobalStat', this.currency)
        }
    },
    methods:{
        parsePrice(price){
            price = parseFloat(price)
            return price.toLocaleString('en-US', {style:'currency', currency:this.currency})
        },
        filterByPrice(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => item2.quote[this.currency].price - item1.quote[this.currency].price)
        },
        filterByCap(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => item2.quote[this.currency].market_cap - item1.quote[this.currency].market_cap)
        },
        filterBySupply(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => item2.circulating_supply - item1.circulating_supply)
        },
        filterByName(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => {
                if (item1.name < item2.name) {return -1}
                if (item1.name > item2.name) {return 1}
                return 0
            })
        },
        filterBySymbol(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => {
                if (item1.symbol < item2.symbol) {return -1}
                if (item1.symbol > item2.symbol) {return 1}
                return 0
            })
        },
        filterBy1h(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => item2.quote[this.currency].percent_change_1h - item1.quote[this.currency].percent_change_1h)
        },
        filterBy24h(){
            this.CryptoItems = this.CryptoItems.sort((item1, item2) => item2.quote[this.currency].percent_change_24h - item1.quote[this.currency].percent_change_24h)
        }
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
    list-style: none;
    padding: 0;
    border-bottom: 1px solid #ccc;
    margin: 0;
    height: fit-content;
}
.listheader__main{
    display: flex;
    width: 93%;
    height: fit-content;
}
.listheader__el{
    width: 16%;
    height: fit-content;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #bbb;
    padding: 10px;
    cursor: pointer;
}
.listheader__el:hover{
    background-color: #eee;
    color: #999;
}
.first{
    width: fit-content;
}
.last{
    padding: 10px 0;
    width: 5%;
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