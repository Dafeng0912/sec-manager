<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> name: {{ name }}
      <el-button type="primary" style="float:right" @click="editStatus" >修改个人信息</el-button>
    </div>

    <div class="mainTable">
      <el-form ref="form" :model="selfuser" label-width="120px">
        <el-form-item label="姓名" >
          <el-input v-model="selfuser.name" :disabled="true" style="width:300px"/>
        </el-form-item>
        <el-form-item label="学号/工号">
          <el-input v-model="selfuser.userId" :disabled="true" style="width:300px"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-tag>{{selfuser.userId==1?'男':'女'}}</el-tag>
        </el-form-item>
        <el-form-item label="权限" v-if="selfuser.list!=null">
          <!-- <el-tag type="success" v-for="selfuser.list"></el-tag> -->
           <el-tag
            v-for="tag in selfuser.list"
            :key="tag.id">
            {{tag.name}}
          </el-tag>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input  placeholder="请输入正确的手机号"  @keyup.native="verification('phone')" v-model="selfuser.phone" :disabled="editbutton" style="width:300px" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input @keyup.native="verification('emial')" v-model="selfuser.emial":disabled="editbutton" style="width:300px"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getself,updateuser } from "@/api/theuser"
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
    getself(1).then(res => {
      console.log(res);
      this.selfuser = res.list[0]
      }).catch(error => {
      console.log(error)
    })
  },
  watch:{
    selfuser:{
       handler(newVal) {
        // console.log(newVal);
        // this.usereditboolean=true;
        // console.log(this.usereditboolean);
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      selfuser:{},
      // 修改按钮
      editbutton:true,
      // 监测个人信息是否改变的boolean值
      usereditboolean:false,
    }
  },
  methods: {
    verification(src){
      /**
       * 准备做手机号码和电子邮件的正则表达
       */
    },
    editStatus(){
     this.editbutton = !this.editbutton
     if (this.editbutton == true) {
      updateuser(this.selfuser).then(res => {
        console.log(res);
        }).catch(error => {
        console.log(error)
      })
     }
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style>
.mainTable{
  /* text-align: center; */
  width: 60%;
  margin:0 auto;
  /* background-color: blue; */
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.line{
  text-align: center;
}
</style>
