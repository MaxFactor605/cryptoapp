import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
//import axios from 'axios'

Vue.use(Vuex)

const options = {
    headers: {
        'X-CMC_PRO_API_KEY':'999cc9fb-efbe-47fe-9292-c05ca05e6965'
    }
}

const state = {
    cryptoСurrencyItems: [],
    cryptoMetaData: {},
    cryptoDetailItem: {},
    globalStat: {},
    loading: true,
    loadingMeta: true,
    loadingGlobalStat: true,

}

const mutations = {
    UPDATE_CRYPTO_CURRENCY_ITEMS(state, payload){
        state.cryptoСurrencyItems = payload
    },
    UPDATE_CRYPTO_DETAIL_ITEM(state, payload){
        state.cryptoDetailItem = payload
    },
    UPDATE_LOADING(state, payload){
        state.loading = payload
    },
    UPDATE_GLOBAL_STAT(state, payload){
        state.globalStat = payload
    },
    UPDATE_LOADING_GLOBAL_STAT(state, payload){
        state.loadingGlobalStat = payload
    },
    UPDATE_META_DATA(state, payload){
        state.cryptoMetaData = payload
    },
    UPDATE_LOADING_META(state,payload){
        state.loadingMeta = payload
    }
}

const actions = {
    fetchCrypto({ commit }){
        commit('UPDATE_LOADING', true)
        axios.get('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD', options)
            .then((response) => {
                commit('UPDATE_CRYPTO_CURRENCY_ITEMS', response.data.data)
                commit('UPDATE_LOADING', false)})
    },
    fetchCryptoDetailItem({ commit }, slug){
        commit('UPDATE_LOADING', true)
        axios.get(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${slug}&convert=USD`, options)
            .then((response) => {
                commit('UPDATE_CRYPTO_DETAIL_ITEM', response.data.data)
                commit('UPDATE_LOADING', false)}) 
    },
    fetchGlobalStat({ commit }){
        commit('UPDATE_LOADING_GLOBAL_STAT', true)
        axios.get('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', options)
            .then((response) => {
                commit('UPDATE_GLOBAL_STAT', response.data.data)
                commit('UPDATE_LOADING_GLOBAL_STAT', false)
            })
    },
    fetchCryptoMetaData({ commit }, slug){
        commit('UPDATE_LOADING_META', true)
        axios.get(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?slug=${slug}`, options)
            .then((response) => {
                commit('UPDATE_META_DATA', response.data.data)
                commit('UPDATE_LOADING_META', false)
            })
    }
}

const getters = {
    cryptoСurrencyItems: state => state.cryptoСurrencyItems,
    cryptoItem: state => state.cryptoDetailItem,
    loading: state => state.loading,
    globalStat: state => state.globalStat,
    loadingGlobalStat: state => state.loadingGlobalStat,
    metaData: state => state.cryptoMetaData,
    loadingMeta: state => state.loadingMeta
        
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})