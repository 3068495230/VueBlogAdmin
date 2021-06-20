<!--
 * @Description: 登录页
 * @Author: CY小尘s
 * @Date: 2021-04-11 17:46:07
 * @LastEditTime: 2021-04-16 10:10:26
 * @LastEditors: 学习
-->
<template>
  <div class="login">
    <h1>后台管理系统</h1>
    <!-- 使用 element-ui 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 验证账号 -->
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <!-- 验证密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  // 为什么在组件的 data 得以返回的方式写？
  // 形成闭包
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
            { min: 5, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
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
        alert('账号或密码不能为空！')
        return
      }
      // 发送请求
      this.$http.get('/user').then(res => {
        // 
        if(res.statusText == 'OK' && res.status == 200){
          // 
          let {account, password} = res.data[0]
          // 
          if(this.ruleForm.account == account && this.ruleForm.password == password){
            // 缓存本地账户信息
            sessionStorage.setItem('username', this.ruleForm.account)
            // 并跳转到首页
            this.$router.push('/home')
            return
          }
          alert('账号或密码错误')
        }
      }, err => {
        console.log('请求出错！', err)
      })
    }
  }
};
</script>

<style lang="less" scope>
  .login{
    width: 400px;
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