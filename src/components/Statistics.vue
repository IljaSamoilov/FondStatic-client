<template>
  <div>
    <p>{{results}}</p>
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
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
      .then(response => {
        this.results = response
      })
      .catch(error => {
        console.log(error)
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
