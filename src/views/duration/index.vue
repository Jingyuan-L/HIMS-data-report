<template>
  <div class="app-container">
    <span class="page-title">
      Average Disease Duration 
    </span>
    <div class="filter-container">
      <el-input v-model="listQuery.info" placeholder="Disease Description" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ICD_Code" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.icd_code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Description" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Total Times" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.total_times }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Duration" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.duration }}</span>
        </template>
      </el-table-column>

    </el-table>

      
  </div>
</template>

<script>
import { durationList } from '@/api/duration'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DurationList',
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        info: "",
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      durationList(this.listQuery).then(response => {
        this.list = response.data.items
        console.log(response)

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
