<template>
  <div class="full-width">
    <div class="text-h5 q-py-md">Month Graph</div>
    <bar-chart
      :chart-data="sortedSource"
      :options="chartOptions"
      @click="onClick($event)"
    />
  </div>
</template>
<script>
import BarChart from '@/components/global/chart/Bar'

export default {
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top'
        }
      }
    }
  },
  props: {
    source: {
      required: true
    }
  },
  computed: {
    sortedSource () {
      let datasets = []
      const self = this
      if (!this.source) {
        return null
      }

      Object.keys(this.source).forEach(key => {
        const el = {
          label: key,
          backgroundColor: self.randomBgColor(),
          data: [self.source[key].total]
        }

        datasets.push(el)
      })

      datasets = datasets.sort((a, b) => (a.data[0] > b.data[0]) ? 1 : -1)
      const data = {
        labels: ['month'],
        datasets
      }
      return data
    }
  },
  components: {
    BarChart
  },
  methods: {
    randomBgColor () {
      const x = Math.floor(Math.random() * 256)
      const y = Math.floor(Math.random() * 256)
      const z = Math.floor(Math.random() * 256)
      const color = 'rgb(' + x + ',' + y + ',' + z + ')'
      return color
    },
    onClick ($event) {
      console.log($event)
    }
  }
}
</script>
