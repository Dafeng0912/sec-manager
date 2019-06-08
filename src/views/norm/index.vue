<template>
  <div>
    <el-row>
      <template>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogInsert = true">添加评价指标</el-button>
      </template>
    </el-row>
    <el-table :data="AllNorm" size="small" style="width: 100%">
      <el-table-column label="指标id" prop="id"></el-table-column>
      <el-table-column label="评价指标" prop="name"></el-table-column>
      <el-table-column label="评价方面" prop="detail"></el-table-column>
      <el-table-column label="权重系数" prop="whights"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i
            class="el-icon-edit"
            style="padding-left: 20px"
            @click="OpenEdit(scope.$index, scope.row)"
          ></i>
          <i
            class="el-icon-delete"
            style="padding-left: 20px"
            @click="handleDelete(scope.$index, scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加标准" :visible.sync="dialogInsert">
      <el-form :model="insertdata" :rules="rules">
        <el-form-item label="评价指标" prop="name">
          <el-input v-model="insertdata.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价方面" >
          <el-input v-model="insertdata.detail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重系数" prop="whights">
          <el-input v-model="insertdata.whights" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInsert = false">取 消</el-button>
        <el-button type="primary" @click="handleInsert">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改标准"  :rules="rules" :visible.sync="dialogEdit">
      <el-form :model="editdate">
        <el-form-item label="评价指标" prop="name">
          <el-input v-model="editdate.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重系数" prop="whights">
          <el-input v-model="editdate.whights" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getnorn, update,deletenorm,insert} from "@/api/norm";
export default {
  data() {
    return {
      AllNorm: [],
      dialogInsert :false,
      insertdata:{},
      dialogEdit:false,
      editdate:{},
      editindex:"",
      normid:1,
      rules: {
          name: [
            { required: true, message: '请输入评价指标名称', trigger: 'blur' },
            { min: 3,  message: '长度在 3 个字符以上', trigger: 'blur' }
          ],
          whights: [
            { required: true, message: '请填写评价指标权重系数', trigger: 'blur' },
            { type: 'number',max:3,min:0, message: '权重必须为大于0小于100的数字值'}
          ],
      }
    };
  },
  mounted() {
   getnorn().then(response => {
     this.AllNorm = response.list
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    OpenEdit(index,row){
      this.dialogEdit= true;
      this.editdate = row
      this.editindex = index
      this.normid = row.id
    },
    // 修改指标
    handleEdit() {
      this.editdate.id = this.normid
      update(this.editdate)
        .then(response => {
          // Object.assign(this.AllNorm[editindex],this.editdate)
          // this.AllNorm[editindex].name = this.editdate.name
          // this.AllNorm[editindex].whights = this.editdate.whights
          
          this.$message({
            type: "success",
            message: "指标名称是: " + this.editdate.name
          }).then(
            location.reload()
          )
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除指标
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletenorm(row.id)
            .then(response => {
              this.AllNorm.splice(index, 1);
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
    // 添加指标
    handleInsert() {
      insert(this.insertdata)
        .then(response => {
          this.insertdata.id = response.i;
          console.log(this.insertdata);
          this.AllNorm.push(this.insertdata);
          this.insertdata={}
        })
        .catch(error => {
          console.log(error);
        });
      this.$message({
        type: "success",
        message: "指标名称是: " + this.insertdata.name
      });
      this.dialogInsert = false
    }
  }
};
</script>