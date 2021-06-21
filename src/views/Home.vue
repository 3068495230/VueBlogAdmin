<!--
 * @Description: 首页
 * @Author: CY小尘s
 * @Date: 2021-04-13 09:50:37
 * @LastEditTime: 2021-04-16 09:57:54
 * @LastEditors: 学习
-->
<template>
  <div class="home">
    <!-- 使用 element ui 布局容器 -->
      <el-container>
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
          </el-header>
          <!-- 主体内容 -->
          <el-main>
            <!-- 显示页面 -->
            <router-view>
              
            </router-view>
          </el-main>
        </el-container>
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
  }
}
</script>

<style scope>
  *{
    margin: 0px;
    padding: 0px;
  }
  /* 布局：左侧样式 */
  .home .el-container .el-aside {
    background-color: #354153;
    width: 200px;
    height: 100vh;
  }
  /* 布局：右侧样式 */
  .home > .el-container {
    width: 100%;
  }
  /* 布局：头部样式 */
  .home .el-container .el-header {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid rgb(245, 243, 243);
  }
  /* 布局：右侧主体区域样式 */
  .home .el-container .el-main {
    background-color: white;
    color: #333;
  }


</style>
