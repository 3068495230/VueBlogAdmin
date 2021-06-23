<template>
    <div class="userAdd">
        <!-- element-ui 表单验证添加账号信息 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="确认密码" prop="passwords">
            <el-input type="text" v-model="ruleForm.passwords"></el-input>
        </el-form-item>
        <!-- 权限选择 -->
        <el-form-item label="权限选择" prop="permissions">
            <el-select v-model="ruleForm.permissions" placeholder="请选择权限">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
            <el-option label="超级管理员" value="2"></el-option>
        </el-select>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-form-item>
            <el-button type="primary" @click="login()">添加</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'userAdd',
    data(){
    return{
      // 输入内容
      ruleForm: {
          name: '',
          account: '',
          password: '',
          passwords: '',
          permissions: ''
      },
      // 效验信息
      rules: {
        name: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        passwords: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        permissions: [
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
}
</script>

<style lang="less" scope>
.userAdd{
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