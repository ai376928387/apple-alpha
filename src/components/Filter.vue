<template>
  <div class="row items-center">
    <span class="p-px-md">From: </span>
    <q-select
      :options="options"
      filled
      style="width: 300px;"
      v-model="filter.from"
    />
    <span class="p-px-md">To: </span>
    <q-select
      :options="options"
      filled
      style="width: 300px;"
      v-model="filter.to"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      filter: {
        from: null,
        to: null
      }
    }
  },
  props: {
    options: {
      required: true,
      type: Array
    }
  },
  watch: {
    filter: {
      handler () {
        this.$emit('onUpdate', this.filter)
      },
      deep: true
    }
  }
}
</script>
