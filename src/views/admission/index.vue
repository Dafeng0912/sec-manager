<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-input
      placeholder="输入标题关键字进行过滤"
      v-model="search">
    </el-input>
    <el-button class='hadder_insert_button' icon='el-icon-circle-plus-outline' size='small' type='primary'  @click="dialoginsert = true">添加流程</el-button>
    <el-table :filter-node-method="filterNode" ref="dragTable" v-loading="listLoading" :data="tables" row-key="id" border highlight-current-row style="width: 100%">
     
      <el-table-column align="center"  label="ID" width="65">
        <template slot-scope="scope"  align="center" >
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="标题"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="简介">
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

      <el-table-column width="60px" label="顺序"  align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.order }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"  align="center" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="editAdmission(scope.$index,scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteAdmission(scope.$index,scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 添加模态框 -->
    <el-dialog class='skilldialog' :close-on-click-modal='false'  width='60%' title='添加流程' :visible.sync="dialoginsert" >
      <el-form ref="form" :model="addadmission"  :rules="rules"  label-width="120px">
        <el-form-item label="流程标题" prop="name">
          <el-input v-model="addadmission.name" ></el-input>
        </el-form-item>
        <el-form-item label="添加时间点" prop="time">
          <el-input v-model="addadmission.time"></el-input>
        </el-form-item>
        <el-form-item label="流程简介" prop="content">
          <el-input type="textarea" :rows="5" v-model="addadmission.content"></el-input>
        </el-form-item>
        <el-form-item label="联系人/单位" prop="schedule">
          <el-input v-model="addadmission.schedule"></el-input>
        </el-form-item>
        <el-form-item label="添加参与人员" prop="partner">
          <el-input  v-model="addadmission.partner"></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click="dialoginsert = false" size='mini' >取 消</el-button>
        <el-button type='primary' size='mini' @click="insertAdmissionDia('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改流程" :visible.sync="editAdmissionDialog">
      <el-form ref="form" :model="editDate" :rules="rules" label-width="120px">
         <el-form-item label="流程标题" prop="name">
          <el-input v-model="editDate.name" ></el-input>
        </el-form-item>
        <el-form-item label="添加时间点">
          <el-input v-model="editDate.time" prop="time"></el-input>
        </el-form-item>
        <el-form-item label="流程简介" prop="content">
          <el-input size="medium" autosize type="textarea" v-model="editDate.content"></el-input>
        </el-form-item>
        <el-form-item label="联系人/单位"  prop="schedule">
          <el-input v-model="editDate.schedule"></el-input>
        </el-form-item>
        <el-form-item label="添加参与人员" prop="partner">
          <el-input  v-model="editDate.partner"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  size="mini" @click="editAdmissionDialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="editMethods('form')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <div class="show-d">
      <el-tag>The default order :</el-tag> {{ oldList }}
    </div> -->
    <div class="show-d">
      <el-tag>流程管理排列顺序 :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script>
import { getAll,update,insert,deleteAdmission } from '@/api/admission'
import Sortable from 'sortablejs'
export default {
  data() {
    return {
       search: '',
      // 添加流程缓冲假数据
      addadmission:{},
      // 修改流程假数据
      editDate:{},
      dialoginsert:false,
      editAdmissionDialog:false,
      AllAdmission: [],
      list: null,
      total: null,
      listLoading: false,
      sortable: null,
      oldList: [],
      newList: [],
      fileList2: [],
       rules: {
        //  流程标题
          name: [
            { required: true, message: '流程标题不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '标题要求简洁，不得超过20字符', trigger: 'blur' }
          ],
          // 时间点
          time: [
            { max: 20, message: '时间点要求语言简洁凝练', trigger: 'change' }
          ],
          // 流程简介
          content: [
            { required: true, message: '流程工作内容', trigger: 'change' }
          ],
          // 联系人、单位
          schedule: [
            { required: true, message: '添加联系人或者负责单位', trigger: 'change' }
          ],
          // 参与人员
          partner: [
            { required: true, message: '请填写参与人员', trigger: 'change' }
          ],
        }
    }
  },
  computed:{
    /**
     *  在前端操作fifter过滤器使得通过过滤查询自己所要的信息
     *  1、通过v-model绑定在input输入框一个值
     *  2、在computer计算属性中获取该值
     *    2.1、判断是否有值
     *    2.2、在全体表格数据做过滤
     */
      tables:function(){
        var search=this.search;
        if(search){
          return  this.AllAdmission.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.AllAdmission
      }
    },
  created() {
    this.getList()
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
    editMethods(updatedio){
      this.$refs[updatedio].validate((valid) => {
        if (valid) {
          update(this.editDate).then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          })
          this.editAdmissionDialog = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    deleteAdmission(index,row){
       this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAdmission(row.id)
            .then(response => {
              this.AllAdmission.splice(index, 1);
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
    insertAdmissionDia(insertdio){
      // console.log(this.$refs[insertdio]);
      this.$refs[insertdio].validate((valid) => {
        if (valid) {
           insert(this.addadmission).then(res => {
             this.addadmission.push(this.addadmission)
             Object.assign(this.addadmission,{})
          })
          .catch(error => {
            console.log(error);
          })
          this.dialoginsert = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    editAdmission(index,row){
      this.editAdmissionDialog = true;
      Object.assign(this.editDate,row)
      this.editDate = row
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    async getList() {
      // this.listLoading = true
      getAll().then(response => {
        this.AllAdmission = response.list;
        this.oldList = this.AllAdmission.map(v => v.order)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
      .catch(error => {
        console.log(error);
      })
    },
    setSort() {
      // console.log(this.$refs.dragTable.$el);
      // console.log(this.$refs);
      // console.log(this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]);
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      console.log(el);
      // create方法是当 droppable 被创建时触发
      this.sortable = Sortable.create(el, {
        // selector 格式为简单css选择器的字符串，当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class，我们可以通过这种方式来给影子元素进行编辑样式；
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        // 点击鼠标开始拖拽
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          dataTransfer.setData('Text', '')
        },
        // 松开鼠标结束拖拽
        onEnd: evt => {
          // 删除自己拖动的那一行
          const targetRow = this.AllAdmission.splice(evt.oldIndex, 1)[0]
          console.log(evt.oldIndex);
          console.log(evt.newIndex);
          console.log(targetRow);
          // 然后添加到现在的位置
          this.AllAdmission.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)

          /**
           * 思路：
           *  传入后台：自身id,自身order顺序
           */
          // this.AllAdmission.map(v => v.order = v.index)
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
.hadder_insert_button{
  text-align: right;
  margin-right: ‒200;
  float: right;
  margin: 5px;
  right: 60px;
}
</style>