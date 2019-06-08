<template>
  <el-main>
      <template>
        <span id='titletype'  style='color: rgb(48, 49, 51); font-size: 15px; font-weight: 800;'>用户</span>
        <el-button class='hadder_insert_button' icon='el-icon-circle-plus-outline' size='small' type='primary'  @click="dialoginsert = true">添加用户</el-button>
        <el-button class='hadder_insert_button' icon='el-icon-delete' type='danger'  :disabled='manyrecommend.length==0'
                  size='small' @click='batchDelRecommendquen'>批量删除</el-button>
      </template>
      <el-table  size='small' :data='userDate' style='width: 100%'  @selection-change='batchdel'>
        <el-table-column type='selection' width='55'></el-table-column>
        <el-table-column label='学号' prop='userId'></el-table-column>
        <el-table-column label='用户名' prop='name'></el-table-column>
        <el-table-column label='性别' prop='sex'></el-table-column>
        <el-table-column label='联系方式' prop='phone'></el-table-column>
        <el-table-column label='角色' >
            <template slot-scope='scope'>
                <span v-if='scope.row.roleId == -1'>
                    <el-tag type='danger'>超级管理员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 1'>
                    <el-tag type='info'>合作专业成员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 2'>
                    <el-tag type='info'>合作专业成员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 3'>
                    <el-tag type='info'>学生</el-tag>
                </span>
            </template>
            <!-- <el-radio-group v-model='roleId' prop='roleId' size='medium'>
                <el-radio border :label='-1'>超级管理员</el-radio>
                <el-radio border :label='1'>合作专业成员</el-radio>
                <el-radio border :label='2'>合作企业成员</el-radio>
                <el-radio border :label='3'>学生</el-radio>
            </el-radio-group> -->
        </el-table-column>
        <el-table-column label='电子邮箱' prop='emial'></el-table-column>
        
        <el-table-column label='注册时间' >
          <template slot-scope="scope">
          <span>{{ new Date(scope.row.admissionTime) }}</span>
        </template>
        </el-table-column>
        <el-table-column label='查看权限'>
          <!-- 查看权限 @show='showpaper(scope.$index,scope.row)'  -->
          <template slot-scope="scope">
            <el-tag 
            size="mini"
             v-for="tag in scope.row.list"
             :key="tag.id">
             {{tag.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align='center' label='操作'>
        <template slot-scope='scope'>
          <i class='el-icon-edit-outline' style='padding-left: 20px' @click='edit_transmit(scope.$index, scope.row);'></i>
          <i class='el-icon-delete' style='padding-left: 20px' @click='handleDelete(scope.$index, scope.row)'></i>
        </template>
        </el-table-column>
      </el-table>

 
    <!-- 修改用户 -->
    <el-dialog class='skilldialog' label-width='100px'  :close-on-click-modal='false'  width='60%'  title='修改用户模板' :visible.sync='dialogmodify'  >
        <el-form status-icon :model='modifyuser' :rules='rules'
      ref='dialogmodify' size='mini' label-width='100px'  class='demo-dynamic;demo-ruleForm'>
        <el-form-item  label='填写姓名'  prop='nameRule'>
          <el-input v-model='modifyuser.name'  placeholder='请填写姓名'></el-input>
        </el-form-item>
        <el-form-item  label='角色'  prop='roleRule'>
          <template >
            <el-select v-model="modifyuser.roleId" placeholder="请选择">
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.role"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item  label='学号/工号' prop='userIdRule' >
          <!-- 利用autocomplete='off'禁用自动完成功能的表单 -->
          <el-input v-model='modifyuser.userId'  placeholder='请填写你的学号或者工号'></el-input>
        </el-form-item>
        <el-form-item  label='性别'  prop='sexRule'>
          <template >
            <el-radio-group v-model='modifyuser.sex'>
                <el-radio :label='1'>男</el-radio>
                <el-radio :label='0'>女</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item  label='填写邮箱'  prop='emailRule'>
          <el-input v-model='modifyuser.emial'  placeholder='请填写邮箱'></el-input>
        </el-form-item>
        <el-form-item  label='联系方式'  prop='emailRule'>
          <el-input v-model='modifyuser.phone'  placeholder='请填写手机号'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer' :model='form' >
        <el-button size='small' @click='dialogmodify = false;'>取 消</el-button>
        <el-button size='small' type='primary' @click='editsubmit()'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量删除模态框 -->
    <el-dialog title='确认删除' ref='manyrecommend' :close-on-click-modal='false'  :visible.sync='dialogTableLog' size='small'>
        <el-table :data='manyrecommend'>
        <el-table-column label='学号' prop='userId'></el-table-column>
        <el-table-column label='用户名' prop='name'></el-table-column>
        <el-table-column label='性别' prop='sex'></el-table-column>
        <el-table-column label='联系方式' prop='phone'></el-table-column>
        <el-table-column label='角色' >
            <template slot-scope='scope'> 
                <span v-if='scope.row.roleId == -1'>
                    <el-tag type='danger'>超级管理员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 1'>
                    <el-tag type='info'>合作专业成员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 2'>
                    <el-tag type='info'>合作专业成员</el-tag>
                </span>
                <span v-if='scope.row.roleId == 3'>
                    <el-tag type='info'>学生</el-tag>
                </span>
            </template>
            <el-table-column label='电子邮箱' prop='emial'></el-table-column>
            <el-table-column label='注册时间' prop='admissionTime'></el-table-column>
          </el-table-column>
        </el-table>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogTableLog = false'>取 消</el-button>
          <el-button type='primary' size='mini' @click='batchDelRecommend();dialogTableLog = false'>确 定</el-button>
        </span>
    </el-dialog> 

    <!-- 添加模态框 -->
    <el-dialog class='skilldialog' :close-on-click-modal='false'  width='60%' @close='closeDialog("addDatadialog")' title='添加成员' :visible.sync="dialoginsert"  >
      <el-form status-icon :model='addData' :rules='rules'
      ref='addDatadialog' size='mini' label-width='100px'  class='demo-dynamic;demo-ruleForm'>
        <el-form-item  label='填写姓名'  prop='nameRule'>
          <el-input v-model='addData.name'  placeholder='请填写姓名'></el-input>
        </el-form-item>
        <el-form-item  label='角色'  prop='roleRule'>
          <template >
            <el-select v-model="addData.roleId" placeholder="请选择">
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.role"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item  label='学号/工号' prop='userIdRule' >
          <!-- 利用autocomplete='off'禁用自动完成功能的表单 -->
          <el-input v-model='addData.userId'  placeholder='请填写你的学号或者工号'></el-input>
        </el-form-item>
        <el-form-item  label='性别'  prop='sexRule'>
          <template >
            <el-radio-group v-model='addData.sex'>
                <el-radio :label='1'>男</el-radio>
                <el-radio :label='0'>女</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label='权限'  prop='perRule'>
          <template>
            <el-select v-model="userpermission" multiple placeholder="请选择">
              <el-option
                v-for="item in permission"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item  label='填写邮箱'  prop='emailRule'>
          <el-input v-model='addData.emial'  placeholder='请填写邮箱'></el-input>
        </el-form-item>
        <el-form-item  label='联系方式'  prop='emailRule'>
          <el-input v-model='addData.phone'  placeholder='请填写手机号'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='closeDialog("addDatadialog")' size='mini' >取 消</el-button>
        <el-button type='primary' size='mini' @click='apprecommendandpaper()'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页插件 -->
    <div class='block' id='pagerecommend'>
      <el-pagination
        @size-change='recommendhandleSizeChange'
        @current-change='recommendhandleCurrentChange'
        :current-page.sync='recommendpage.currentPage'
        :page-size='recommendpage.pageSize'
        :page-sizes='[10, 20, 50, 100]'
        layout='total, sizes, prev, pager, next, jumper'
        :total='recommendpage.total'>
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
import { isArray } from 'util';
import { getuser,updateuser,deletuser,insertuser,getUserPer } from "@/api/theuser"
import { getRole } from "@/api/role"
import { getPromission, userGetPer,ueerEditPer} from "@/api/permission"
export default {
  data() {
    return {
      // 添加用户输入框
      addData: {
        userId: '',
        name: '',
        roleId: '',
        sex:'',
        phone:'',
        permissionId:'',
        admissionTime:'',
        emial:''
      },
      // 角色
      role:[],
      // 用户分配的权限列表
      perlist:[],
      // 修改的用户
      modifyuser:{},
      // 修改中索引
      editinsex:1,
      // 所有权限
      permission:[],
      // 用户选择权限
      userpermission:[],
      // 加载模式
      recommendpage: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      // 修改的用户数据
      editDate:{},
      // ***所有用户
      userDate: [],
      // 批量删除
      manyrecommend: [],
      // 删除用户
      deletediglig:[],
      // 用户添加模态框显示
      dialoginsert: false,
      // 用户添加试卷模态框显示
      dialoginsertpaper: false,
      // 用户修改模态框显示
      dialogmodify: false,
      // 用户删除模态框显示
      dialogTableAlone:false,
      // 批量删除模态框
      dialogTableLog:false,
      // 用户试卷展示模态框
      dialogFormVisible: false,
      form: {
        type: [],
        resource: ''
      },
      // 技能级联框
      Skills: [], // 级联技能信息
      skill: {},
      skillList: [],
      // 技能级联框prop信息
      skillProps: {
        value: 'id',
        label: 'name',
        children: 'childrens'
      },
      selectedOptions: [-1],
      formLabelWidth: '120px',
      select: '',
      rules: {
        userIdRule: [
          { required: true, message: '学号/工号不得为空', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '请填写正确的学好/工号',
            trigger: 'blur'
          }
        ],
        nameRule: [
          { required: true, message: '姓名不得为空', trigger: 'blur' },
          { max: 20, message: '请正确填写', trigger: 'blur' }]
      },
    };
  },
  watch: {
    beselected: function(newVal, oldval) {}
  },
  mounted() {
     getUserPer().then(response => {
       console.log(response);
        this.userDate = response.list;
        this.listLoading = "true"
      })
      .catch(error => {
        console.log(error);
      });
      getRole().then(response => {
        this.role = response.list;
        // linshi.forEach(el => {
        //   this.role.push(el.role)
        // });
        // console.log(this.role);
      })
      .catch(error => {
        console.log(error);
      });
      getPromission().then(response => {
        this.permission = response.list;
      })
      .catch(error => {
        console.log(error);
      });
  },  
  methods: {
    closeDialog(theref){
      // 关闭模态框
      this.dialoginsert = false;
      // 试卷数组清空
      Object.assign(this.addData,{})
      // 重置对象
      // this.$refs[theref].resetFields();
    },

    // 修改页面
    edit_transmit(index,row){
      this.editinsex  = index
      this.dialogmodify = true;
      this.modifyuser = Object.assign({},row)
    },

    isInArray(arr, value) {
      // 判断该对象是否在数组中存在
      if (typeof arr == 'undefined') {
        return false;
      }
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i].id) {
          return true;
        }
      }
      return false;
    },
   

   
   
    // 判断对象在数组中的索引值
    getindex(arr,val){
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == val) return i;
      }
      return -1;
    },
    // 批量删除
    batchDelRecommendquen(){
      this.dialogTableLog = true
    },
    // 批量删除
    batchDelRecommend() {
      let recommendids = [];
      for (let erecommend of this.manyrecommend) {
        let getid = {};
        getid.recommendId = erecommend.recommendId;
        recommendids.push(getid);
      }
      let batch = JSON.stringify(recommendids)
      delBatchRecommend(batch)
        .then(res => {
          // console.log(this.manyrecommend);
          if (res.flag == true) {
            this.sendMsg('success', '删除成功!');
            history.go(0)
          } else {
            this.sendMsg('danger', '删除失败!');
          }
        })
        .catch(err => {});
    },

    sendMsg(type, msg) {
      this.$message({
        type: type,
        message: msg
      });
    },

    batchdel(val) {
      this.manyrecommend = val;
      // console.log(val);
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currentPage = 1;
      this.getExamPaperDyInsert();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getExamPaperDyInsert();
    },

    EdithandleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currentPage = 1;
      this.getExamPaperDyPage();
    },
    EdithandleCurrentChange(val) {
      // console.log(this.selectedOptions);
      this.page.currentPage = val;
      if (this.selectedOptions==-1) {
        this.getExamPaperDyPage();
      }else{
        this.getEpBySkillId()
      }
    },

    recommendhandleSizeChange(val) {
      this.recommendpage.pageSize = val;
      this.recommendpage.currentPage = 1;
      this.getRecommendForInit();
    },
    recommendhandleCurrentChange(val) {
      this.recommendpage.currentPage = val;
      this.getRecommendForInit();
    },

    getRecommendForInit(){
      getAllRecommend(this.recommendpage.currentPage, this.recommendpage.pageSize)
      .then(response => {
        this.userDate = response.info.list;
        // console.log(response);
        this.recommendpage.total = response.total;
      })
      .catch(error => {
        console.log(error);
      });
    },
    //  删除用户模态框
    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteLevel(row.id)
            .then(response => {
              this.levelData.splice(index, 1);
            })
            .catch(error => {
              console.log(error);
            });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    isInArray(arr, value) {
    // 判断该对象是否在数组中存在
      for (var i = 0; i < arr.length; i++) {
        if (value.id === arr[i].id) {
          return true;
        }
      }
      return false;
    },

    // 提交修改
    editsubmit() {
      updateuser(this.modifyuser).then(response => {
        if (response.id == 1) {
          this.dialogmodify = false
          Object.assign(this.userDate[this.editinsex],this.modifyuser)
        }
      })
      .catch(error => {
        console.log(error);
      });
    },

  
    //  删除用户
    truedelete(index,row){
     
    },
   
    // **添加用户
    apprecommendandpaper() {
      console.log(this.userpermission);
      insertuser(this.addData).then(res => {
        if (res.total) {
          this.addData.admissionTime = res.total
          this.userDate.push(this.addData)
          this.$message('用户添加成功，初始密码是123456');

          insertuser(this.addData).then(res => {
            if (res.total) {
              this.addData.admissionTime = res.total
              this.userDate.push(this.addData)
              this.$message('用户添加成功，初始密码是123456');
            }
          }).catch(error => {
            console.log(error)

          })
        }
      }).catch(error => {
        console.log(error)

      })
      Object.assign(this.addData,{})
      this.dialoginsert = false
    }
  }
};
</script>
<style>
#hadder_search_button {
  float: left;
  margin-left: 20px;
}
#hadder_input_button {
  float: left;
}
#serchinput {
  width: 50%;
  float: left;
}
#paper_serchtype {
  width: 120px;
}
#exampagination {
  text-align: right;
}
.tagp{
  text-align: left;
}
#pagerecommend{
  text-align: right;
  padding-top: 50px;
}
.the_skill_cascader{
  text-align: right
}
.hadder_insert_button{
  text-align: right;
  margin-right: ‒200;
  float: right;
  margin: 5px;
  right: 60px;
}
/* .skilldialog{
  width: 60%;
} */
</style>
