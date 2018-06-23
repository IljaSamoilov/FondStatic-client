<template>
  <div>
    <table>
      <tr>
        <th>symbol</th>
        <th>amount</th>
        <th>purchase price</th>
        <th>market price</th>
        <th>change</th>
        <th>change today</th>
        <th>profit</th>
        <th>total market price</th>
        <th>part</th>
      </tr>
      <tr v-for="result in results">
        <th>{{result.symbol}}</th>
        <th>{{result.amount}}</th>
        <th>{{result.exemplarpurchaseprice}}</th>
        <th>{{result.exemplarmarketprice}}</th>
        <th>{{result.change}}</th>
        <th>{{result.changetoday}}</th>
        <th>{{result.profit}}</th>
        <th>{{result.totalmarketprice}}</th>
        <th>{{result.part}}</th>
      </tr>
    </table>
    <p>{{results[0]}}</p>
    <p>hello</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Statistics',
  data () {
    return {
      results: []
    }
  },
  async created () {
    // this.fetchData()
    await axios.get('https://cors-anywhere.herokuapp.com/https://fond-data.herokuapp.com/getAllData',
      {
        headers: {
          'Access-Conthol-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Conthol-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
      .then(response => {
        this.results = response.data
      })
      .catch(error => {
        console.log(error.stack)
      })
  },
  methods: {
    fetchData () {
      axios.get('fond-data.herokuapp.com/getAllData')
        .then(response => {
          this.results = response.data
          // console.log('done')
          console.log(response.data)
          return response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
    /** setData (data) {
      this.results = data
      console.log(data)
    } **/
  }
}
</script>

<style scoped>

</style>
