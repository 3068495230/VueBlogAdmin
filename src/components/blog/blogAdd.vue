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
                            <el-option label="分类" value="分类"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章内容" prop="content">
                        <!-- 富文本 -->
                        <Quill></Quill>
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
import Quill from './quill.vue'
export default {
    name: 'blogAdd',
    components: {
        Quill,
    },
    data(){
        return {
            ruleForm: {
                title: '',
                region: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请编写标题', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请编写内容', trigger: 'blur' },
                    { min: 10, message: '至少十个字符串', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 添加文章
        submitBlog(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('提交出错！')
                    return false
                }
            })
        },
        // 清空输入内容
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
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
