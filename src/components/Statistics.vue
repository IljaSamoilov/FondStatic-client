<template>
  <div class="container">
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
            <th>VIIMANE UUENDUS</th>
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
            <th>{{result.timestamp}}</th>
            <!--<th>{{result.part}}</th>-->
          </tr>
          </tbody>
        </table>
        <span class="right flow-text">Kasum: <span>{{totalprofit.toFixed(2)}}</span></span>
        <!--<br/>-->
        <br/>
        <span class="right flow-text">Varad kokku: <span>{{sum.toFixed(2)}}</span></span>
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
// require('materialize-css/dist/css/materialize.css')
require('materialize-css')
require('bootstrap')

export default {
  name: 'Statistics',
  components: {
    Charts
  },
  data () {
    return {
      results: [],
      symbols: [],
      totalprofit: 0,
      sum: 0,
      clickedSymbol: ''
    }
  },
  async created () {
    this.fetchSymbols()
    // await this.fetchData()
    // await axios.get('https://cors-anywhere.herokuapp.com/https://fond-data.herokuapp.com/getAllData',
    //   {
    //     headers: {
    //       'Access-Conthol-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //       'Access-Conthol-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    //     }
    //   })
    //   .then(response => {
    //     this.results = response.data
    //   })
    //   .catch(error => {
    //     console.log(error.stack)
    //   })
  },
  methods: {
    async fetchData (symbol) {
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
    /** setData (data) {
      this.results = data
      console.log(data)
    } **/

    isPositive (number) {
      return number > 0
    },

    async fetchSymbols () {
      await axios.get('https://fond-data.herokuapp.com/getSymbols')
        .then(response => {
          this.symbols = response.data
          for (var i = 0; i < this.symbols.length; i++) {
            this.fetchData(this.symbols[i])
          }
          // this.symbols.forEach(function(symbol) {
          //   console.log(symbol)
          //   this.$parent.fetchData(symbol)
          // })
        })
    },
    clickSymbol (symbol) {
      this.clickedSymbol = symbol
    }
  }

}
</script>

<style>
  @import "materialize-css/dist/css/materialize.css";
</style>
<style scoped>
  th {
    text-align: right;
  }

  .negative {
    color: #a91d1d;
  }
  br {
    margin-bottom: 16px;
  }
  .positive {
    color: #32a500;
  }
</style>
