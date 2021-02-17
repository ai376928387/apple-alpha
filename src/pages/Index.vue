<template>
  <q-page>
    <div class="row">
      <year-graph :source="source" />
    </div>
    <div class="row">
      <month-graph :source="monthlySource"/>
    </div>
  </q-page>
</template>
<script>
import { getDataDetail } from '@/api/index'
import YearGraph from '@/components/YearGraph'
import MonthGraph from '@/components/MonthGraph'

export default {
  name: 'PageIndex',
  data () {
    return {
      source: null
    }
  },
  computed: {
    monthlySource () {
      if (!this.source) {
        return null
      }
      const monthlySource = {}

      // group into month
      Object.keys(this.source).forEach(key => {
        const singleYearData = this.source[key]

        Object.keys(singleYearData).forEach(i => {
          if (i === 'rainfall') {
            return
          }
          if (!(i in monthlySource)) {
            monthlySource[i] = []
            monthlySource[i].total = 0
          }
          const data = {
            year: key,
            rainfall: singleYearData[i].rainfall
          }
          monthlySource[i].push(data)
          monthlySource[i].total += data.rainfall
          monthlySource[i].average = monthlySource[i].total / (monthlySource[i].length - 1)
        })
      })

      return monthlySource
    }
  },
  components: {
    YearGraph,
    MonthGraph
  },
  methods: {
    getDataDetail () {
      const self = this
      getDataDetail()
        .then(response => {
          self.source = response.data
        })
    }
  },
  async mounted () {
    await this.getDataDetail()
  }
}
</script>
