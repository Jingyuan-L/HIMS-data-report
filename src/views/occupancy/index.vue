<template>
  <div class="dashboard-editor-container">
    <span class="page-title">
      Daily Roon Occupancy Rate 
    </span>
    <div class="filter-container">
      
      <el-select v-model="listQuery.query_year" placeholder="Year" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.query_month" placeholder="Month" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in monthOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.hospital_id" placeholder="Hospital" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in hospitalOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>

    </div>
    

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart :chart-data="this.barChartData" />
    </el-row>

  </div>
</template>

<script>
import BarChart from './components/BarChart'
import { occupancyList } from '@/api/occupancy'

const hospitalOptions = [
  { key: '1', display_name: 'NYU Medical Center' },
  { key: '2', display_name: 'Rochester General Hospital' },
  { key: '5', display_name: 'Jasmine Smith Hospital' },
  { key: '6', display_name: 'Anthony Bennett Hospital' },
  { key: '7', display_name: 'Jacqueline Jones Hospital' },
  { key: '8', display_name: 'Lisa Thompson Hospital' },
  { key: '9', display_name: 'Michael Coleman Hospital' },
  { key: '10', display_name: 'Gary Davis Hospital' },
  { key: '11', display_name: 'Lisa Curry Hospital' },
  { key: '12', display_name: 'Suzanne Olsen Hospital' },
  { key: '13', display_name: 'Stephen Huynh Hospital' },
  { key: '14', display_name: 'Rebecca Lamb Hospital' },
  { key: '15', display_name: 'Beth Smith Hospital' },
  { key: '16', display_name: 'Brenda Reyes Hospital' },
  { key: '17', display_name: 'Jonathan Murphy Hospital' },
  { key: '18', display_name: 'Charles Herring Hospital' },
  { key: '19', display_name: 'Anthony Martinez Hospital' },
  { key: '20', display_name: 'Diane Fisher Hospital' },
  { key: '21', display_name: 'Kyle Bennett Hospital' },
  { key: '22', display_name: 'David Smith Hospital' },
]



export default {
  name: 'MedecalExpense',
  components: {
    BarChart,
  },
  
  data() {
    return {
      barChartData: {occupiedData: [], totalData: []},
      hospitalOptions,
      yearOptions: [...Array(22).keys()].map((el, i) => 2000 + i),
      monthOptions: [...Array(12).keys()].map((el, i) => 1 + i),
      // listLoading: true,
      listQuery: {
        query_year: 2020,
        query_month: 11,
        hospital_id: 1,
      },
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
