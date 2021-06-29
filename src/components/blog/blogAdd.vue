<template>
    <div class="blogAdd">
        <!-- 标签页 -->
        <el-tabs type="border-card">
            <!-- 添加博客页 -->
            <el-tab-pane label="添加新博客">
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
                        <Quill @content='content'></Quill>
                    </el-form-item>
                </el-form>
                <!-- 提交按钮 -->
                <el-button type="primary" @click="submitBlog('ruleForm')">添加文章</el-button>
                <el-button type="warning" @click="resetForm('ruleForm')">重置内容</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 引入富文本组件
import Quill from './quill.vue'
// 引入公有函数 time 获取当前时间
import time from '../../assets/js/time.js'

export default {
    name: 'blogAdd',
    components: {
        Quill,
    },
    data(){
        return {
            // 用户输入内容
            ruleForm: {
                title: '',
                region: '',
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
            },
            // 存放分类信息
            classify: '',
            // 用于清空富文本内容
            value: ''
        }
    },
    methods: {
        // 添加文章
        submitBlog(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const data = {
                        title: this.ruleForm.title,
                        classify: this.ruleForm.region,
                        content: this.ruleForm.content,
                        author: sessionStorage.getItem('name'),
                        posttime: time.newDate()
                    }
                    this.$http.post('blog', data).then(res => {
                        console.log(res)
                        // 刷新页面
                        location.reload()
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        })
                    }, err => {
                        console.log(err)
                    })
                }else{
                    this.$message.error('提交出错!')
                }
            })
        },
        // 清空输入内容
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        // 获取文章分类
        getClassify(){
            this.$http.get('/classify').then(res => {
                this.classify = res.data
            }, err => {
                console.log(err)
            })
        },
        // 获取富文本输入内容
        content(value){
            this.ruleForm.content = value
        }
    },
    mounted(){
        this.getClassify()
    }
}
</script>

<style lang="less" scoped>
.blogAdd{
    width: 100%;
    h1{
        margin: 10px 0px 20px 25px;
        color: rgb(64, 158, 255);
    }
    // 提交按钮
    button.el-button.el-button--primary{
        margin: 10px 0px 20px 100px;
    }
    // 重置按钮
    button.el-button.el-button--warning{
        margin: 00px 0px 0px 25px;
    }
}
</style>
