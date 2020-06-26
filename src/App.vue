<template>
  <div id="app">
    <nav class='nav'>
      <div class='nav__menu'>
        <router-link to='/'><i class="fas fa-home fa-2x"></i></router-link>
      </div>
      <div class='nav__search'>
        <div class='nav__inner'>
          <input @click='showSearch' class='nav__input' v-model='search' type='search' placeholder="Search">
        </div>
        <div @click='clearSearch' class='nav__searchitems'>
          <router-link class='nav__link' v-for='cryptoItem in cryptoSearchItems' :key='cryptoItem.id' :to='cryptoItem.slug'>{{ cryptoItem.name }}</router-link>
        </div>
      </div>
      <div class='nav__currency'>
        <select class='nav__select' v-model='currency'>
          <option class='nav__option' value='USD'>(USD) US dollar</option>
          <option class='nav__option' value='EUR'>(EUR) Euro</option>
          <option class='nav__option' value='RUB'>(RUB) Russian ruble </option>
          <option class='nav__option' value='KRW'>(KRW) South Korean Won </option>
          <option class='nav__option' value='CNY'>(CNY) Chinese Yuan </option>
          <option class='nav__option' value='CZK'>(CZK)Czech Koruna </option>
        </select>
      </div>
    </nav>
    <main class='main'>
      <router-view :currency='currency'/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App', 
  data(){
    return {
      search: '',
      currency: 'USD',
    }
  },
  computed:{
    cryptoItems(){
      return this.$store.getters.cryptoСurrencyItems
    },
    cryptoSearchItems(){
      return this.cryptoItems.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created(){
    this.$store.dispatch('fetchCrypto', this.currency)
    window.onclick = event => {
      if(event.target !== document.querySelector('.nav__input')){
        this.hideSearch()
      }
    }
  },
  watch:{
    currency(){
      this.$store.dispatch('fetchCrypto', this.currency)
    }
  },
  methods:{
    showSearch(){
      const el = document.querySelector('.nav__searchitems')
      el.style.display = 'flex'
    },
    hideSearch(){
      const el = document.querySelector('.nav__searchitems')
      el.style.display = 'none'
    },
    clearSearch(){
      this.search = ''
    }
  }
}
</script>

<style>
html{
  background-color: #F1FBFF;
}
.nav{
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  height: 35px;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
body{
  margin: 0;
}
.main{
  margin-top: 80px;
  height: 100%;
}
.fa-home{
  color: #1153fc;
  transition: 0.2s;
}
.fa-home:hover{
  color: #ccc;
}
.fa-search{
  color: #fff;
}
.nav__search{
  margin-top: auto;
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 300px;

}
.nav__input{
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  width: 100%;
  
}
.nav__input:focus{
  outline: none;
  border-bottom: 1px solid #ccc;
}
.nav__searchitems{
  display: none;
  flex-direction: column;
  overflow-y: auto;
  height: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.nav__link{
  color: #1153fc;
  text-decoration: none;
  padding: 10px;
}
.nav__link:hover{
  background-color: #ccc;
}
.nav__select{
  background-color: #1153fc;
  color: #fff;
  font-weight: bold;
  border: none;
  margin: 9px;
  padding: 1px;
}
.nav__select:active{
  outline: none;
}
.nav__option{
  background-color: #fff;
  color: #1153fc;
  font-weight: bold;
}
@media (max-width: 500px){
  html, body{
    overflow-x: hidden;
    width: 100%;
  }
  .nav{
    width: 100%;
  }
  .nav__select{
    width: 60px;
  }
}
</style>
