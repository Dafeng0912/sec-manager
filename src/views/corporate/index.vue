<template>
    <div>
        <span id='titletype'  style='color: rgb(48, 49, 51); height:60px; font-size: 15px; font-weight: 800;'>合作企业信息维护</span>
        <el-button class='hadder_insert_button' icon='el-icon-circle-plus-outline' size='small' type='primary'  @click="editMavon">编辑信息</el-button>
     <div  class="transition-box" v-html="corporatemas"></div>
        
    <el-dialog
    title="markdown编辑器"
    :visible.sync="dialoginsert"
    width="80%">
        <div class="container">
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 540px"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialoginsert = false">退出编辑</el-button>
    </span>
  </el-dialog>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import { getAllCorporate,update } from '@/api/corporate'

    export default {
        data: function(){
            return {
                content:'',
                html:'',
                configs: {
                },
                corporatemas:'',
                dialoginsert:false,
                corporate:{
                  id:1,
                  manager :"",
                  userId : ""
                }
            }
        },
        mounted() {
          getAllCorporate().then(res => {
            this.corporatemas=res.list[0].manager
            console.log(res);
          }).catch(error => {
            console.log(error)
          })
        },

        components: {
        mavonEditor
        },
        methods: {
          editMavon(){
            this.dialoginsert = true
            // this.content = this.corporatemas
            this.corporate = this.corporatemas
          },
          // 将图片上传到服务器，返回地址替换到md中
          $imgAdd(pos, $file){
              var formdata = new FormData();
              formdata.append('file', $file);
              // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
              this.$axios({
                  url: '/assets/mavon',
                  method: 'post',
                  data: formdata,
                  headers: { 'Content-Type': 'multipart/form-data' },
              }).then((url) => {
                  this.$refs.md.$img2Url(pos, url);
              })
          },
          change(value, render){
              // render 为 markdown 解析后的结果
              this.html = render;
          },
          submit(){
              // console.log(this.content);
              // console.log(this.html);
              let corporate = {}
              corporate.id = 1;
              corporate.manager = this.html
              corporate.userId = 1;
              corporate.company = "青软实训";
              if(this.content!=""&&this.content.length!=0){
                update(corporate).then(res => {
                  this.$message.success('提交成功！');
                  this.corporatemas = corporate.manager
                  // 清空
                  this.content = ""
                }).catch(error => {
                  console.log(error)
                })
              }
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .hadder_insert_button{
        text-align: right;
        margin-right: ‒200;
        float: right;
        margin: 5px;
        right: 60px;
    }
     .transition-box {
    margin-bottom: 10px;
    width: 70%;
    height: 500px;
    border-left-width: 50px;
    margin-left: 100px;
    margin-top: 50px;
    border-radius: 4px;
    background-color: rgb(247, 247, 252);
    color: black;
    border: 1;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>