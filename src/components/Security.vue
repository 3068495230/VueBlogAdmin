<template>
  <div class="secunity">
    <!-- 标签页 -->
    <el-tabs type="border-card">
      <!-- 账号信息页 -->
      <el-tab-pane label="账号信息">
        <!-- 头像 -->
        <el-row>
          <el-col :span="1.5">
            <p>头像</p>
          </el-col>
          <el-col :span="1">
            <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </el-col>
        </el-row>
        <!-- 昵称 -->
        <el-row>
          <el-col :span="1.5">
            <p>昵称：</p>
          </el-col>
          <el-col :span="1">
            <span :style="name == '网络错误' ? 'color:red' : ''">{{ name }}</span>
          </el-col>
        </el-row>
        <!-- 账号 -->
        <el-row>
          <el-col :span="1.5">
            <p>账号：</p>
          </el-col>
          <el-col :span="1">
            <span :style="name == '网络错误' ? 'color:red' : ''">{{ account }}</span>
          </el-col>
        </el-row>
        <!-- 邮箱 -->
        <el-row>
          <el-col :span="1.5">
            <p>邮箱：</p>
          </el-col>
          <el-col :span="1">
            <span :style="name == '网络错误' ? 'color:red' : ''">{{ email }}</span>
          </el-col>
        </el-row>
        <!-- 手机号 -->
        <el-row>
          <el-col :span="1.5">
            <p>手机号：</p>
          </el-col>
          <el-col :span="1">
            <span :style="name == '网络错误' ? 'color:red' : ''">{{ phone }}</span>
          </el-col>
        </el-row>
        <!-- 注销 -->
        <el-row>
          <el-col :span="3">
            <!-- 退出登录 -->
            <el-button type="primary" @click="goBack">退出</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 修改密码页 -->
      <el-tab-pane label="修改密码">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
              <el-button type="primary" @click="submitPassWord('ruleForm')">提交</el-button>
              <el-button @click="resetPassWord('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 修改邮箱页 -->
      <el-tab-pane label="修改邮箱">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleEmail" label-width="90px" class="demo-ruleForm">
          <el-form-item label="Email:" prop="buyerEmail" required>
              <el-input v-model="ruleForm.buyerEmail"></el-input>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
              <el-button type="primary" @click="submitEmail('ruleEmail')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 修改手机号页 -->
      <el-tab-pane label="修改手机号">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="rulePhone" label-width="90px" class="demo-ruleForm">
          <el-form-item label="联系电话:" prop="buyerPhone" required>
              <el-input v-model="ruleForm.buyerPhone"></el-input>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
              <el-button type="primary" @click="submitPhone('rulePhone')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    name: 'Secunity',
    data(){
      // 验证密码
      var validatePass = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback()
        }
      }
      // 验证确认密码
      var validatePass2 = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请再次输入密码'))
        }else if(value !== this.ruleForm.pass){
          callback(new Error('两次输入密码不一致!'))
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
      return {
        // 用户输入
        ruleForm: {
          // 密码
          pass: '',
          // 确认密码
          checkPass: '',
          // 邮箱
          buyerEmail: '',
          // 手机号
          buyerPhone: ''
        },
        // 验证规则
        rules: {
          // 验证密码
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          // 验证确认密码
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          // 验证邮箱
          buyerEmail: [
            { required: true, validator: checkEmail, trigger: 'blur' }
          ],
          // 验证手机号
          buyerPhone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ]
        },
        // 昵称
        name: '网络错误',
        // 账户
        account: '网络错误',
        // 邮箱
        email: '网络错误',
        // 手机号
        phone: '网络错误'
      }
    },
    methods: {
      // 修改密码
      submitPassWord(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            // 获取存储在本地的账户
            let user = sessionStorage.getItem('username')
            // 先发送请求获取用户的 id
            this.$http.get(`/user?account=${user}`).then(res => {
              let id = res.data[0].id
              // 拿到要修改的密码
              let data = {
                password: this.ruleForm.checkPass
              }
              // 发送修改请求
              this.$http.patch(`/user/${id}`, data).then(res => {
                alert('修改成功！')
                // 清空输入框内容
                this.$refs[formName].resetFields()
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })
          }else{
            alert('密码修改失败')
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置密码
      resetPassWord(formName) {
        this.$refs[formName].resetFields()
      },
      // 修改邮箱
      submitEmail(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 获取存储在本地的账户
            let user = sessionStorage.getItem('username')
            // 先发送请求获取用户的 id
            this.$http.get(`/user?account=${user}`).then(res => {
              let id = res.data[0].id
              // 拿到要修改的密码
              let data = {
                email: this.ruleForm.buyerEmail
              }
              // 发送修改请求
              this.$http.patch(`/user/${id}`, data).then(res => {
                alert('修改成功！')
                // 清空输入框内容
                this.$refs[formName].resetFields()
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })
          }else{
            alert('邮箱修改失败')
            console.log('error submit!!')
            return false
          }
        })
      },
      // 修改手机号
      submitPhone(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 获取存储在本地的账户
            let user = sessionStorage.getItem('username')
            // 先发送请求获取用户的 id
            this.$http.get(`/user?account=${user}`).then(res => {
              let id = res.data[0].id
              // 拿到要修改的密码
              let data = {
                phone: this.ruleForm.buyerPhone
              }
              // 发送修改请求
              this.$http.patch(`/user/${id}`, data).then(res => {
                alert('修改成功！')
                // 清空输入框内容
                this.$refs[formName].resetFields()
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })
          }else{
            alert('手机号修改失败')
            console.log('error submit!!')
            return false
          }
        })
      },
      // 注销账号（退出登录）
      goBack(){
          // 跳转到登录页面
          this.$router.push('/login')
          // 移除保存本地的 用户信息
          sessionStorage.removeItem('username')
      },
      // 获取当前登录者信息
      getUser(){
        // 获取存储在本地的账户
        let user = sessionStorage.getItem('username')
        // 通过本地的账户请求后台
        this.$http.get(`/user?account=${user}`).then(res => {
          // 拿到后台数据后进行赋值
          this.name = res.data[0].name
          this.account = res.data[0].account
          this.email = res.data[0].email
          this.phone = res.data[0].phone
        }, err => {
          console.log(err)
        })
      }
    },
    mounted(){
      this.getUser()
    }
  }
</script>

<style lang="less" scoped>
.secunity{
  .el-tabs.el-tabs--top.el-tabs--border-card{
    .el-tabs__content{
      #pane-0{
        .el-row{
          margin: 15px;
          .el-col.el-col-1{
            span{
              color: rgb(64, 158, 255);
            }
          }
        }
      }
    }
  }
}
</style>
