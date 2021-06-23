<template>
    <div class="error404">
        <p>404</p>
        <p>页面已丢失~</p>
    </div>
</template>

<script>
export default {
    name: 'error404',
}
</script>

<style lang="less" scoped>
.error404{
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