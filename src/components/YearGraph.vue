<template>
  <div class="full-width">
    <div class="text-h5 q-py-md">Year Graph</div>
    <graph-filter :options="filterOptions" @onUpdate="onFilterUpdate"/>
    <bar-chart
      :chart-data="sortedSource"
      :options="chartOptions"
    />
  </div>
</template>
<script>
import BarChart from '@/components/global/chart/Bar'
import GraphFilter from '@/components/Filter'
export default {
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top'
        }
      },
      filter: null,
      sortedSource: null
    }
  },
  props: {
    source: {
      required: true
    }
  },
  watch: {
    source: {
      handler () {
        this.sortedSource = this.sortData(this.source)
      },
      immediately: true
    },
    filter: {
      handler () {
        this.sortedSource = this.sortData(this.source)
      },
      deep: true
    }
  },
  computed: {
    filterOptions () {
      if (!this.sortedSource) {
        return []
      }
      return this.sortedSource.datasets.map(i => i.label)
    }
  },
  components: {
    BarChart,
    GraphFilter
  },
  methods: {
    sortData (source) {
      let datasets = []
      const self = this
      if (!source) {
        return null
      }
      Object.keys(source).forEach(key => {
        if (this.filter) {
          if (this.filter.from && (key < this.filter.from)) {
            return
          }
          if (this.filter.to && (key > this.filter.to)) {
            return
          }
        }

        const el = {
          label: parseInt(key),
          backgroundColor: self.randomBgColor(),
          data: [self.source[key].rainfall]
        }

        datasets.push(el)
      })

      datasets = datasets.sort((a, b) => (a.label > b.label) ? 1 : -1)

      const data = {
        labels: ['Year'],
        datasets
      }

      return data
    },
    randomBgColor () {
      const x = Math.floor(Math.random() * 256)
      const y = Math.floor(Math.random() * 256)
      const z = Math.floor(Math.random() * 256)
      const color = 'rgb(' + x + ',' + y + ',' + z + ')'
      return color
    },
    onFilterUpdate (val) {
      this.filter = val
    }
  }
}
</script>
