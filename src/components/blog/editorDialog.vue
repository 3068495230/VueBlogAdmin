<!--
 * @Description: 弹框编辑组件
 * @Author: CY小尘s
 * @Date: 2021-06-29 12:00:50
 * @LastEditTime: 2021-06-29 17:18:41
 * @LastEditors: 学习
-->
<template>
  <div class="editorDialog">
    <!-- 标题与分类 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择文章分类">
            <el-option v-for="(item, key) in classify" :key="key" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <!-- 富文本 -->
        <Quill @content='content' :value="editorContent.content"></Quill>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editorTrue('ruleForm')">确定</el-button>
    </div>
  </div>
</template>

<script>
// 引入富文本
import Quill from './quill.vue'
// 引入公有函数 time 获取当前时间
import time from '../../assets/js/time.js'

export default {
    name: 'editorDialog',
    components: {
        Quill
    },
    props: {
        editorContent: {
            type: Object
        }
    },
    data(){
        return{
            // 存放分类信息
            classify: '',
            // 用于清空富文本内容
            value: '',
            // 用户输入内容
            ruleForm: {
                title: this.editorContent.title,
                region: this.editorContent.classify,
                content: ''
            },
            // 验证规则
            rules: {
                title: [
                    { required: true, message: '请编写标题', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 获取分类信息
        getClassify(){
            this.$http.get('/classify').then(res => {
                this.classify = res.data
            }, err => {
                console.log(err)
            })
        },
        // 提交编辑内容
        editorTrue(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const data = {
                        title: this.ruleForm.title,
                        classify: this.ruleForm.region,
                        content: this.ruleForm.content,
                    }
                    // 获取 id
                    let id = this.editorContent.id
                    // 通过 id 修改
                    this.$http.patch(`blog/${id}`, data).then(res => {
                        // 刷新页面
                        location.reload()
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        })
                    }, err => {
                        console.log(err)
                    })
                }else{
                    this.$message.error('修改出错!')
                }
            })
        },
        // 获取富文本内容
        content(value){
            this.ruleForm.content = value
        }
    },
    mounted(){
        // 获取分类信息
        this.getClassify()
    }
}
</script>

<style lang="less" scoped>
.editorDialog{
    width: 100%;
    .dialog-footer{
        margin: 0px 0px 0px 100px;
    }
}
</style>