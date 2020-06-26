<template>
    <div>
        <div class='cryptodetail' v-if='!loading'>
            <div class='cryptodetail__inner'>
                <div class='cryptodetail__img' v-if='!loadingMetaData'>
                   <img :src='MetaData[cryptoItemId].logo'>
                </div>
                <div class='cryptodetail__title'>
                   <strong>{{ cryptoItem[cryptoItemId].name }}</strong> {{ cryptoItem[cryptoItemId].symbol }}
                </div>
                <div class='cryptodetail__price'>
                    <p>Currently trading at <strong class='price'> {{ parsePrice(cryptoItem[cryptoItemId].quote[this.currency].price) }}</strong></p>
                    <small>With total market cap <strong class='price' v-if='!loadingGlobalStat'> {{ parsePrice(globalStat.quote[this.currency].total_market_cap) }}</strong></small>
                </div>
                <div class='cryptodetail__info'>
                    <div class='cryptodetail__item'>
                        <h3>Volume(24hr)</h3>
                        <p>Volume that has been traded in last 24hrs</p>
                        <strong class='price'> {{ parsePrice(cryptoItem[cryptoItemId].quote[this.currency].volume_24h) }}</strong>
                    </div>
                    <div class='cryptodetail__item'>
                        <h3>1hr Change</h3>
                        <p>Price change in the last hour</p>
                        <strong :class='isNegOrPos(cryptoItem[cryptoItemId].quote[this.currency].percent_change_1h)'>{{ cryptoItem[cryptoItemId].quote[this.currency].percent_change_1h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></strong>
                    </div>
                    <div class='cryptodetail__item'>
                        <h3>24hr Change</h3>
                        <p>Price change in the last 24 hours</p>
                        <strong :class='isNegOrPos(cryptoItem[cryptoItemId].quote[this.currency].percent_change_24h)'>{{ cryptoItem[cryptoItemId].quote[this.currency].percent_change_24h.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></strong>
                    </div>
                    <div class='cryptodetail__item'>
                        <h3>7 day Change</h3>
                        <p>Price change in the last 7 days</p>
                        <strong :class='isNegOrPos(cryptoItem[cryptoItemId].quote[this.currency].percent_change_7d)'>{{ cryptoItem[cryptoItemId].quote[this.currency].percent_change_7d.toFixed(2) }} <i class="fas fa-percent fa-xs"></i></strong>
                    </div>
                </div>
            </div>
        </div>
        <div v-if='loading'>
           <div class="lds-dual-ring"></div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'CryptoDetail',
    props: ['slug', 'currency'],
    computed: {
        cryptoItem(){
            return this.$store.getters.cryptoItem
        },
        loading(){
            return this.$store.getters.loading
        },
        globalStat(){
            return this.$store.getters.globalStat
        },
        loadingGlobalStat(){
            return this.$store.getters.loadingGlobalStat
        },
        MetaData(){
            return this.$store.getters.metaData
        },
        loadingMetaData(){
            return this.$store.getters.loadingMeta
        },
        cryptoItemId(){
            let id 
            let i
            for (i in this.cryptoItem){
                id = i
            }
            return id 
        }
        
    },
    watch:{
        slug(){
            this.fetchCrypto()
            this.fetchMeta()
        },
        currency(){
            this.fetchCrypto()
            this.fetchGlobalStat()
        }
    },
    created(){
        this.fetchCrypto()
        this.fetchGlobalStat()
        this.fetchMeta()
    },
    methods:{
        fetchCrypto(){
            this.$store.dispatch('fetchCryptoDetailItem', {slug:this.slug, currency:this.currency})
        },
        fetchGlobalStat(){
            this.$store.dispatch('fetchGlobalStat', this.currency)
        },
        fetchMeta(){
            this.$store.dispatch('fetchCryptoMetaData', this.slug)
        },
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
        }
    }

}
</script>

<style scoped>
.title{
    text-align: center;
    margin-top: 40px;
}
.cryptodetail{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 130px;
}
.cryptodetail__info{
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
}
.cryptodetail__title{
    text-align: center;
    font-size: 30px;
}
.cryptodetail__price{
    text-align: center;
}
.cryptodetail__price p{
    margin: 0;
    font-size: 25px;
}
.cryptodetail__item{
    width: 15%;
    padding: 0 30px 30px 15px;
    border: 2px solid #CAE6F1;
    border-bottom: 4px solid #B3DCEC;
    background-color: #fff;
}
.cryptodetail__img img{
    margin: 50px 47.5%;
}
.price{
    color: #1153fc;
}
.neg{
    color: #ff0000;
}
.pos{
    color: #00ff00;
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
    .cryptodetail__info{
        flex-direction: column;
    }
    .cryptodetail__item{
        width: 100%;
    }
    .cryptodetail__img img{
        margin: 50px 40%;
    }
    .lds-dual-ring{
        margin: 0 35%;
    }
}
</style>