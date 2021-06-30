<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-04-11 17:46:07
 * @LastEditTime: 2021-06-30 11:40:22
 * @LastEditors: 学习
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  list-style-type: none;
}
#app{
  width: 100%;
  height: 100%;
}
.active:focus{
    color: red;
  }
</style>