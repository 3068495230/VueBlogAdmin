<!--
 * @Description: 登录页
 * @Author: CY小尘s
 * @Date: 2021-04-11 17:46:07
 * @LastEditTime: 2021-06-30 17:04:00
 * @LastEditors: 学习
-->
<template>
  <div class="login">
    <h1>后台管理系统</h1>
    <!-- element-ui 表单验证登录 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 验证账号 -->
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <!-- 验证密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="login()"></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li>超级管理员账户：admin；密码：123456</li>
      <li>管理员账户：achens；密码：3068495230</li>
      <li>普通用户账户：xuyunhans；密码：3068495230</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return{
      // 输入内容
      ruleForm: {
          account: '',
          password: ''
      },
      // 效验信息
      rules: {
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ]
      },
      // 本地账户信息
      user: {
        admin: [
          {
            account: 'admin',
            name: 'admin',
            password: 123456,
            permissions: 0
          }
        ],
        achens: [
          {
            account: 'achens',
            name: 'achens',
            password: 3068495230,
            permissions: 1
          }
        ],
        xuyunhans: [
          {
            account: 'xuyunhans',
            name: 'xuyunhans',
            password: 3068495230,
            permissions: 2
          }
        ]
      }
    }
  },
  // 方法
  methods:{
    // 登录验证
    login(){
      // 判断输入是否为空
      if(this.ruleForm.account == '' || this.ruleForm.password == ''){
        this.$message({
            message: '账号或密码不能为空！',
            type: 'error'
        })
        return false
      }
      // 判断是否是普通用户登录
      if(this.ruleForm.account == this.user.xuyunhans[0].account){
        this.$message({
            message: '权限不够！无法登陆...',
            type: 'error'
        })
        return false
      }
      // 判断账号或密码是否正确
      if(this.ruleForm.account == this.user.admin[0].account){
        if(this.ruleForm.password == this.user.admin[0].password){
          // 缓存本地账户信息
          sessionStorage.setItem('account', this.user.admin[0].account)
          // 缓存本地账户名
          sessionStorage.setItem('name', this.user.admin[0].name)
          // 缓存权限信息
          sessionStorage.setItem('permissions', this.user.admin[0].permissions)
          // 并跳转到首页
          this.$router.push('/home')
          return
        }
        this.$message({
            message: '账号或密码错误！',
            type: 'error'
        })
            // 判断是否是 achens 账号登录
      }else if(this.ruleForm.account == this.user.achens[0].account){
        if(this.ruleForm.password == this.user.achens[0].password){
          // 缓存本地账户信息
          sessionStorage.setItem('account', this.user.achens[0].account)
          // 缓存本地账户名
          sessionStorage.setItem('name', this.user.achens[0].name)
          // 缓存权限信息
          sessionStorage.setItem('permissions', this.user.achens[0].permissions)
          // 并跳转到首页
          this.$router.push('/home')
          return
        }
      }
      this.$message({
          message: '账号或密码错误！',
          type: 'error'
      })
    }
  }
}
</script>

<style lang="less" scope>
.login{
  width: 400px;
  height: 100%;
  h1{
    margin: 20px 0px 20px 0px;
  }
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
  ul{
    width: 100%;
    margin: 10px 0px 0px 100px;
    li{
      margin: 5px;
    }
  }
}
</style>