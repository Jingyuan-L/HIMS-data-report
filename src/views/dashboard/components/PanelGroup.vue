<template>

  <el-row :gutter="40" class="panel-group">
    <span class="page-title">
      Welcome to the HIMS Data Report System! 
    </span>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" >

        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Yesterday Patients
          </div>
          <count-to :start-val="0" :end-val="this.patients_num" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="form" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Yesterday Room Occupancy
          </div>
          <count-to :start-val="0" :end-val="this.occupancy_rate" :duration="3000" class="card-panel-num" />%
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Yesterday Medical Expense
          </div>
          <count-to :start-val="0" :end-val="this.expense_num" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { dashboardData } from '@/api/dashboard'
 
export default {
  components: {
    CountTo
  },
  data() {
    return {
      patients_num: 0,
      occupancy_rate: 0,
      expense_num: 0,
      cur_date: "",

      listQuery: {
        
      },
    }
  },
  created() {
    this.setDate()
    this.getData()
  },
  methods: {
    getData() {
      dashboardData(this.listQuery).then(response => {
        this.patients_num = response.data.patients_num
        this.occupancy_rate = response.data.occupancy_rate
        this.expense_num = response.data.expense_num
        console.log(response)
        // Just to simulate the time of the request

      })
    },
    setDate() {
      let day = new Date()
      day.setTime(day.getTime() - 24*60*60*1000)
      let dayMon=(day.getMonth() + 1) >= 10 ? day.getMonth()+1 : '0' + (day.getMonth() + 1)
      let dayDat=(day.getDate() + 1) >= 10 ? day.getDate() : '0' + (day.getDate())
      let s = day.getFullYear() + "-" + dayMon + "-" + dayDat;
      this.cur_date = s
    }
    
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 40px;
  text-align: center;
  font-size: 30px;
  display: block;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);


    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      text-align: center;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
