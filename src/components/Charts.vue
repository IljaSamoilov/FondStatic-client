<template>
  <div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
  import axios from 'axios'
  import Chart from 'chart.js'

  export default {
    name: "Charts",
    data() {
      return {
        allData: [],
        colors: {
          GMF: '#a91d1d',
          QQQ: '#4267B2',
          LHVWORLDA: '#32a500'
        }
        // symbol: ''
      }
    },
    props: {
      symbol: {
        type: String,
        default() {
          return ''
        }
      }
    },
    async created() {
      await axios.get('https://fond-data.herokuapp.com/getAllData',
        // {
        //   headers: {
        //     'Access-Conthol-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //     'Access-Conthol-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        //   }
        // }
        )
        .then(response => {
          this.allData = response.data
        })
        .catch(error => {
          console.log(error.stack)
        })

    },
    methods: {
      getTimeStamps: function (symbol) {
        let timeStamps = [];
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i].symbol === symbol) {
            let date = new Date(Date.parse(this.allData[i].timestamp))
            timeStamps[timeStamps.length] = date.toUTCString().replace(' GMT', '');
          }
        }
        return timeStamps
      },
      getMarketPrices: function (symbol) {
        let marketPrices = [];
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i].symbol === symbol) {
            marketPrices[marketPrices.length] = this.allData[i].exemplarmarketprice;
          }
        }
        return marketPrices
      }
    },
    watch: {
      symbol: function (val, oldVal) {
        if (val !== '') {
          let ctx = document.getElementById("myChart");
          let timeStamps = this.getTimeStamps(val);
          let marketPrices = this.getMarketPrices(val);
          let color = this.colors[val];
          let myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: timeStamps,
              datasets: [{
                data: marketPrices,
                label: val,
                fill: false,
                borderColor: color,
                backgroundColor: color
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  canvas {
    /*width: 400px !important;*/
    /*height: 600px !important;*/
  }
</style>
