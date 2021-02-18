<template>
  <div class="full-width">
    <div class="text-h5 q-py-md">Daily Graph</div>
    <line-chart
      :chart-data="sortedSource"
      :options="chartOptions"
      @click="onClick($event)"
    />
  </div>
</template>
<script>
import LineChart from '@/components/global/chart/Line'

export default {
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
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
      let values = []
      if (!this.source) {
        return null
      }

      Object.keys(this.source).forEach(year => {
        const singleYearData = this.source[year]
        Object.keys(singleYearData).forEach(month => {
          const singleMonthData = singleYearData[month]
          Object.keys(singleMonthData).forEach(day => {
            if (singleMonthData[day] === 0) {
              return
            }
            const label = `${day}/${month}/${year}`
            const el = {
              label: label,
              value: singleMonthData[day]
            }
            values.push(el)
          })
        })
      })

      values = values.sort((a, b) => (a.value > b.value) ? 1 : -1)
      const data = {
        labels: values.map(v => v.label),
        datasets: [{
          label: 'rainfall',
          backgroundColor: '#ccc',
          data: values.map(v => v.value)
        }]
      }
      return data
    }
  },
  components: {
    LineChart
  }
}
</script>
