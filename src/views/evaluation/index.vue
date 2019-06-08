<template>
  <div >
    <div class="transition-box" v-html="infomas"></div>
    <el-table :data="AllNorm" style="width: 100%,text-align:center,margin-left: 40px;">
      <el-table-column label="评价指标" prop="name"></el-table-column>
      <el-table-column label="评价方面" min-width="300px" prop="detail"></el-table-column>
      <el-table-column label="权重系数" prop="whights"></el-table-column>
      <el-table-column label="评分">
        <template slot-scope="scope">
          <!-- verification这个词语是验证的意思，嘎嘎嘎 -->
          <el-input :disabled="once>0"
            v-model="roweval[scope.$index]" clearable placeholder="满分100的整数"
            @keyup.native="verification(scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    你的评价总分是：
    <el-tag type="danger" v-text="thecount"></el-tag>
    <el-button :disabled="once>0"  type="primary" class="hadder_insert_button" @click="submitCount()">提交</el-button>
  </div>
</template>

<script>
import { getAllSchool } from '@/api/school'
import { mavonEditor } from 'mavon-editor'
import { getnorn } from "@/api/norm";
import { insertRecord } from "@/api/record"
  export default {
    data() {
      return {
        //   html文本
       infomas:'',
      //  评价标准
       AllNorm:[],
      //  每行的分数
       roweval:[],
      //  once
      once:0,
      // 返回的总分
      thecount:0,
      }
    },
    mounted() {
      // 获得顶部html
      getAllSchool().then(res => {
        this.infomas=res.list[1].manage
        }).catch(error => {
        console.log(error)
      })
      // 获得评论标准
      getnorn().then(response => {
        this.AllNorm = response.list
      })
      .catch(error => {
        console.log(error);
      });
    },
    methods: {
      /**
       *  方法：根据id查询是否有评价记录，返回值替代once中的0
       *    如果有评价记录：查询行数返回值替代once，返回总分
       *    没有评价记录：可以评价
       */


      verification(index){
        this.roweval[index]=this.roweval[index].replace(/[^\.\d]/g,'');
        this.roweval[index]=this.roweval[index].replace('.','');
      },

      /**
       * 评分：
       *  1、定义一个数组，利用索引获取每行的分数
       *  2、map方法遍历获取每行的权重系数，获得数组
       *  3、做乘法
       */
      submitCount(){
        var myCournt = 0;
        // 这是每一行的分数this.roweval
        // console.log(this.roweval);

        // 这是每行的权重系数 everCount
        let everCount = this.AllNorm.map(v => v.whights)
        // console.log(everCount);
        for (let index = 0; index < everCount.length; index++) {
          console.log( this.roweval[index]/100  );
          // console.log( everCount[index]);
          myCournt += this.roweval[index] * everCount[index]/100;
        }
        console.log("总成绩："+myCournt);
        if (myCournt !=NaN && myCournt>0&&myCournt<101) {
          this.thecount = myCournt
          this.once = 1
          this.$notify({
          title: '评价成功',
          message: '你对企业的评价总分是：'+myCournt
          });
        
          let record ={}
          record.userId = 1
          record.count = myCournt
          insertRecord(record).then(res => {
            }).catch(error => {
            console.log(error)
          })

        }else{
          this.$notify({
          title: '评论失败',
          message: '评论要求1至100的整数，不得有空缺评论'
        });
        }
      }
    },
  }
</script>
<style>
.transition-box {
    margin-bottom: 10px;
    width: 90%;
    border-left-width: 50px;
    margin-left: 60px;
    margin-top: 50px;
    border-radius: 4px;
    background-color: rgb(247, 247, 252);
    color: black;
    border: 1;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .hadder_insert_button{
        margin-right: ‒200;
        float: right;
        margin: 5px;
        margin-right: 30px;
        margin-bottom: 50px;
    }
</style>
