<template>
  <div class="dashboard-editor-container">
    <span class="page-title">
      Current Room Occupancy Rate 
    </span>
    <div class="filter-container">

    </div>
    

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart :chart-data="this.barChartData" />
    </el-row>

  </div>
</template>

<script>
import BarChart from './components/BarChart'
import { occupancyList } from '@/api/occupancy'


export default {
  name: 'MedecalExpense',
  components: {
    BarChart,
  },
  
  data() {
    return {
      barChartData: {occupiedData: [], totalData: []},

      // listLoading: true,
      // listQuery: {
      //   query_year: 2020,
      //   query_month: 11,
      //   hospital_id: 1,
      // },
    }
  },
  created() {
    this.getList()
  },
  methods: {

    getList() {
      occupancyList(this.listQuery).then(response => {
        this.barChartData.occupiedData = response.data.occupiedData
        this.barChartData.totalData = response.data.totalData
        // console.log(this.barChartData.occupiedData)
        
      })
    },
    handleFilter() {
      this.getList()
    },
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  display: block;
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

}

</style>
