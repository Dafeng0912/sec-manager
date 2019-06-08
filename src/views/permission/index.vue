<template>
  <div>
  <el-table
    :data="permission"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="标号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="depict"
      label="权限描述">
    </el-table-column>
    <el-table-column align='center' label='操作'>
        <template slot-scope='scope'>
          <i class='el-icon-document' style='padding-left: 20px' @click='selecrUser(scope.$index, scope.row)'></i>
        </template>
    </el-table-column>


  </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">

      <el-tag
        v-for="tag in user"
        :key="tag.id"
        @close="handleClose(tag.perId,tag.userId)"
        closable>
        {{tag.userName}}
        
      </el-tag>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPromission,perGEtUser,deletePro } from "@/api/permission"
  export default {
    data() {
      return {
        permission:[],
        dialogVisible :false,
        user:[],
        indexdelect:1,
      }
    },
    mounted() {
      getPromission().then(res => {
        this.permission = res.list
      }).catch(error => {
        console.log(error)
      })
    },
    methods : {
      handleClose(perId,userId) {
        deletePro(perId,userId).then(res => {
        // this.user.splice(this.user.indexOf(tag), 1);
        }).catch(error => {
          console.log(error)
          // history.go(0);
        })
      },
      selecrUser(index,row){
        const h = this.$createElement;
        perGEtUser(row.id).then(res => {
          console.log(res);
          if (res.list.length != 0) {
            this.user = res.list
            this.dialogVisible = true
            this.indexdelect = row.id
           }else{
             this.$notify({
                title: '提醒',
                message: h('i', { style: 'color: teal'}, '该权限没有用户使用')
              });
           }
        }).catch(error => {
          console.log(error)
        })
      },
    }
  }
</script>
