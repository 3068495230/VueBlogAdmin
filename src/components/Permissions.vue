<template>
    <div class="permissions">
        <p>当前账户：<span>{{ name }}</span></p>
        <p>当前权限等级：<span>{{ root == 0 ? '超级管理员' : root == 1 ? '管理员' : "普通用户" }}</span></p>
        <!-- 切换用户 -->
        <el-button-group>
            <el-button type="primary" @click="permissions(2)">普通用户</el-button>
            <el-button type="primary" @click="permissions(1)">管理员</el-button>
            <el-button type="primary" @click="permissions(0)">超级管理员</el-button>
        </el-button-group>
        <!-- 权限说明 -->
        <ul>
            <li>普通用户：无法登录后台</li>
            <li>管理员：可登录后台，但无法操作后台数据</li>
            <li>超级管理员：可登陆后台，可操作数据</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Root',
    data(){
        return {
            // 用户名
            name: '',
            // 用户权限
            root: ''
        }
    },
    methods:{
        permissions(value){
            if(value == 0){
                // 判断是否不用切换
                if(this.root == value){
                    alert('已切换！')
                    return false
                }
                this.$http.get(`/user?name=admin`).then(res => {
                    // 修改本地账户信息
                    sessionStorage.setItem('username', res.data[0].name)
                    this.name = res.data[0].name
                    this.root = res.data[0].permissions
                }, err => {
                    console.log(err)
                })
            }else if(value == 1){
                // 判断是否不用切换
                if(this.root == value){
                    alert('已切换！')
                    return false
                }
                this.$http.get(`/user?name=achens`).then(res => {
                    // 修改本地账户信息
                    sessionStorage.setItem('username', res.data[0].name)
                    this.name = res.data[0].name
                    this.root = res.data[0].permissions
                }, err => {
                    console.log(err)
                })
            }else if(value == 2){
                // 判断是否不用切换
                if(this.root == value){
                    alert('已切换！')
                    return false
                }
                this.$http.get(`/user?name=xuyunhans`).then(res => {
                    // 修改本地账户信息
                    sessionStorage.setItem('username', res.data[0].name)
                    this.name = res.data[0].name
                    this.root = res.data[0].permissions
                }, err => {
                    console.log(err)
                })
            }
        }
    },
    mounted(){
        let user = sessionStorage.getItem('username')
        this.name = user
        // 获取用户权限
        this.$http.get(`/user?name=${user}`).then(res => {
            this.root = res.data[0].permissions
        }, err => {
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
.permissions{
    margin: 10px;
    p{
        margin: 5px;
    }
    span{
        color: rgb(64, 158, 255);
    }
    .el-button-group{
        margin: 5px;
    }
    ul{
        margin: 5px 0px 0px 25px;
        li{
            margin: 10px 0px;
        }
    }
}
</style>
