<template>
  <div>
    <div v-if="symbol != ''">
      <p>Hello i am charts</p>
      <p>{{symbol}}</p>
    </div>
    <canvas id="myChart" width="200" height="200"></canvas>
  </div>
</template>

<script>
  import axios from 'axios'
  import Chart from 'chart.js'

  export default {
    name: "Charts",
    data() {
      return {
        allData: []
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
    created: {
      // await axios.get('https://fond-data.herokuapp.com/getAllData',
      //   {
      //     headers: {
      //       'Access-Conthol-Allow-Origin': '*',
      //       'Content-Type': 'application/json',
      //       'Access-Conthol-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      //     }
      //   })
      //   .then(response => {
      //     this.allData = response.data
      //   })
      //   .catch(error => {
      //     console.log(error.stack)
      //   })

    },
    methods: {

    },
    watch: {
      symbol: function (val, oldVal) {
        if (val !== '') {
          var ctx = document.getElementById("myChart");
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [oldVal, "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero:true
                  }
                }]
              }
            }
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
