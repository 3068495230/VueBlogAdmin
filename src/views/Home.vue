<!--
 * @Description: 首页
 * @Author: CY小尘s
 * @Date: 2021-04-13 09:50:37
 * @LastEditTime: 2021-06-30 17:51:01
 * @LastEditors: 学习
-->
<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <el-aside width="200px">
        <Nav></Nav>
    </el-aside>
    <!-- 右侧主体区域 -->
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <!-- 面包屑 -->
        <Breadcumb></Breadcumb>
        <!-- 退出登录 -->
        <el-button type="primary" @click="goBack">退出</el-button>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <!-- 显示页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 引入导航栏组件
import Nav from '../components/Nav.vue'
// 引入面包屑
import Breadcumb from '../components/Breadcumb.vue'

export default {
  name: 'Home',
  components:{
    Nav,
    Breadcumb
  },
  data(){
    return{

    }
  },
  // 方法
  methods: {
      // 退出登录
      goBack(){
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转到登录页面
          this.$router.push('/login')
          // 移除保存本地的 用户信息
          sessionStorage.removeItem('account')
          this.$message({
            type: 'info',
            message: '已退出...'
          })
        })
      }
  },
}
</script>

<style lang="less" scoped>
*{
  margin: 0px;
  padding: 0px;
}
/* 布局 */
.home{
  // height: 500px;
  /* 布局：左侧样式 */
  .el-aside {
    background-color: #354153;
    height: 100vh;
    color: white;
    float: left;
  }
  // 布局：右侧样式
  .el-container{
    height: 100vh;
    /* 布局：头部样式 */
    .el-header{
      width: 100%;
      height: 40px;
      background-color: white;
      box-shadow: 0px 1px 5px gray;
      color: #333;
      text-align: center;
      line-height: 60px;
      position: fixed;
      z-index: 10;
      /* 退出按钮 */
      button.el-button{
        width: 88px;
        position: absolute;
        top: 9px;
        right: 220px;
      }
    }
    /* 布局：右侧主体区域样式 */
    .el-main{
      height: 1000px;
      margin-top: 60px;
      padding: 10px;
      background-color: white;
      color: #333;
      overflow: auto;
    }
  }
}
</style>
