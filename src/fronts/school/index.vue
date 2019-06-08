<template>
  <el-container style=" border: 1px solid #eee">
        <img src="@/assets/front_images/1.jpg" width="100%"/>
      <el-header  style="height: 30px;">
       <el-button type="text">登录</el-button>
    </el-header>
  <el-tabs type="border-card" tab-position="left">
  <el-tab-pane label="合作专业">
    <template>
     <div class="transition-box" v-html="schoolinfomas"></div>
    </template>
  </el-tab-pane>
  <el-tab-pane label="合作企业">
    <template>
      <div  class="transition-box" v-html="corporatemas"></div>
    </template>
    
  </el-tab-pane>
  <el-tab-pane label="办学流程">
    <template>
       <el-table ref="dragTable" v-loading="listLoading" :data="AllAdmission" row-key="id" border highlight-current-row style="width: 100%">
     
      <el-table-column width="130px" label="标题"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="800px" align="center" label="简介">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="时间点"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="参与者"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.partner }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="负责人/单位"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.schedule }}</span>
        </template>
      </el-table-column>

       </el-table>
    </template>
  </el-tab-pane>
</el-tabs>
  </el-container>
  </template>

  <script>
  // import pic from '@/assets/front/1.jpg'
  import { getAll } from '@/api/admission'
  import { getAllSchool } from '@/api/school'
  import { getAllCorporate } from '@/api/corporate'
    export default {
      data() {
        return {
          AllAdmission:[],
          schoolinfomas:"",
          corporatemas:"",
          screenHeight: document.body.clientHeight,
          
        }
      },
      mounted () {
        getAllSchool().then(res => {
            console.log(res);
            console.log(res.list[0]);
            this.schoolinfomas=res.list[0].manage
          }).catch(error => {
            console.log(error)
          }),
          getAllCorporate().then(res => {
            this.corporatemas=res.list[0].manager
            console.log(res);
          }).catch(error => {
            console.log(error)
          }),
          getAll().then(response => {
            this.AllAdmission = response.list;
            })
          .catch(error => {
            console.log(error);
          })
      },
      watch: {
      },
      methods: {
        next() {
          if (this.active++ > 2) this.active = 0;
        }
      }
    }
  </script>
  <style>
  .img-box{
	padding-bottom:100%;
}
.img-box img{
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	margin:auto;
}
  </style>
  