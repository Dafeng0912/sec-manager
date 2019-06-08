<template>
    <div>
      <div>
        <span id='titletype'  style='color: rgb(48, 49, 51); height:60px; font-size: 15px; font-weight: 800;'>合作校院信息维护</span>
        <el-button class='hadder_insert_button' icon='el-icon-circle-plus-outline' size='small' type='primary'  @click="dialoginsert = true">编辑信息</el-button>
      <div  class="transition-box" v-html="schoolinfomas"></div>
      </div>

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
    import { getAllSchool,update } from '@/api/school'

    export default {
        data: function(){
            return {
                content:'',
                html:'',
                configs: {
                },
                schoolinfomas:'',
                dialoginsert:false,
            }
        },
        mounted() {
          getAllSchool().then(res => {
            console.log(res);
            console.log(res.list[0]);
            this.schoolinfomas=res.list[0].manage
          }).catch(error => {
            console.log(error)
          })
        },

        components: {
        mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
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
                let schoolinfo = {}
                schoolinfo.id = 1;
                schoolinfo.manager = this.html
                schoolinfo.userId = 1;
                if(this.content!=""&&this.content.length!=0){
                  update(schoolinfo).then(res => {
                    this.$message.success('提交成功！');
                    this.schoolinfomas = corporate
                    console.log(res);
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
 .transition-box {
    margin-bottom: 10px;
    width: 70%;
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
</style>