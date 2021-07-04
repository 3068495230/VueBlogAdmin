<template>
  <div class="userAdd">
    <el-tabs type="border-card">
      <el-tab-pane label="添加用户">
        <!-- element-ui 表单验证添加账号信息 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- 昵称 -->
            <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleForm.name" maxlength="7"></el-input>
            </el-form-item>
            <!-- 账号 -->
            <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm.account" oninput="value=value.replace(/[^\d\w]/g,'')" maxlength="11"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" maxlength="11"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="确认密码" prop="passwords">
                <el-input type="password" v-model="ruleForm.passwords" maxlength="11"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="Email:" prop="email" required>
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="联系电话:" prop="phone" required>
                <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
            </el-form-item>
            <!-- 权限选择 -->
            <el-form-item label="权限选择" prop="permissions">
                <el-select v-model="ruleForm.permissions" placeholder="请选择权限">
                <el-option label="普通用户" value="2"></el-option>
                <el-option label="管理员" value="1"></el-option>
                <el-option label="超级管理员" value="0"></el-option>
            </el-select>
            </el-form-item>
            <!-- 添加按钮 -->
            <el-form-item>
                <el-button type="primary" @click="addAccount('ruleForm')">添加</el-button>
            </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
// 引入公有函数 time 获取当前时间
import time from '../../assets/js/time.js'

export default {
    name: 'userAdd',
    data(){
      // 验证确认密码
      var validatePass2 = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请再次输入密码'))
        }else if(value !== this.ruleForm.password){
          callback(new Error('输入密码不一致!'))
        }else{
          callback()
        }
      }
      // 验证邮箱
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if(!value){
          return callback(new Error('邮箱不能为空'))
        }
        if(mailReg.test(value)){
          callback()
        }else{
          callback(new Error('请输入正确的邮箱格式'))
        }
      }
      // 验证手机号
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if(!value){
          return callback(new Error('电话号码不能为空'))
        }
        if(!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        }else{
          if (phoneReg.test(value)) {
            callback()
          }else{
            callback(new Error('电话号码格式不正确'))
          }
        }
      }
      return{
        // 输入内容
        ruleForm: {
            name: '',
            account: '',
            password: '',
            passwords: '',
            email: '',
            phone: '',
            permissions: ''
        },
        // 效验信息
        rules: {
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
          ],
          permissions: [
            { required: true, message: '请选择权限信息', trigger: 'blur' }
          ],
          // 验证邮箱
          email: [
            { required: true, validator: checkEmail, trigger: 'blur' }
          ],
          // 验证手机号
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ]
        }
      }
  },
  // 方法
  methods:{
    // 添加账号
    addAccount(formName){
      // 获取当前权限
      let permissions = sessionStorage.getItem('permissions')
      // 判断是否有权限进行操作
      if(permissions != 2){
          this.$message({
              type: 'error',
              message: '无权限操作！'
          })
          return false
      }
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$message({
              message: 'dev 分支没有后台哦！无法添加新用户...',
              type: 'info'
          })
        }else{
          this.$message({
            message: '验证失败...',
            type: 'error'
          })
        }
      })
    }
  },
  mounted(){
    // 获取当前权限
    let permissions = sessionStorage.getItem('permissions')
    // 判断是否有权限进行操作
    if(permissions != 2){
        this.$message({
            type: 'info',
            message: '当前账户权限不可添加用户哦'
        })
        return false
    }
  }
}
</script>

<style lang="less" scope>
.userAdd{
  width: 530px;
  height: 100%;
  .el-form{
    .el-form-item{
      .el-form-item__content{
        .el-input{
          .el-input__inner{
            width: 350px;
          }
        }
      }
    }
  }
  h1{
    margin-left: 100px;
    height:  40px;
  }
}
</style>