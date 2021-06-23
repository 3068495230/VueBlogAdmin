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
        top: -430px;
        font-size: 20px;
    }
}
</style>
