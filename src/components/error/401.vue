<!--
 * @Description: 401 无权限进入页错误
 * @Author: CY小尘s
 * @Date: 2021-06-30 11:17:01
 * @LastEditTime: 2021-06-30 16:53:46
 * @LastEditors: 学习
-->
<template>
    <div class="error401">
        <p>401</p>
        <p>么有权限访问哦~</p>
    </div>
</template>

<script>
export default {
    name: 'error401',
}
</script>

<style lang="less" scoped>
.error401{
    width: 100%;
    height: 100%;
    line-height: 70vh;
    text-align: center;
    color: red;
    font-size: 120px;
    font-weight: 900;
    font-style: oblique;
    p:last-child{
        position: relative;
        top: -550px;
        font-size: 20px;
    }
}
</style>
