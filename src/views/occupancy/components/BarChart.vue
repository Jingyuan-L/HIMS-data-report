<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000
const hospitalOptions = [
  'NYU Medical Center', 
  'Rochester General Hospital',
  'Jasmine Smith Hospital',
  'Anthony Bennett Hospital',
  'Jacqueline Jones Hospital',
  'Lisa Thompson Hospital',
  'Michael Coleman Hospital',
  'Gary Davis Hospital',
  'Lisa Curry Hospital',
  'Suzanne Olsen Hospital',
  'Stephen Huynh Hospital',
  'Rebecca Lamb Hospital',
  'Beth Smith Hospital',
  'Brenda Reyes Hospital',
  'Jonathan Murphy Hospital',
  'Charles Herring Hospital',
  'Anthony Martinez Hospital',
  'Diane Fisher Hospital',
  'Kyle Bennett Hospital',
  'David Smith Hospital',
]

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },

    setOptions({ occupiedData, totalData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' 
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: hospitalOptions,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            margin: 15,//距离
            interval: 0,
            rotate: 30,//倾斜度
          },
        triggerEvent: true
        }],
        yAxis: [{
          type: 'value',
          // axisTick: {
          //   show: false
          // }
        }],
        series: [{
          name: 'occupied',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: occupiedData,
          animationDuration
        },
        {
          name: 'total',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: totalData,
          animationDuration
        },]
      })
    }
  }
}
</script>
