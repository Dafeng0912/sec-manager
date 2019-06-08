<template>
    <el-main>
    <el-row>
      <template>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="andleInsert()">添加角色</el-button>
      </template>
    </el-row>
  <el-table
    :data="roleDate"
    v-loading="listLoading"
    style="width: 100%">
    
    <el-table-column
      label="角色标签"
      width="300"
      prop="id">
    </el-table-column>
    <el-table-column
      label="角色内容"
      width="480"
      prop="role">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-main>
</template>
<script>

import { getRole,updateRole,deletRole,insertRole } from "@/api/role"
  export default {
    data() {
      return {
        roleDate:[],
        listLoading:true
      }
    },
    mounted() {
      getRole().then(res => {
        this.roleDate = res.list
        this.listLoading=false
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            deletRole(row.id).then(response => {
                    if(response.id == 1){
                        this.roleDate.splice(index, 1);
                    }
                })
                .catch(error => {
                console.log(error);
                });
            this.$message({
                type: "success",
                message: "删除成功!"
            });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
            });
        },
      handleEdit(index, row) {
        let edit = {};
        this.$prompt("请修改角色名称", "提示", {
            confirmButtonText: "确定",
            inputValue: row.role,
            closeOnClickModal: false,
            cancelButtonText: "取消",
            inputPattern: /^[\s|\S]{1,}$/,
            inputErrorMessage: "难度名称不得为空"
        })
            .then(({ value }) => {
            edit["id"] = row.id;
            edit["role"] = value;
            updateRole(edit)
                .then(response => {
                })
                .catch(error => {
                console.log(error);
                });
            row["role"] = value;
            this.$message({
                type: "success",
                message: "角色名称修改成功: " + value
            });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "取消输入"
            });
            });
      },

        // 添加角色
      andleInsert() {
        this.$prompt("请输入角色名称", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            inputPattern: /^[\s|\S]{1,}$/,
            inputErrorMessage: "角色名称不得为空"
           }).then(({ value }) => {
            let newobj = {};
            newobj["role"] = value;
            insertRole(newobj)
                .then(response => {
                newobj["id"] = response.id;
                this.roleDate.push(newobj);
                })
                .catch(error => {
                console.log(error);
                });
            this.$message({
                type: "success",
                message:  value + "角色名称添加成功" 
            });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "取消输入"
            });
           });
        }




    }
  }  
</script>