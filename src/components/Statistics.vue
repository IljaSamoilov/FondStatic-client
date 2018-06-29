<template>
  <div class="container">
    <div class="row">
      <a class="waves-effect waves-light btn right" v-on:click="updateDatabase()">update database</a>
    </div>
    <div class="row justify-content-between">
      <div class="col-6"></div>
      <div class="col-6 offset-6">
        <table class="striped responsive-table small-font">
          <thead>
          <tr>
            <th>SÜMBOL</th>
            <th>KOGUS</th>
            <th>SOETUSHIND</th>
            <th>TURUHIND</th>
            <th>MUUTUS</th>
            <th>MUUTUS TÄNA</th>
            <th>KASUM</th>
            <th>TURUVÄÄRTUS</th>
            <th v-if="notMobile">VIIMANE UUENDUS</th>
            <!--<th >OSAKAAL</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="result in results">
            <th><a href="#" v-on:click="clickSymbol(result.symbol)">{{result.symbol}}</a></th>
            <th>{{result.amount}}</th>
            <th>{{result.exemplarpurchaseprice}}</th>
            <th>{{result.exemplarmarketprice}}</th>
            <th v-bind:class="isPositive(result.change) ? 'positive' : 'negative'">{{result.change}}%</th>
            <th v-bind:class="isPositive(result.changetoday) ? 'positive' : 'negative'">{{result.changetoday}}%</th>
            <th v-bind:class="isPositive(result.profit) ? 'positive' : 'negative'">{{result.profit}}</th>
            <th>{{result.totalmarketprice}}</th>
            <th v-if="notMobile">{{result.timestamp}}</th>
            <!--<th>{{result.part}}</th>-->
          </tr>
          </tbody>
        </table>
        <div class="flow-text">
          <div class="row">
            <span class="right">Kasum: <span>{{totalprofit.toFixed(2)}}</span></span>
          </div>
          <div class="row">
            <span class="right">Varad kokku: <span>{{sum.toFixed(2)}}</span></span>
          </div>
        </div>
      </div>
    </div>
    <charts :symbol="clickedSymbol"></charts>
    <!--<p>{{results[0]}}</p>-->
    <!--<p>hello</p>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import Charts from './Charts'

  require('materialize-css/dist/css/materialize.css')
  import bootstrap from 'bootstrap'

  export default {
    name: 'Statistics',
    components: {
      Charts
    },
    data() {
      return {
        results: [],
        symbols: [],
        totalprofit: 0,
        sum: 0,
        clickedSymbol: '',
        notMobile: window.innerWidth >= 1000
      }
    },
    async created() {
      this.fetchSymbols()
    },
    methods: {
      async fetchData(symbol) {
        await axios.get('https://fond-data.herokuapp.com/getLastForSymbol', {
          params: {
            symbol: symbol
          }
        })
          .then(response => {
            this.results.push(response.data)
            this.totalprofit += response.data.profit
            this.sum += response.data.totalmarketprice
          })
          .catch(error => {
            console.log(error)
          })
      },

      isPositive(number) {
        return number > 0
      },

      async fetchSymbols() {
        this.resetData()
        await axios.get('https://fond-data.herokuapp.com/getSymbols')
          .then(response => {
            this.symbols = response.data
            for (var i = 0; i < this.symbols.length; i++) {
              this.fetchData(this.symbols[i])
            }
          })
      },
      clickSymbol(symbol) {
        this.clickedSymbol = symbol
      },

      async updateDatabase() {
        axios.get('https://fond-data.herokuapp.com/updateDatabase')
          .then(response => {
            this.fetchSymbols();
          })
      },

      resetData() {
        this.symbols = []
        this.results = []
        this.sum = 0;
        this.totalprofit = 0
      }
    }

  }
</script>

<style>
  /*@import "../../node_modules/materialize-css/dist/css/materialize.css";*/
</style>
<style scoped>
  th {
    text-align: right;
  }

  .negative {
    color: #a91d1d;
  }

  .positive {
    color: #32a500;
  }
</style>
