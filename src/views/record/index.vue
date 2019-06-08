<template>
  <el-table
    :data="recordDate"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <!-- <el-form-item label="姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="学号/工号">
            <span>{{ props.row.passId }}</span>
          </el-form-item> -->
          <el-form-item label="角色">
            <span>{{ props.row.roleRole }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span v-if="props.row.userSex == 1">男</span>
            <span v-if="props.row.userSex == 0">女</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ props.row.userEmail }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学号"
      prop="passId">
    </el-table-column>
    <el-table-column
      label="整体评价分数"
      prop="recordCount">
    </el-table-column>
    <el-table-column
      label="评价人"
      prop="userName">
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import { getAll,deleterecord } from '@/api/record'
  export default {
    data() {
      return {
        // 全部记录
        recordDate: [],

      }
    },
    mounted(){
      getAll().then(res => {
        this.recordDate = res.list
      })
      .catch(error => {
        console.log(error);
      })
    },

    methods: {
      handleDelete(index, row) {
        deleterecord(row.recordId).then(res => {
        this.recordDate.splice(index, 1);
      })
      .catch(error => {
        console.log(error);
      })
      }
    }
  }
</script>